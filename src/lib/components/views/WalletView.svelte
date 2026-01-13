<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import BracketCard from "$lib/components/ui/BracketCard.svelte";
    import Loading from "$lib/components/ui/Loading.svelte";
    import { getWalletBalance, getAddresses } from "$lib/api";
    import { Wallet, ArrowRight, Copy, RefreshCw } from "lucide-svelte";
    import QRCode from 'qrcode';

    export let profile = "warden"; // 'warden' or 'seeker'

    let balance = 0;
    let address = "Loading...";
    let qrDataUrl = "";
    let loading = true;
    let recipient = "";
    let amount = "";

    async function refresh() {
        loading = true;
        try {
            const addrs = await getAddresses();
            address = addrs[profile] || "Address not found";
            
            if (address && address !== "Address not found") {
                qrDataUrl = await QRCode.toDataURL(address, { 
                    color: { dark: '#fed600', light: '#00000000' },
                    margin: 1
                });
            }

            const balData = await getWalletBalance(profile);
            balance = balData.lamports / 1e9;
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    // React to profile changes
    $: if (profile) { refresh(); }

    function copyAddress() {
        navigator.clipboard.writeText(address);
        alert("Address copied!");
    }
</script>

{#if loading}
    <div class="h-[60vh] flex items-center justify-center">
        <Loading />
    </div>
{:else}
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Balance & QR -->
    <BracketCard>
        <div class="flex justify-between items-start mb-6">
            <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">{profile} WALLET</span>
            <button onclick={refresh} disabled={loading}>
                <RefreshCw class="w-4 h-4 text-muted-foreground hover:text-white {loading ? 'animate-spin' : ''}" />
            </button>
        </div>

        <div class="flex flex-col md:flex-row gap-8 items-center">
            {#if qrDataUrl}
                <div class="bg-black border border-primary/20 p-2">
                    <img src={qrDataUrl} alt="QR Code" class="w-32 h-32" />
                </div>
            {/if}
            
            <div class="flex-1 w-full">
                <div class="text-5xl font-bold text-white mb-2">{balance.toFixed(4)} <span class="text-2xl text-primary">SOL</span></div>
                
                <div class="flex flex-col gap-2 mt-4">
                    <span class="text-[10px] font-mono text-muted-foreground uppercase">Public Key</span>
                    <button 
                        class="flex items-center justify-between bg-card border border-border p-3 hover:border-primary/50 transition-colors group text-left w-full"
                        onclick={copyAddress}
                    >
                        <span class="text-xs font-mono text-muted-foreground truncate mr-2">{address}</span>
                        <Copy class="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                    </button>
                </div>
            </div>
        </div>
    </BracketCard>

    <!-- Send Form -->
    <div class="bg-card border border-border p-8 flex flex-col relative overflow-hidden">
        <div class="absolute top-0 right-0 p-4 opacity-10">
            <Wallet class="w-32 h-32" />
        </div>

        <h3 class="text-xl font-bold mb-6 flex items-center gap-2 italic relative z-10">
            <ArrowRight class="w-5 h-5 text-primary" /> DISPATCH FUNDS
        </h3>
        
        <div class="space-y-6 relative z-10">
            <div>
                <label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Recipient</label>
                <input 
                    type="text" 
                    bind:value={recipient}
                    class="w-full bg-black border border-border p-4 text-sm focus:border-primary outline-none text-white font-mono placeholder:text-muted-foreground/30 transition-colors"
                    placeholder="Solana Address..."
                />
            </div>

            <div>
                <label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Amount</label>
                <div class="relative">
                    <input 
                        type="number" 
                        bind:value={amount}
                        class="w-full bg-black border border-border p-4 text-xl focus:border-primary outline-none text-white font-mono transition-colors"
                        placeholder="0.00"
                    />
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-bold">SOL</span>
                </div>
            </div>
        </div>

        <button class="w-full bg-primary text-black font-bold py-4 mt-8 hover:bg-white transition-all active:scale-[0.98] relative z-10 uppercase tracking-widest">
            Execute Transaction
        </button>
    </div>
</div>
{/if}
