<script lang="ts">
    import { toasts, removeToast } from "$lib/stores/toast";
    import { fly } from 'svelte/transition';
    import { X } from "lucide-svelte";
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    {#each $toasts as toast (toast.id)}
        <div 
            transition:fly={{ y: 20, duration: 200 }}
            class="pointer-events-auto bg-card border border-primary/20 p-4 min-w-[300px] shadow-lg shadow-black/50 flex items-start justify-between gap-4 backdrop-blur-md"
        >
            <div class="flex flex-col">
                <span class="text-xs font-mono font-bold uppercase text-primary mb-1">
                    {toast.type === 'error' ? 'SYSTEM ERROR' : 'NOTIFICATION'}
                </span>
                <span class="text-sm text-white">{toast.message}</span>
            </div>
            <button class="text-muted-foreground hover:text-white transition-colors" onclick={() => removeToast(toast.id)}>
                <X class="w-4 h-4" />
            </button>
            
            <!-- Corner Accents -->
            <div class="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary"></div>
            <div class="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary"></div>
        </div>
    {/each}
</div>
