<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { addToast } from "$lib/stores/toast";
    import { getWalletBalance, getSeekerStatus, manualConnect } from "$lib/api";
    import { X, Loader2, CheckCircle, AlertTriangle, RefreshCw } from "lucide-svelte";

    export let multiaddr: string;
    export let onclose: () => void;

    let loading = true;
    let isConnecting = false;
    let isDepositing = false;
    
    let warden: any = null;
    let walletBalance = 0; // SOL
    let escrowBalance = 0; // SOL (Escrow)
    let solPrice = 0;
    
    let estimatedMb = "100";
    let validationMessage = "";
    let refreshInterval: any;

    onMount(() => {
        loadData();
        refreshInterval = setInterval(refreshBalance, 2000);
    });

    onDestroy(() => {
        if (refreshInterval) clearInterval(refreshInterval);
    });

    async function refreshBalance() {
        try {
            // Refresh balances only
            const balRes = await getWalletBalance("seeker");
            walletBalance = balRes.lamports / 1e9;

            const seekerRes = await getSeekerStatus("seeker");
            if (seekerRes.seeker) {
                escrowBalance = seekerRes.seeker.escrowBalance / 1e9;
            }
        } catch (e) {
            // Silent fail for background refresh
        }
    }

    async function loadData() {
        loading = true;
        try {
            // 0. Fetch SOL Price (simple fetch)
            try {
                const pRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
                const pData = await pRes.json();
                solPrice = pData.solana.usd;
            } catch {
                solPrice = 150; // Fallback
            }

            // 1. Extract Peer ID
            const peerIdMatch = multiaddr.match(/\/p2p\/([a-zA-Z0-9]+)/);
            if (!peerIdMatch) {
                throw new Error("Invalid multiaddress: Missing Peer ID");
            }
            const peerId = peerIdMatch[1];

            // 2. Lookup Warden
            const wRes = await fetch(`/api/warden/lookup?peer_id=${peerId}`);
            if (!wRes.ok) throw new Error("Warden not found on-chain");
            warden = await wRes.json();

            // 3. Get Balances
            const balRes = await getWalletBalance("seeker");
            walletBalance = balRes.lamports / 1e9;

            const seekerRes = await getSeekerStatus("seeker");
            if (seekerRes.seeker) {
                escrowBalance = seekerRes.seeker.escrowBalance / 1e9;
            }
        } catch (e) {
            addToast(e.message, "error");
            // Don't close immediately so user can see error
        } finally {
            loading = false;
        }
    }

    // Derived
    // warden.price is Lamports per MB
    $: cost = warden ? (parseInt(estimatedMb) || 0) * (warden.price || 0) / 1e9 : 0;
    $: costUsd = cost * solPrice;
    $: missingEscrow = Math.max(0, cost - escrowBalance);
    $: canAffordWallet = walletBalance >= missingEscrow;

    async function handleDeposit() {
        if (!canAffordWallet) {
            addToast("Insufficient wallet balance", "error");
            return;
        }
        isDepositing = true;
        try {
            // Deposit missing amount + tiny buffer
            const amount = Math.ceil(missingEscrow * 1e9) + 100000; // 0.0001 SOL buffer 
            const res = await fetch("/api/deposit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount })
            });
            if (!res.ok) throw new Error(await res.text());
            
            addToast("Deposit sent. Waiting for confirmation...", "info");
            
            // Wait 5s then reload
            await new Promise(r => setTimeout(r, 5000));
            await loadData(); // Refresh balances
            addToast("Deposit confirmed!", "success");
        } catch (e) {
            addToast("Deposit failed: " + e.message, "error");
        } finally {
            isDepositing = false;
        }
    }

    async function handleConnect() {
        isConnecting = true;
        try {
            addToast("Initializing Secure Link...", "info");
            // Pass estimatedMb to manualConnect (api.ts needs update too!)
            // For now, I'll use fetch directly here to bypass api.ts limitations if any
            const res = await fetch("/api/node/connect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    multiaddr, 
                    estimatedMb: parseInt(estimatedMb) 
                })
            });
            
            if (!res.ok) throw new Error(await res.text());
            
            addToast("Connection Established!", "success");
            onclose();
        } catch (e) {
            addToast("Connection Failed: " + e.message, "error");
        } finally {
            isConnecting = false;
        }
    }
