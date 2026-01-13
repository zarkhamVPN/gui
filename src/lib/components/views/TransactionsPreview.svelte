<script lang="ts">
    import { onMount } from "svelte";
    import { getHistory } from "$lib/api";
    import { activeMode } from "$lib/stores/app";
    import { ArrowRight } from "lucide-svelte";

    let recentHistory: any[] = [];

    $: if ($activeMode) loadRecent();

    async function loadRecent() {
        const h = await getHistory($activeMode);
        // Combine and sort by timestamp
        const all = [
            ...h.solHistory, 
            ...h.arkhamHistory, 
            ...h.connectionHistory, 
            ...h.throughputHistory
        ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        recentHistory = all.slice(0, 3);
    }
</script>

<div class="mt-8">
    <div class="flex justify-between items-center mb-4">
        <h3 class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Recent Activity</h3>
        <!-- This link should ideally trigger the tab switch, but for now a visual cue -->
        <span class="text-xs text-primary flex items-center gap-1">VIEW ALL <ArrowRight class="w-3 h-3" /></span>
    </div>

    <div class="space-y-2">
        {#each recentHistory as item}
            <div class="bg-card border border-border p-3 flex justify-between items-center text-sm">
                <span>{item.type || 'Transaction'}</span>
                <span class="font-mono text-muted-foreground">{new Date(item.timestamp).toLocaleTimeString()}</span>
            </div>
        {/each}
        {#if recentHistory.length === 0}
            <div class="text-center text-muted-foreground text-xs italic py-4">No recent activity</div>
        {/if}
    </div>
</div>
