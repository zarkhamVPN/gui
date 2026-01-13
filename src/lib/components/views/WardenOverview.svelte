<script lang="ts">
    import { onMount } from "svelte";
    import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
    import BracketCard from "$lib/components/ui/BracketCard.svelte";
    import Loading from "$lib/components/ui/Loading.svelte";
    import TransactionsPreview from "$lib/components/views/TransactionsPreview.svelte";
    import { getWardenStatus, getNodeStatus, startNode, stopNode, registerWarden, getWalletBalance } from "$lib/api";
    import { addToast } from "$lib/stores/toast";
    import { Zap, Activity, Server, Power, CheckCircle, Copy, PieChart } from "lucide-svelte";

    let isRegistered = false;
    let isRunning = false;
    let stats: any = null;
    let balance = 0;
    let loading = true;
    let showRegisterModal = false;
    let showStakeModal = false;
    
    // Reg form
    let stakeAmount = 1.0;
    let stakeToken = "SOL";

    onMount(refresh);

    async function refresh() {
        loading = true;
        try {
            const nStatus = await getNodeStatus();
            isRunning = nStatus.isRunning;

            const wStatus = await getWardenStatus("warden");
            isRegistered = wStatus.is_registered;
            stats = wStatus.warden;

            const balData = await getWalletBalance("warden");
            balance = balData.lamports / 1e9;
        } catch (e) {
            console.error(e);
        } finally {
            loading = false;
        }
    }

    async function toggleNode() {
        try {
            if (isRunning) {
                await stopNode();
                addToast("Warden Node Stopped", "info");
            } else {
                await startNode();
                addToast("Warden Node Started", "success");
            }
            await refresh();
        } catch (e) {
            addToast("Command failed", "error");
        }
    }

    async function handleRegister() {
        try {
            await registerWarden("warden", stakeToken, stakeAmount);
            addToast("Registration Successful", "success");
            showRegisterModal = false;
            await refresh();
        } catch (e) {
            addToast("Registration Failed: " + e, "error");
        }
    }

    function copyPeerID() {
        if (stats?.peerId) {
            navigator.clipboard.writeText(stats.peerId);
            addToast("Peer ID copied", "info");
        }
    }

    function getStakePercentage() {
        if (!stats?.stakeAmount || !balance) return 0;
        const staked = stats.stakeAmount / 1e9;
        return (staked / (staked + balance)) * 100;
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
                <h2 class="text-3xl font-bold uppercase tracking-tighter">Warden Command</h2>
                <p class="text-sm text-muted-foreground">Network relay management.</p>
            </div>

            {#if isRegistered}
                <button 
                    class="flex items-center gap-3 px-6 py-3 border transition-all duration-300 {isRunning ? 'bg-green-500/10 border-green-500 text-green-500 hover:bg-green-500/20' : 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500/20'}"
                    onclick={toggleNode}
                >
                    <Power class="w-5 h-5 {isRunning ? 'animate-pulse' : ''}" />
                    <span class="font-bold tracking-widest">{isRunning ? "ONLINE" : "OFFLINE"}</span>
                </button>
            {/if}
        </div>

        {#if !isRegistered}
            <div class="border border-primary/50 bg-primary/5 p-12 text-center flex flex-col items-center">
                <Server class="w-16 h-16 text-primary mb-6" />
                <h3 class="text-2xl font-bold mb-2">UNREGISTERED NODE</h3>
                <p class="text-muted-foreground max-w-md mb-8">
                    This node identity is not yet registered on the Solana blockchain.
                    Stake tokens to begin providing bandwidth.
                </p>
                <button 
                    class="bg-primary text-black px-8 py-3 font-bold hover:bg-white transition-colors"
                    onclick={() => showRegisterModal = true}
                >
                    INITIALIZE WARDEN
                </button>
            </div>
        {:else}
            <!-- Stats Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- Staked Card -->
                <BracketCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Staked</span>
                        <PieChart class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-3xl font-bold text-white mb-1">
                        {(stats?.stakeAmount / 1e9 || 0).toFixed(2)} <span class="text-lg text-muted-foreground">SOL</span>
                    </div>
                    <button 
                        class="text-[10px] text-primary hover:underline mt-2 flex items-center gap-1 uppercase font-bold tracking-tighter"
                        onclick={() => showStakeModal = true}
                    >
                        {getStakePercentage().toFixed(1)}% of liquid balance. Visualize &rarr;
                    </button>
                </BracketCard>

                <!-- SOL Revenue -->
                <BracketCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">SOL Earnings</span>
                        <Zap class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-3xl font-bold text-white mb-1">
                        {(stats?.totalEarnings / 1e9 || 0).toFixed(4)}
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">Lifetime SOL revenue</p>
                </BracketCard>

                <!-- Zarkham Revenue -->
                <BracketCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Zarkham Earnings</span>
                        <Zap class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-3xl font-bold text-white mb-1">
                        {(stats?.arkhamTokensEarned / 1e9 || 0).toFixed(4)}
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">Lifetime token rewards</p>
                </BracketCard>

                <!-- Connections -->
                <BracketCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Sessions</span>
                        <Activity class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-3xl font-bold text-white mb-1">{stats?.activeConnections || 0}</div>
                    <div class="flex items-center gap-2 mt-2">
                        <div class="w-2 h-2 rounded-none {(stats?.activeConnections || 0) > 0 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}"></div>
                        <span class="text-xs text-muted-foreground uppercase">{(stats?.activeConnections || 0) > 0 ? 'Connected' : 'Idle'}</span>
                    </div>
                </BracketCard>
            </div>

            <!-- Health/Info Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <SpotlightCard>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Node Identity</span>
                        <CheckCircle class="w-4 h-4 text-green-500" />
                    </div>
                    <div class="flex items-center justify-between bg-black border border-border p-3 group hover:border-primary/30 transition-colors">
                        <span class="text-xs font-mono text-muted-foreground truncate w-full mr-2">{stats?.peerId}</span>
                        <button class="text-muted-foreground hover:text-primary transition-colors" onclick={copyPeerID} title="Copy Peer ID">
                            <Copy class="w-4 h-4" />
                        </button>
                    </div>
                    <div class="mt-2 text-xs flex justify-between uppercase font-mono tracking-widest">
                        <span class="text-muted-foreground">Uptime Velocity</span>
                        <span class="text-green-500 font-bold">{(stats?.uptimePercentage / 100 || 0).toFixed(1)}%</span>
                    </div>
                </SpotlightCard>

                <SpotlightCard>
                    <div class="flex justify-between items-center mb-4">
                        <span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">Bandwidth Served</span>
                        <Server class="w-4 h-4 text-primary" />
                    </div>
                    <div class="text-4xl font-bold">{(stats?.totalBandwidthServed / 1024).toFixed(2)} <span class="text-lg text-muted-foreground">GB</span></div>
                </SpotlightCard>
            </div>

            <TransactionsPreview />
        {/if}
    {/if}

    <!-- Register Modal -->
    {#if showRegisterModal}
        <div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div class="bg-card border border-primary w-full max-w-md p-8 relative">
                <button class="absolute top-4 right-4 text-muted-foreground hover:text-white" onclick={() => showRegisterModal = false}>✕</button>
                <h3 class="text-2xl font-bold mb-6">Initialize Node</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-xs font-mono text-muted-foreground mb-2">STAKE TOKEN</label>
                        <div class="grid grid-cols-2 gap-2">
                            <button class="border px-4 py-2 {stakeToken === 'SOL' ? 'bg-primary text-black border-primary' : 'border-border text-muted-foreground'}" onclick={() => stakeToken = 'SOL'}>SOL</button>
                            <button class="border px-4 py-2 {stakeToken === 'USDC' ? 'bg-primary text-black border-primary' : 'border-border text-muted-foreground'}" onclick={() => stakeToken = 'USDC'}>USDC</button>
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-mono text-muted-foreground mb-2">AMOUNT</label>
                        <input type="number" bind:value={stakeAmount} class="w-full bg-black border border-border p-3 text-white focus:border-primary outline-none" />
                    </div>
                </div>
                <button class="w-full bg-primary text-black font-bold py-3 mt-8 hover:bg-white transition-colors" onclick={handleRegister}>CONFIRM STAKE</button>
            </div>
        </div>
    {/if}

    <!-- Stake Viz Modal -->
    {#if showStakeModal}
        <div class="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-sm" onclick={() => showStakeModal = false}>
            <div class="bg-card border border-border p-8 w-full max-w-sm text-center" onclick={(e) => e.stopPropagation()}>
                <h3 class="text-xl font-bold mb-6">Asset Allocation</h3>
                <div class="relative w-48 h-48 mx-auto rounded-full" 
                     style="background: conic-gradient(#fed600 0% {getStakePercentage()}%, #333 {getStakePercentage()}% 100%);">
                     <div class="absolute inset-4 bg-card rounded-full flex items-center justify-center">
                         <div class="text-center">
                             <span class="block text-2xl font-bold text-primary">{getStakePercentage().toFixed(1)}%</span>
                             <span class="text-xs text-muted-foreground">STAKED</span>
                         </div>
                     </div>
                </div>
                <div class="mt-6 flex justify-between text-xs">
                    <div class="text-left">
                        <span class="block text-primary font-bold">{(stats.stakeAmount/1e9).toFixed(2)} SOL</span>
                        <span class="text-muted-foreground">Locked</span>
                    </div>
                    <div class="text-right">
                        <span class="block text-white font-bold">{balance.toFixed(2)} SOL</span>
                        <span class="text-muted-foreground">Liquid</span>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>