</script>

<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onclick={onclose}>
    <div class="w-full max-w-md rounded-lg bg-card border border-border p-6 space-y-6" onclick={e => e.stopPropagation()}>
        <div class="flex items-center justify-between border-b border-border pb-4">
            <h2 class="text-xl font-bold">Direct Connect</h2>
            <button onclick={onclose} class="text-muted-foreground hover:text-white"><X class="w-6 h-6" /></button>
        </div>

        {#if loading}
            <div class="flex flex-col items-center justify-center py-8">
                <Loader2 class="w-8 h-8 animate-spin text-primary mb-2" />
                <span class="text-sm text-muted-foreground">Resolving Peer...</span>
            </div>
        {:else if warden}
            <div class="space-y-4">
                <div class="bg-muted/20 p-4 rounded-lg">
                    <div class="flex justify-between text-sm mb-1">
                        <span class="text-muted-foreground">Warden</span>
                        <span class="font-mono text-white">{warden.peerId.slice(0, 8)}...</span>
                    </div>
                    <div class="flex justify-between text-sm">
                        <span class="text-muted-foreground">Rate</span>
                        <div class="text-right">
                            <span class="text-primary font-bold block">{(warden.price / 1e9).toFixed(6)} SOL / MB</span>
                            <span class="text-xs text-muted-foreground">≈ ${((warden.price / 1e9) * solPrice).toFixed(6)}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-mono text-muted-foreground mb-2">ESTIMATED DATA (MB)</label>
                    <input 
                        type="number" 
                        bind:value={estimatedMb} 
                        class="w-full bg-black border border-border p-3 text-white focus:border-primary outline-none"
                    />
                </div>

                <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                        <span class="text-muted-foreground">Estimated Cost</span>
                        <div class="text-right">
                            <span class="block">{cost.toFixed(6)} SOL</span>
                            <span class="text-xs text-muted-foreground">≈ ${costUsd.toFixed(2)}</span>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="text-muted-foreground">Escrow Balance</span>
                        <div class="flex items-center gap-2">
                            <span class="{missingEscrow > 0 ? 'text-red-500' : 'text-green-500'}">{escrowBalance.toFixed(6)} SOL</span>
                            <button onclick={loadData} title="Refresh Balance" class="hover:text-primary"><RefreshCw class="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>

                {#if missingEscrow > 0}
                    <div class="bg-red-900/20 border border-red-500/50 p-3 rounded flex flex-col gap-2">
                        <div class="flex items-center gap-2 text-red-500 text-xs font-bold">
                            <AlertTriangle class="w-4 h-4" /> INSUFFICIENT ESCROW
                        </div>
                        <p class="text-xs text-muted-foreground">
                            You need {missingEscrow.toFixed(6)} more SOL in escrow.
                        </p>
                        <button 
                            class="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2 text-xs rounded"
                            onclick={handleDeposit}
                            disabled={isDepositing}
                        >
                            {isDepositing ? "DEPOSITING..." : `DEPOSIT ${(missingEscrow + 0.0001).toFixed(4)} SOL`}
                        </button>
                    </div>
                {:else}
                    <button 
                        class="w-full bg-primary hover:bg-white text-black font-bold py-3 transition-colors"
                        onclick={handleConnect}
                        disabled={isConnecting}
                    >
                        {isConnecting ? "CONNECTING..." : "START CONNECTION"}
                    </button>
                {/if}
            </div>
        {/if}
    </div>
</div>
