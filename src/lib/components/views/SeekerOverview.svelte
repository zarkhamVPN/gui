<script lang="ts">
    import { onMount } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import BracketCard from "$lib/components/ui/BracketCard.svelte";
    import Loading from "$lib/components/ui/Loading.svelte";
    import DirectConnectModal from "$lib/components/views/DirectConnectModal.svelte";
    import { getAllWardens, connectToWarden, getSeekerStatus, manualConnect, disconnectWarden } from "$lib/api";
    import { addToast } from "$lib/stores/toast";
    import { Wifi, ShieldCheck, Zap, Lock, Network, Activity } from "lucide-svelte";

    let wardens: any[] = [];
    let loading = true;
    let wardensLoading = true;
    let isConnected = false;
    let connection: any = null;
    let manualAddr = "";
    let showDirectConnectModal = false;

    onMount(() => {
        refreshStatus();
        loadWardens();
    });

    async function refresh() {
        await Promise.all([refreshStatus(), loadWardens()]);
    }

    async function refreshStatus() {
        try {
            const status = await getSeekerStatus("seeker");
            if (status.connectedWardenPDA) {
                isConnected = true;
                connection = status;
            }
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
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
            await disconnectWarden("seeker", connection.connectedWardenAuthority);
            isConnected = false;
            connection = null;
            addToast("Link Terminated", "info");
            await refresh();
        } catch (e) {
            addToast("Disconnect Failed", "error");
        }
    }
</script>

<div class="space-y-8">
    {#if loading}
        <div class="h-[60vh] flex items-center justify-center">
            <Loading />
        </div>
    {:else}
        <div class="flex justify-between items-center">
            <div>
                <h2 class="text-3xl font-bold uppercase tracking-tighter">Seeker Uplink</h2>
                <p class="text-sm text-muted-foreground">Secure tunnel management.</p>
            </div>
            {#if isConnected}
                <div class="flex items-center gap-2 text-green-500 border border-green-500/30 bg-green-500/10 px-4 py-2 text-xs font-bold animate-pulse">
                    <Lock class="w-3 h-3" /> ENCRYPTED
                </div>
            {/if}
        </div>

        {#if isConnected}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BracketCard>
                    <div class="flex justify-between mb-6">
                        <span class="text-xs font-mono text-muted-foreground">STATUS</span>
                        <Activity class="w-5 h-5 text-green-500" />
                    </div>
                    <div class="text-5xl font-bold text-white mb-2">CONNECTED</div>
                    <p class="text-sm text-muted-foreground font-mono">
                        Tunnel established via WireGuard.<br>
                        Traffic routed through Warden node.
                    </p>
                    <button 
                        class="mt-8 w-full border border-red-500/50 text-red-500 font-bold py-3 hover:bg-red-500/10 transition-colors"
                        onclick={handleDisconnect}
                    >
                        TERMINATE
                    </button>
                </BracketCard>

                <BracketCard>
                    <div class="flex justify-between mb-6">
                        <span class="text-xs font-mono text-muted-foreground">METRICS</span>
                        <Zap class="w-5 h-5 text-primary" />
                    </div>
                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span>BANDWIDTH</span>
                                <span>12.4 MB</span>
                            </div>
                            <div class="h-1 bg-secondary w-full">
                                <div class="h-full bg-primary w-[12%]"></div>
                            </div>
                        </div>
                        <div>
                            <div class="flex justify-between text-xs mb-1">
                                <span>LATENCY</span>
                                <span>45ms</span>
                            </div>
                            <div class="h-1 bg-secondary w-full">
                                <div class="h-full bg-green-500 w-[20%]"></div>
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
            {#if wardens.length === 0}
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
                            <p class="font-bold truncate">{warden.nickname}</p>
                            <p class="text-[10px] font-mono text-muted-foreground break-all mb-4">{warden.authority}</p>
                            
                                                    <div class="flex justify-between items-center border-t border-border pt-4 mt-auto">
                            
                                                        <span class="text-xs text-primary font-bold">${(warden.price || 0).toFixed(4)}/GB</span>
                            
                                                        <button 
                            
                                                            class="text-xs bg-white text-black px-3 py-1 font-bold hover:bg-primary transition-colors"
                            
                            
                                    onclick={() => connectToWarden("seeker", warden.authority, warden.id, 100)}
                                >
                                    CONNECT
                                </button>
                            </div>
                        </SpotlightCard>
                    {/each}
                </div>
            {/if}
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