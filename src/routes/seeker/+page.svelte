<script lang="ts">
    import { onMount } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import { getAllWardens, connectToWarden, disconnectWarden, getSeekerStatus, manualConnect } from "$lib/api";
    import { Wifi, ShieldCheck, Zap, X, Network, Activity, Lock } from "lucide-svelte";

    let wardens: any[] = [];
    let loading = true;
    let selectedWarden: any = null;
    let manualMultiaddr = "";
    let manualConnecting = false;
    
    // Connection State
    let isConnected = false;
    let currentConnection: any = null;
    let bandwidthUsage = 0; // Mock for now

    onMount(async () => {
        const status = await getSeekerStatus("seeker");
        if (status.connectedWardenPDA) {
            isConnected = true;
            currentConnection = status;
        } else {
            wardens = await getAllWardens();
        }
        loading = false;
    });

    async function handleDisconnect() {
        if (!currentConnection) return;
        try {
            await disconnectWarden("seeker", currentConnection.connectedWardenAuthority);
            isConnected = false;
            currentConnection = null;
            wardens = await getAllWardens(); // Refresh list
        } catch (e) {
            alert("Disconnect failed: " + e);
        }
    }

    async function handleManualConnect() {
        if (!manualMultiaddr) return;
        manualConnecting = true;
        try {
            await manualConnect(manualMultiaddr);
            alert("Connection initiated!");
            manualMultiaddr = "";
        } catch (e) {
            alert("Failed: " + e);
        } finally {
            manualConnecting = false;
        }
    }

    function handleConnectClick(warden: any) {
        selectedWarden = warden;
        connectToWarden("seeker", warden.authority, warden.id, 100);
        // Optimistic update
        isConnected = true;
        currentConnection = { connectedWardenAuthority: warden.authority };
    }
</script>

<div class="space-y-8">
    <div class="flex items-center justify-between">
        <div>
            <h2 class="text-4xl font-bold uppercase tracking-tighter">Seeker Terminal</h2>
            <p class="text-muted-foreground">Establish a secure connection to the Zarkham network.</p>
        </div>
        {#if isConnected}
            <div class="flex items-center gap-2 text-primary font-mono text-sm border border-primary/30 px-3 py-1 bg-primary/10 animate-pulse">
                <Lock class="w-3 h-3" /> ENCRYPTED TUNNEL ACTIVE
            </div>
        {/if}
    </div>

    {#if isConnected}
        <!-- Active Connection View -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SpotlightCard>
                <div class="flex justify-between items-start mb-6">
                    <span class="text-xs font-mono text-muted-foreground">TUNNEL STATUS</span>
                    <Activity class="w-5 h-5 text-green-500" />
                </div>
                <div class="text-5xl font-bold text-white mb-2">CONNECTED</div>
                <p class="text-sm text-muted-foreground font-mono">
                    Uplink established via WireGuard.<br>
                    Traffic is now routed through the Warden node.
                </p>
                <div class="mt-8">
                    <button 
                        class="w-full bg-red-900/20 border border-red-500/50 text-red-500 font-bold py-3 hover:bg-red-900/40 transition-colors"
                        onclick={handleDisconnect}
                    >
                        TERMINATE CONNECTION
                    </button>
                </div>
            </SpotlightCard>

            <SpotlightCard>
                <div class="flex justify-between items-start mb-6">
                    <span class="text-xs font-mono text-muted-foreground">REAL-TIME METRICS</span>
                    <Zap class="w-5 h-5 text-primary" />
                </div>
                <div class="space-y-4">
                    <div>
                        <div class="flex justify-between text-xs mb-1">
                            <span>BANDWIDTH</span>
                            <span>12.4 MB / 100 MB</span>
                        </div>
                        <div class="h-2 bg-secondary w-full">
                            <div class="h-full bg-primary w-[12%]"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-xs mb-1">
                            <span>LATENCY</span>
                            <span>45ms</span>
                        </div>
                        <div class="h-2 bg-secondary w-full">
                            <div class="h-full bg-green-500 w-[20%]"></div>
                        </div>
                    </div>
                </div>
            </SpotlightCard>
        </div>

    {:else}
        <!-- Manual Connect -->
        <div class="bg-card border border-border p-6 flex flex-col md:flex-row gap-4 items-end">
            <div class="flex-1 w-full">
                <label class="block text-xs font-mono text-muted-foreground mb-2 flex items-center gap-2">
                    <Network class="w-3 h-3" /> MANUAL PEER CONNECT
                </label>
                <input 
                    type="text" 
                    bind:value={manualMultiaddr}
                    placeholder="Warden Multiaddr..."
                    class="w-full bg-background border border-border p-3 text-sm focus:border-primary outline-none text-white font-mono"
                />
            </div>
            <button 
                class="bg-secondary text-white px-6 py-3 font-bold hover:bg-white/10 transition-colors border border-border w-full md:w-auto"
                onclick={handleManualConnect}
                disabled={manualConnecting}
            >
                {manualConnecting ? "CONNECTING..." : "DIRECT CONNECT"}
            </button>
        </div>

        {#if loading}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each { length: 6 } as _}
                    <div class="h-48 bg-card border border-border animate-pulse"></div>
                {/each}
            </div>
        {:else if wardens.length === 0}
            <div class="h-64 flex flex-col items-center justify-center border border-dashed border-border bg-card/50">
                <Wifi class="w-16 h-16 text-muted-foreground mb-4" />
                <h3 class="text-2xl font-bold mb-2">NO NODES DETECTED</h3>
                <p class="text-muted-foreground">No active Warden nodes found on the network.</p>
            </div>
        {:else}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {#each wardens as warden}
                    <SpotlightCard>
                        <div class="flex flex-col h-full">
                            <div class="flex-1">
                                <div class="flex justify-between items-start mb-4">
                                    <div class="font-mono text-xs bg-primary/20 text-primary px-2 py-1 border border-primary/30">
                                        {warden.location}
                                    </div>
                                    <ShieldCheck class="w-5 h-5 text-green-500" />
                                </div>
                                <p class="text-lg font-bold truncate">{warden.nickname}</p>
                                <p class="text-xs font-mono text-muted-foreground break-all">{warden.authority}</p>
                            </div>

                            <div class="flex items-center justify-between text-xs mt-6">
                                <span class="flex items-center gap-1"><Zap class="w-3 h-3 text-primary" /> ${warden.price.toFixed(4)}/GB</span>
                                <span>{warden.activeConnections} active</span>
                            </div>
                            
                            <button 
                                class="w-full mt-4 bg-primary text-primary-foreground font-bold py-2 hover:bg-primary/90"
                                onclick={() => handleConnectClick(warden)}
                            >
                                CONNECT
                            </button>
                        </div>
                    </SpotlightCard>
                {/each}
            </div>
        {/if}
    {/if}
</div>
