<script lang="ts">
  import { onMount } from "svelte";
  import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
  import { getWardenStatus, checkWardenCorruption, migrateWarden, registerWarden, getNodeStatus } from "$lib/api";
  import { Shield, Zap, AlertTriangle, CheckCircle, Server, Copy } from "lucide-svelte";

  let loading = true;
  let isRegistered = false;
  let wardenData: any = null;
  let nodeStatus: any = null;
  let corruptionStatus: any = null;
  let showRegisterModal = false;

  // Registration Form
  let stakeAmount = 1.0;
  let stakeToken = "SOL";

  const PROFILE = "warden"; // Default profile

  onMount(async () => {
    await loadData();
  });

  async function loadData() {
    loading = true;
    const status = await getWardenStatus(PROFILE);
    isRegistered = status.is_registered;
    wardenData = status.warden;
    nodeStatus = await getNodeStatus();

    if (isRegistered) {
        corruptionStatus = await checkWardenCorruption(PROFILE);
    }
    loading = false;
  }

  async function handleRegister() {
      try {
          await registerWarden(PROFILE, stakeToken, stakeAmount);
          showRegisterModal = false;
          await loadData();
      } catch (e) {
          alert("Registration failed: " + e);
      }
  }

  async function handleMigration() {
      if (confirm("This will attempt to fix account data serialization issues. Continue?")) {
          await migrateWarden(PROFILE);
          await loadData();
      }
  }
  
  let copyText = "Copy";
  async function copyMultiaddr() {
      if(!nodeStatus?.p2pMultiaddr) return;
      try {
          await navigator.clipboard.writeText(nodeStatus.p2pMultiaddr);
          copyText = "Copied!";
          setTimeout(() => copyText = "Copy", 2000);
      } catch (err) {
          console.error('Failed to copy: ', err);
      }
  }
</script>

