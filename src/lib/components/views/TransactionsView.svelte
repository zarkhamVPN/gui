<script lang="ts">
    import { onMount } from "svelte";
    import { getHistory } from "$lib/api";
    import { activeMode } from "$lib/stores/app";
    import Loading from "$lib/components/ui/Loading.svelte";
    import { ArrowUpRight, ArrowDownLeft, Clock, FileText } from "lucide-svelte";

    let history: any = { solHistory: [], arkhamHistory: [], connectionHistory: [], throughputHistory: [] };
    let loading = true;
    let tab: 'sol' | 'arkham' | 'connections' | 'throughput' = 'sol';

    $: if ($activeMode) loadHistory();

    async function loadHistory() {
        loading = true;
        history = await getHistory($activeMode);
        loading = false;
    }

    function formatTime(ts: string) {
        return new Date(ts).toLocaleString();
    }
</script>

<div class="space-y-6">
    <div class="flex gap-4 border-b border-border pb-1">
        <button 
            class="px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors {tab === 'sol' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}"
            onclick={() => tab = 'sol'}
        >
            SOLANA
        </button>
        <button 
            class="px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors {tab === 'arkham' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}"
            onclick={() => tab = 'arkham'}
        >
            ARKHAM
        </button>
        <button 
            class="px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors {tab === 'connections' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}"
            onclick={() => tab = 'connections'}
        >
            CONNECTIONS
        </button>
        <button 
            class="px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors {tab === 'throughput' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}"
            onclick={() => tab = 'throughput'}
        >
            THROUGHPUT
        </button>
    </div>

    <div class="min-h-[400px]">
        {#if loading}
            <div class="flex items-center justify-center h-64">
                <Loading />
            </div>
        {:else}
            {#if tab === 'sol' && history.solHistory}
                <div class="space-y-2">
                    {#each history.solHistory as tx}
                        <div class="bg-card border border-border p-4 flex items-center justify-between hover:border-primary/30 transition-colors group">
                            <div class="flex items-center gap-4">
                                <div class="p-2 bg-secondary rounded-none">
                                    {#if tx.type.includes('Sent')}
                                        <ArrowUpRight class="w-4 h-4 text-red-500" />
                                    {:else}
                                        <ArrowDownLeft class="w-4 h-4 text-green-500" />
                                    {/if}
                                </div>
                                <div>
                                    <div class="font-bold text-sm">{tx.type}</div>
                                    <div class="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                                        <Clock class="w-3 h-3" /> {formatTime(tx.timestamp)}
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <div class="font-mono font-bold">{(tx.amount / 1e9).toFixed(4)} SOL</div>
                                <div class="text-[10px] text-muted-foreground truncate w-24">{tx.signature}</div>
                            </div>
                        </div>
                    {/each}
                    {#if history.solHistory.length === 0}
                        <div class="text-center text-muted-foreground py-12 text-sm">No transaction history found.</div>
                    {/if}
                </div>
            {/if}
            {#if tab === 'arkham' && history.arkhamHistory}
                <div class="space-y-2">
                    {#each history.arkhamHistory as tx}
                        <div class="bg-card border border-border p-4 flex items-center justify-between hover:border-primary/30 transition-colors">
                            <div>
                                <div class="font-bold text-sm">{tx.type}</div>
                                <div class="text-[10px] font-mono text-muted-foreground">{formatTime(tx.timestamp)}</div>
                            </div>
                            <div class="text-right font-mono text-primary">{(tx.amount / 1e9).toFixed(4)} ARKHAM</div>
                        </div>
                    {/each}
                    {#if history.arkhamHistory.length === 0}
                        <div class="text-center text-muted-foreground py-12 text-sm">No token history found.</div>
                    {/if}
                </div>
            {/if}

            {#if tab === 'connections' && history.connectionHistory}
                <div class="space-y-2">
                    {#each history.connectionHistory as conn}
                        <div class="bg-card border border-border p-4 flex items-center justify-between">
                            <div>
                                <div class="font-bold text-sm">Session Ended</div>
                                <div class="text-[10px] font-mono text-muted-foreground">{formatTime(conn.timestamp)}</div>
                            </div>
                            <div class="text-right text-xs">
                                <span class="block text-primary">{(conn.bandwidth / 1024 / 1024).toFixed(2)} MB</span>
                                <span class="text-muted-foreground">EARNED: {(conn.earnings / 1e9).toFixed(4)} SOL</span>
                            </div>
                        </div>
                    {/each}
                    {#if history.connectionHistory.length === 0}
                        <div class="text-center text-muted-foreground py-12 text-sm">No connection history found.</div>
                    {/if}
                </div>
            {/if}

            {#if tab === 'throughput' && history.throughputHistory}
                <div class="space-y-2">
                    {#each history.throughputHistory as proof}
                        <div class="bg-card border border-border p-4 flex items-center justify-between">
                            <div class="flex items-center gap-3">
                                <FileText class="w-4 h-4 text-muted-foreground" />
                                <div>
                                    <div class="font-bold text-sm">Proof Submitted</div>
                                    <div class="text-[10px] font-mono text-muted-foreground">{formatTime(proof.timestamp)}</div>
                                </div>
                            </div>
                            <div class="font-mono text-primary text-sm">{proof.mbConsumed} MB</div>
                        </div>
                    {/each}
                    {#if history.throughputHistory.length === 0}
                        <div class="text-center text-muted-foreground py-12 text-sm">No proofs submitted.</div>
                    {/if}
                </div>
            {/if}
        {/if}
    </div>
</div>
