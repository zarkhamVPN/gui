<script lang="ts">
  import "../app.css";
  import ToastContainer from "$lib/components/ui/ToastContainer.svelte";
  import { Shield, Radio, ChevronDown, Wifi, Lock } from "lucide-svelte";
  import { activeMode, activeTab } from "$lib/stores/app";
  import { onMount } from "svelte";
  import { getProfile } from "$lib/api";

  let showDropdown = false;

  onMount(async () => {
      const data = await getProfile();
      if (data.profile === 'seeker') {
          $activeMode = 'seeker';
      } else {
          $activeMode = 'warden';
      }
  });

  function switchMode(mode: 'warden' | 'seeker') {
      $activeMode = mode;
      $activeTab = 'overview';
      showDropdown = false;
  }

  function setTab(tab: string) {
      $activeTab = tab;
  }
</script>

<svelte:head>
  <title>ZARKHAM</title>
</svelte:head>

<div class="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
  <div class="star-layer"></div>
  <ToastContainer />
  
  <!-- Main Header -->
  <header class="border-b border-border bg-black/80 backdrop-blur-md sticky top-0 z-50">
    <div class="container mx-auto px-6 h-16 flex items-center justify-between">
      <!-- Logo -->
      <div class="flex items-center gap-2">
        <h1 class="text-2xl font-bold tracking-tighter">
          <span class="text-primary">Z</span>AR<span class="text-primary">K</span>HAM
        </h1>
      </div>
      
      <!-- Role Switcher -->
      <div class="relative">
        <button 
            class="flex items-center gap-3 bg-card border border-border px-4 py-2 hover:border-primary/50 transition-colors w-48 justify-between"
            onclick={() => showDropdown = !showDropdown}
        >
            <div class="flex items-center gap-2">
                {#if $activeMode === 'warden'}
                    <Shield class="w-4 h-4 text-primary" />
                    <span class="font-bold text-sm tracking-widest">WARDEN</span>
                {:else}
                    <Radio class="w-4 h-4 text-primary" />
                    <span class="font-bold text-sm tracking-widest">SEEKER</span>
                {/if}
            </div>
            <ChevronDown class="w-4 h-4 text-muted-foreground" />
        </button>

        {#if showDropdown}
            <div class="absolute top-full right-0 mt-2 w-48 bg-card border border-border shadow-xl z-50 flex flex-col">
                <button 
                    class="flex items-center gap-2 px-4 py-3 hover:bg-primary/10 text-left transition-colors {$activeMode === 'warden' ? 'text-primary' : 'text-muted-foreground'}"
                    onclick={() => switchMode('warden')}
                >
                    <Shield class="w-4 h-4" />
                    <span class="text-sm font-bold">WARDEN</span>
                </button>
                <button 
                    class="flex items-center gap-2 px-4 py-3 hover:bg-primary/10 text-left transition-colors {$activeMode === 'seeker' ? 'text-primary' : 'text-muted-foreground'}"
                    onclick={() => switchMode('seeker')}
                >
                    <Radio class="w-4 h-4" />
                    <span class="text-sm font-bold">SEEKER</span>
                </button>
            </div>
        {/if}
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="border-t border-border bg-black/50">
        <div class="container mx-auto px-6 flex gap-8">
            <button 
                class="py-3 text-xs font-mono tracking-widest border-b-2 transition-colors {$activeTab === 'overview' ? 'border-primary text-white' : 'border-transparent text-muted-foreground hover:text-white'}"
                onclick={() => setTab('overview')}
            >
                OVERVIEW
            </button>
            <button 
                class="py-3 text-xs font-mono tracking-widest border-b-2 transition-colors {$activeTab === 'wallet' ? 'border-primary text-white' : 'border-transparent text-muted-foreground hover:text-white'}"
                onclick={() => setTab('wallet')}
            >
                WALLET
            </button>
            <button 
                class="py-3 text-xs font-mono tracking-widest border-b-2 transition-colors {$activeTab === 'history' ? 'border-primary text-white' : 'border-transparent text-muted-foreground hover:text-white'}"
                onclick={() => setTab('history')}
            >
                HISTORY
            </button>
            <button 
                class="py-3 text-xs font-mono tracking-widest border-b-2 transition-colors {$activeTab === 'console' ? 'border-primary text-white' : 'border-transparent text-muted-foreground hover:text-white'}"
                onclick={() => setTab('console')}
            >
                CONSOLE
            </button>
        </div>
    </div>
  </header>

  <!-- Main Content Area -->
  <main class="flex-1 container mx-auto px-6 py-8">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="border-t border-border py-4 bg-card text-[10px] uppercase font-mono text-muted-foreground tracking-widest">
    <div class="container mx-auto px-6 flex justify-between items-center">
      <span>ZARKHAM CORE v1.0.0</span>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <Wifi class="w-3 h-3 text-green-500" />
          <span>NETWORK ONLINE</span>
        </div>
        <div class="flex items-center gap-2">
          <Lock class="w-3 h-3 text-primary" />
          <span>SECURE UPLINK</span>
        </div>
      </div>
    </div>
  </footer>
</div>