<div class="space-y-8">
  <div class="flex items-center justify-between">
    <div>
        <h2 class="text-4xl font-bold uppercase tracking-tighter">Warden Console</h2>
        <p class="text-muted-foreground">Manage your node and earnings.</p>
    </div>
    {#if isRegistered}
        <div class="flex items-center gap-2 text-green-500 font-mono text-sm border border-green-500/30 px-3 py-1 bg-green-500/10">
            <div class="w-2 h-2 bg-green-500 animate-pulse"></div>
            NODE ONLINE
        </div>
    {/if}
  </div>

  {#if loading}
    <div class="h-64 flex items-center justify-center border border-border bg-card">
        <span class="animate-pulse font-mono">INITIALIZING UPLINK...</span>
    </div>
  {:else if !isRegistered}
    <!-- Not Registered State -->
    <div class="h-[60vh] flex flex-col items-center justify-center border border-dashed border-border bg-card/50">
        <Shield class="w-16 h-16 text-muted-foreground mb-4" />
        <h3 class="text-2xl font-bold mb-2">NO ACTIVE NODE FOUND</h3>
        <p class="text-muted-foreground max-w-md text-center mb-8">
            Stake tokens to activate your Warden node and begin relaying traffic for the Zarkham network.
        </p>
        <button 
            class="bg-primary text-primary-foreground px-8 py-3 font-bold hover:bg-primary/90 transition-colors"
            onclick={() => showRegisterModal = true}
        >
            INITIALIZE WARDEN
        </button>
    </div>
  {:else}
    <!-- Dashboard Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="md:col-span-2 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <!-- Earnings -->
                <SpotlightCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground">TOTAL EARNINGS</span>
                        <Zap class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-4xl font-bold text-primary">
                        {(wardenData.totalEarnings / 1e9).toFixed(4)} <span class="text-lg text-white">SOL</span>
                    </div>
                    <p class="text-xs text-muted-foreground mt-2">
                        Pending: {(wardenData.pendingClaims / 1e9).toFixed(4)} SOL
                    </p>
                </SpotlightCard>

                <!-- Bandwidth -->
                <SpotlightCard>
                    <div class="flex justify-between mb-4">
                        <span class="text-xs font-mono text-muted-foreground">DATA RELAYED</span>
                        <Server class="w-5 h-5 text-primary" />
                    </div>
                    <div class="text-4xl font-bold text-white">
                        {(wardenData.totalBandwidthServed / 1024).toFixed(2)} <span class="text-lg text-muted-foreground">GB</span>
                    </div>
                    <div class="mt-4 flex gap-2 text-xs font-mono">
                        <span class="bg-card border border-border px-2 py-1">UP: 99.9%</span>
                        <span class="bg-card border border-border px-2 py-1">CONN: {wardenData.activeConnections}</span>
                    </div>
                </SpotlightCard>
            </div>
             <!-- Multiaddr Display -->
            <SpotlightCard>
                <div class="flex justify-between items-center mb-4">
                    <span class="text-xs font-mono text-muted-foreground">DIRECT CONNECT</span>
                     <button class="flex items-center gap-2 text-xs hover:text-primary transition-colors" onclick={copyMultiaddr}>
                        <Copy class="w-3 h-3" /> {copyText}
                    </button>
                </div>
                <div class="p-3 bg-background border border-border font-mono text-xs break-all">
                    {nodeStatus?.p2pMultiaddr || 'Not available'}
                </div>
                <p class="text-[10px] text-muted-foreground mt-2">Share this multiaddr with Seekers for direct connection.</p>
            </SpotlightCard>
        </div>
       

        <!-- Right Column (Health) -->
        <SpotlightCard>
            <div class="flex justify-between mb-4">
                <span class="text-xs font-mono text-muted-foreground">SYSTEM HEALTH</span>
                <CheckCircle class="w-5 h-5 text-green-500" />
            </div>
            
            <div class="space-y-4">
                <div class="text-xs font-mono text-muted-foreground break-all">
                    <span class="block text-white mb-1">PEER ID:</span>
                    {wardenData.peerId}
                </div>

                {#if corruptionStatus?.corrupted}
                    <div class="bg-red-900/20 border border-red-500/50 p-3">
                        <div class="flex items-center gap-2 text-red-500 font-bold text-xs mb-1">
                            <AlertTriangle class="w-4 h-4" />
                            ACCOUNT CORRUPTED
                        </div>
                        <p class="text-[10px] text-red-200 mb-2">On-chain data mismatch detected.</p>
                        <button 
                            class="w-full bg-red-600 text-white text-xs py-1 hover:bg-red-500"
                            onclick={handleMigration}
                        >
                            RUN MIGRATION TOOL
                        </button>
                    </div>
                {:else}
                    <div class="text-xs text-green-500 flex items-center gap-2">
                        <CheckCircle class="w-3 h-3" /> Integrity Verified
                    </div>
                {/if}
            </div>
        </SpotlightCard>
    </div>
  {/if}

  <!-- Register Modal -->
  {#if showRegisterModal}
    <div class="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
        <div class="bg-card border border-border max-w-md w-full p-8 space-y-6">
            <h3 class="text-2xl font-bold">Warden Activation</h3>
            
            <div class="space-y-4">
                <div>
                    <label class="block text-xs font-mono text-muted-foreground mb-2">STAKE TOKEN</label>
                    <div class="grid grid-cols-2 gap-2">
                        <button 
                            class="border px-4 py-2 {stakeToken === 'SOL' ? 'bg-primary text-black border-primary' : 'border-border text-muted-foreground'}"
                            onclick={() => stakeToken = 'SOL'}
                        >SOL</button>
                        <button 
                            class="border px-4 py-2 {stakeToken === 'USDC' ? 'bg-primary text-black border-primary' : 'border-border text-muted-foreground'}"
                            onclick={() => stakeToken = 'USDC'}
                        >USDC</button>
                    </div>
                </div>

                <div>
                    <label class="block text-xs font-mono text-muted-foreground mb-2">STAKE AMOUNT</label>
                    <input 
                        type="number" 
                        bind:value={stakeAmount}
                        class="w-full bg-background border border-border p-2 text-white focus:border-primary outline-none"
                    />
                </div>
            </div>

            <div class="flex gap-4">
                <button 
                    class="flex-1 bg-primary text-black font-bold py-3 hover:bg-primary/90"
                    onclick={handleRegister}
                >
                    CONFIRM STAKE
                </button>
                <button 
                    class="px-4 py-3 text-muted-foreground hover:text-white"
                    onclick={() => showRegisterModal = false}
                >
                    CANCEL
                </button>
            </div>
        </div>
    </div>
  {/if}
</div>
