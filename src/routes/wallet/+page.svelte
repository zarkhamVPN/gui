<script lang="ts">
    import { onMount } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import { getWalletBalance, getAddresses } from "$lib/api";
    import { Wallet, ArrowRight, Copy, ExternalLink, RefreshCw } from "lucide-svelte";

    let balance = 0;
    let addresses: Record<string, string> = {};
    let loading = true;
    
    let recipient = "";
    let amount = "";

    onMount(async () => {
        await refreshWallet();
    });

    async function refreshWallet() {
        loading = true;
        try {
            const balData = await getWalletBalance("warden"); // Default profile
            balance = balData.lamports / 1e9;
            addresses = await getAddresses();
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    function copyAddress(addr: string) {
        navigator.clipboard.writeText(addr);
        alert("Address copied!");
    }
</script>

<div class="space-y-8">
    <div class="flex items-center justify-between">
        <h2 class="text-4xl font-bold uppercase tracking-tighter">Command Wallet</h2>
        <button 
            class="p-2 border border-border hover:bg-primary/10 hover:text-primary transition-colors"
            onclick={refreshWallet}
            disabled={loading}
        >
            <RefreshCw class="w-5 h-5 {loading ? 'animate-spin' : ''}" />
        </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Balance Card -->
        <SpotlightCard>
            <div class="flex justify-between items-start mb-6">
                <span class="text-xs font-mono text-muted-foreground">LIQUID ASSETS</span>
                <Wallet class="w-5 h-5 text-primary" />
            </div>
            
            {#if loading}
                <div class="h-12 bg-white/5 animate-pulse w-3/4 mb-4"></div>
            {:else}
                <div class="text-5xl font-bold text-white mb-2">{balance.toFixed(4)} <span class="text-2xl text-primary">SOL</span></div>
            {/if}

            <div class="space-y-3 mt-8">
                {#each Object.entries(addresses) as [name, addr]}
                    <div class="flex flex-col gap-1">
                        <span class="text-[10px] font-mono text-muted-foreground uppercase">{name} ADDRESS</span>
                        <div 
                            class="flex items-center justify-between bg-black border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors group"
                            onclick={() => copyAddress(addr)}
                        >
                            <span class="text-xs font-mono text-muted-foreground truncate mr-4">{addr}</span>
                            <Copy class="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                        </div>
                    </div>
                {/each}
            </div>
        </SpotlightCard>

        <!-- Send Card -->
        <div class="bg-card border border-border p-6 flex flex-col">
            <div class="flex-1">
                <h3 class="text-xl font-bold mb-6 flex items-center gap-2 italic">
                    <ArrowRight class="w-5 h-5 text-primary" /> DISPATCH FUNDS
                </h3>
                
                <div class="space-y-6">
                    <div>
                        <label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Recipient Pubkey</label>
                        <input 
                            type="text" 
                            bind:value={recipient}
                            class="w-full bg-background border border-border p-4 text-sm focus:border-primary outline-none text-white font-mono placeholder:text-muted-foreground/30"
                            placeholder="Enter Solana Address..."
                        />
                    </div>

                    <div>
                        <label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Amount (SOL)</label>
                        <div class="relative">
                            <input 
                                type="number" 
                                bind:value={amount}
                                class="w-full bg-background border border-border p-4 text-xl focus:border-primary outline-none text-white font-mono"
                                placeholder="0.00"
                            />
                            <button class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-white transition-colors">MAX</button>
                        </div>
                    </div>
                </div>
            </div>

            <button class="w-full bg-primary text-black font-bold py-4 mt-8 hover:invert transition-all active:scale-[0.98]">
                EXECUTE TRANSACTION
            </button>
        </div>
    </div>

    <!-- History Preview (Placeholder) -->
    <div class="border border-border bg-card/30 p-6 italic text-center text-muted-foreground text-sm">
        Transaction history synchronization in progress...
    </div>
</div>
