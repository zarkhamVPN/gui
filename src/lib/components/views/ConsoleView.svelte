<script lang="ts">
    import { onMount, onDestroy } from "svelte";

    interface LogEntry {
        timestamp: number;
        prefix: string;
        message: string;
        color: string;
    }

    let logs: LogEntry[] = [];
    let eventSource: EventSource | null = null;
    let consoleContainer: HTMLDivElement;

    onMount(() => {
        // Connect to the SSE endpoint
        eventSource = new EventSource("/api/logs");

        eventSource.onmessage = (event) => {
            const entry: LogEntry = JSON.parse(event.data);
            logs = [...logs, entry].slice(-200); // Keep last 200 logs
            
            // Auto-scroll to bottom
            setTimeout(() => {
                if (consoleContainer) {
                    consoleContainer.scrollTop = consoleContainer.scrollHeight;
                }
            }, 0);
        };

        eventSource.onerror = (err) => {
            console.error("EventSource failed:", err);
            // Optionally attempt reconnection here
        };
    });

    onDestroy(() => {
        if (eventSource) {
            eventSource.close();
        }
    });

    function formatTime(ts: number) {
        return new Date(ts * 1000).toLocaleTimeString([], { hour12: false });
    }

    function getColorClass(color: string) {
        if (color.includes("31")) return "text-red-500";
        if (color.includes("32")) return "text-green-500";
        if (color.includes("33")) return "text-yellow-500";
        if (color.includes("34")) return "text-blue-500";
        if (color.includes("35")) return "text-purple-500";
        if (color.includes("36")) return "text-cyan-500";
        return "text-muted-foreground";
    }
</script>

<div 
    bind:this={consoleContainer}
    class="h-[60vh] bg-black border border-border p-4 font-mono text-xs overflow-y-auto"
>
    <div class="text-primary mb-4 sticky top-0 bg-black/80 backdrop-blur pb-2 border-b border-white/5">
        root@zarkham-node:~# tail -f session.log
    </div>
    <div class="space-y-1">
        {#each logs as log}
            <div class="flex gap-2 group hover:bg-white/5 px-1 py-0.5 rounded transition-colors">
                <span class="text-[10px] text-muted-foreground/50 tabular-nums shrink-0">
                    [{formatTime(log.timestamp)}]
                </span>
                <span class="font-bold shrink-0 {getColorClass(log.color)}">
                    [{log.prefix}]
                </span>
                <span class="text-muted-foreground break-all whitespace-pre-wrap">
                    {log.message}
                </span>
            </div>
        {/each}
        
        {#if logs.length === 0}
            <p class="text-muted-foreground/30 italic">Connecting to node telemetry stream...</p>
        {/if}
        <p class="animate-pulse text-primary font-bold">_</p>
    </div>
</div>
