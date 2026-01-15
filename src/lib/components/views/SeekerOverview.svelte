<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import BracketCard from "$lib/components/ui/BracketCard.svelte";
    import Loading from "$lib/components/ui/Loading.svelte";
    import DirectConnectModal from "$lib/components/views/DirectConnectModal.svelte";
    import { getAllWardens, connectToWarden, getSeekerStatus, manualConnect, disconnectWarden } from "$lib/api";
    import { addToast } from "$lib/stores/toast";
    import { Wifi, ShieldCheck, Zap, Lock, Network, Activity, Power, RefreshCw } from "lucide-svelte";

    let wardens: any[] = [];
    let loading = true;
    let wardensLoading = true;
    let isConnected = false;
    let isLocalLinkActive = false;
    let isDisconnecting = false;
    let connection: any = null;
    let manualAddr = "";
    let showDirectConnectModal = false;
    let solPrice = 150;
    let latency = 0;
    let bandwidth = 0; // Total bytes (Tx+Rx)
    let latencyInterval: any;
    let bandwidthInterval: any;
    let statusInterval: any;

    onMount(() => {
        refreshStatus();
        loadWardens();
        fetchSolPrice();
        startPolling();
    });

    onDestroy(() => {
        stopPolling();
    });

    function startPolling() {
        stopPolling();
        latencyInterval = setInterval(refreshLatency, 5000);
        bandwidthInterval = setInterval(refreshBandwidth, 2000);
        statusInterval = setInterval(refreshStatus, 2000);
    }

    function stopPolling() {
        if (latencyInterval) clearInterval(latencyInterval);
        if (bandwidthInterval) clearInterval(bandwidthInterval);
        if (statusInterval) clearInterval(statusInterval);
    }

    async function fetchSolPrice() {
        try {
            const pRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd");
            const pData = await pRes.json();
            solPrice = pData.solana.usd;
        } catch { /* fallback exists */ }
    }

    async function refresh() {
        await Promise.all([refreshStatus(), loadWardens()]);
    }

    async function refreshStatus() {
        try {
            const status = await getSeekerStatus("seeker");
            isDisconnecting = status.isDisconnecting;
            
            // CORRECT MAPPING: isLocalLinkActive is inside status.seeker
            if (status.seeker) {
                isLocalLinkActive = status.seeker.isLocalLinkActive;
                
                if (status.seeker.connectedWardenPDA) {
                    isConnected = true;
                    connection = status.seeker;
                    // Backup authority to localStorage for robust disconnects
                    if (status.seeker.connectedWardenAuthority) {
                        localStorage.setItem("last_warden_auth", status.seeker.connectedWardenAuthority);
                    }
                } else {
                    isConnected = false;
                    connection = null;
                }
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    async function refreshLatency() {
        if (!isConnected || !isLocalLinkActive) return;
        try {
            const res = await fetch("/api/node/latency");
            if (res.ok) {
                latency = await res.json();
            }
        } catch { /* ignore */ }
    }

    async function refreshBandwidth() {
        if (!isConnected || !isLocalLinkActive) return;
        try {
            const res = await fetch("/api/node/bandwidth");
            if (res.ok) {
                bandwidth = await res.json();
            }
        } catch { /* ignore */ }
    }

    function formatBandwidth(bytes: number) {
        if (bytes === 0) return "0.00 B";
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    async function loadWardens() {
        wardensLoading = true;
        try {
            wardens = await getAllWardens();
        } catch (e) {
            console.error(e);
        } finally {
            wardensLoading = false;
        }
    }

    function handleManualConnect() {
        if (!manualAddr) {
            addToast("Please enter a multiaddress", "error");
            return;
        }
        showDirectConnectModal = true;
    }

    async function handleDisconnect() {
        try {
            stopPolling();
            const auth = connection?.connectedWardenAuthority || localStorage.getItem("last_warden_auth") || "";
            
            // Optimistic update
            isDisconnecting = true;
            isConnected = false;
            connection = null;
            
            await disconnectWarden("seeker", auth);
            addToast("Link Terminated", "info");
            localStorage.removeItem("last_warden_auth");
            
            setTimeout(() => {
                startPolling();
                refresh();
            }, 10000);
            
        } catch (e) {
            addToast("Disconnect Failed", "error");
            startPolling();
        }
    }
</script>

{#if isConnected || isDisconnecting}
    <!-- Immersive Connected/Disconnecting State -->
    <div class="fixed inset-0 pointer-events-none z-40 border-[6px] {isDisconnecting ? 'border-yellow-500/50' : 'border-green-500/50'} animate-pulse shadow-[inset_0_0_50px_rgba(34,197,94,0.2)]"></div>
    
    <div class="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/90 backdrop-blur border-2 {isDisconnecting ? 'border-yellow-500' : 'border-green-500'} px-6 py-3 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
        <div class="flex items-center gap-2 {isDisconnecting ? 'text-yellow-500' : 'text-green-500'} font-bold tracking-widest uppercase">
            {#if isDisconnecting}
                <RefreshCw class="w-4 h-4 animate-spin" />
                Disconnecting in progress...
            {:else}
                <Lock class="w-4 h-4" />
                Secure Uplink Active
            {/if}
        </div>
        {#if !isDisconnecting}
            <div class="h-4 w-px bg-green-500/30"></div>
            <button 
                class="text-red-500 hover:text-red-400 transition-colors p-1 hover:bg-red-500/10"
                onclick={handleDisconnect}
                title="Terminate Connection"
            >
                <Power class="w-5 h-5" />
            </button>
        {/if}
    </div>
{/if}

<div class="space-y-8 relative z-10">
    <div class="flex justify-between items-center">
        <div>
            <h2 class="text-3xl font-bold uppercase tracking-tighter">Seeker Uplink</h2>
            <p class="text-sm text-muted-foreground">Secure tunnel management.</p>
        </div>
    </div>

    {#if loading}
        <div class="h-[200px] flex items-center justify-center">
            <Loading />
        </div>
    {:else if isConnected || isDisconnecting}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            <BracketCard>
                <div class="flex justify-between mb-6">
                    <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">On-Chain Session</span>
                    <Activity class="w-5 h-5 {isLocalLinkActive ? 'text-green-500' : 'text-yellow-500'}" />
                </div>
                
                {#if isLocalLinkActive}
                    <div class="text-5xl font-bold text-white mb-2 uppercase tracking-tighter">Connected</div>
                    <p class="text-sm text-muted-foreground font-mono">
                        Tunnel established via WireGuard.<br>
                        Traffic routed through Warden node.
                    </p>
                {:else if isDisconnecting}
                    <div class="text-5xl font-bold text-yellow-500 mb-2 uppercase tracking-tighter">Closing</div>
                    <p class="text-sm text-yellow-500/70 font-mono italic">
                        Finalizing bandwidth proofs on-chain.<br>
                        Tearing down encrypted tunnel.
                    </p>
                {:else}
                    <div class="text-5xl font-bold text-yellow-500 mb-2 uppercase tracking-tighter">Lingering</div>
                    <p class="text-sm text-yellow-500/70 font-mono italic">
                        Local link is down, but on-chain session is still active.<br>
                        Terminate to stop billing.
                    </p>
                {/if}

                <div class="mt-8 p-4 {isLocalLinkActive ? 'bg-green-500/5 border-green-500/20' : 'bg-yellow-500/5 border-yellow-500/20'} border rounded">
                    <div class="text-xs {isLocalLinkActive ? 'text-green-400' : 'text-yellow-400'} font-mono mb-1 uppercase tracking-tighter">Encryption & Integrity</div>
                    <div class="text-lg font-bold text-white">ChaCha20-Poly1305</div>
                </div>
            </BracketCard>

            <BracketCard>
                <div class="flex justify-between mb-6">
                    <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Live Metrics</span>
                    <Zap class="w-5 h-5 text-primary" />
                </div>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-xs mb-1 uppercase font-mono">
                            <span>Relayed Data</span>
                            <span class="text-primary font-bold">{formatBandwidth(bandwidth)}</span>
                        </div>
                        <div class="h-1 bg-secondary w-full">
                            <div class="h-full bg-primary animate-pulse" style="width: 100%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-1 uppercase font-mono">
                            <span>Grid Latency</span>
                            <span class="text-green-500 font-bold">{latency > 0 ? latency + "ms" : "---"}</span>
                        </div>
                        <div class="h-1 bg-secondary w-full">
                            <div class="h-full bg-green-500 transition-all duration-500" style="width: {latency > 0 ? Math.min(100, (1000/Math.max(1, latency))*10) : 0}%"></div>
                        </div>
                    </div>
                </div>
            </BracketCard>
        </div>
    {:else}
        <!-- Manual Connect -->
        <div class="border border-border bg-card/50 p-6 flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1 w-full">
                <label class="block text-[10px] font-mono text-muted-foreground mb-2 flex items-center gap-2">
                    <Network class="w-3 h-3" /> MANUAL PEER CONNECT
                </label>
                <input 
                    type="text" 
                    bind:value={manualAddr}
                    placeholder="Warden Multiaddr..."
                    class="w-full bg-black border border-border p-3 text-sm focus:border-primary outline-none text-white font-mono placeholder:text-muted-foreground/30"
                />
            </div>
            <button 
                class="bg-white/10 text-white px-6 py-3 text-sm font-bold border border-white/20 hover:bg-white/20 transition-colors"
                onclick={handleManualConnect}
            >
                DIRECT CONNECT
            </button>
        </div>

        <!-- Node Grid -->
        {#if wardensLoading}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each {length: 6} as _}
                    <SpotlightCard>
                        <div class="animate-pulse space-y-4">
                            <div class="h-4 w-16 bg-muted/20 rounded"></div>
                            <div class="h-6 w-3/4 bg-muted/20 rounded"></div>
                            <div class="h-3 w-full bg-muted/20 rounded"></div>
                        </div>
                    </SpotlightCard>
                {/each}
            </div>
        {:else if wardens.length === 0}
            <div class="h-48 flex flex-col items-center justify-center border border-dashed border-border opacity-50">
                <Wifi class="w-8 h-8 mb-2" />
                <span class="text-xs font-mono">NO PUBLIC NODES DETECTED</span>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each wardens as warden}
                    <SpotlightCard>
                        <div class="flex justify-between items-start mb-4">
                            <div class="font-mono text-[10px] bg-primary/10 text-primary px-2 py-1 border border-primary/20">
                                {warden.location}
                            </div>
                            <ShieldCheck class="w-4 h-4 text-green-500" />
                        </div>
                        <p class="font-bold truncate uppercase tracking-tight">{warden.nickname}</p>
                        <p class="text-[10px] font-mono text-muted-foreground break-all mb-4">{warden.authority}</p>
                        
                        <div class="flex justify-between items-center border-t border-border pt-4 mt-auto">
                            <span class="text-xs text-primary font-bold">
                                ${((warden.price / 1e9) * solPrice * 1024).toFixed(4)}/GB
                            </span>
                            <button 
                                class="text-xs bg-white text-black px-3 py-1 font-bold hover:bg-primary transition-colors disabled:opacity-50"
                                onclick={() => connectToWarden("seeker", warden.authority, warden.id, 100)}
                                disabled={isConnected || isDisconnecting}
                            >
                                CONNECT
                            </button>
                        </div>
                    </SpotlightCard>
                {/each}
            </div>
        {/if}
    {/if}

    {#if showDirectConnectModal}
        <DirectConnectModal 
            multiaddr={manualAddr} 
            onclose={() => {
                showDirectConnectModal = false;
                refresh();
            }} 
        />
    {/if}
</div>
