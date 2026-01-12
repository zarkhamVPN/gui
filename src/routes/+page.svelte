<script>
  import SpotlightCard from "$lib/components/ui/SpotlightCard.svelte";
  import { Shield, Radio, Wallet, Activity } from "lucide-svelte";
</script>

<div class="space-y-8">
  <!-- Hero Section -->
  <div class="flex flex-col gap-2">
    <h2 class="text-4xl font-bold uppercase tracking-tighter">System Overview</h2>
    <p class="text-muted-foreground max-w-2xl">
      Welcome to the Zarkham dVPN network. Monitor your node status, bandwidth usage, and wallet balance from this centralized command deck.
    </p>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <SpotlightCard>
      <div class="flex items-start justify-between mb-4">
        <Shield class="w-8 h-8 text-primary" />
        <span class="text-xs font-mono text-muted-foreground">WARDEN</span>
      </div>
      <div class="text-3xl font-bold mb-1">ACTIVE</div>
      <p class="text-sm text-muted-foreground">Relaying traffic</p>
    </SpotlightCard>

    <SpotlightCard>
      <div class="flex items-start justify-between mb-4">
        <Radio class="w-8 h-8 text-primary" />
        <span class="text-xs font-mono text-muted-foreground">SEEKER</span>
      </div>
      <div class="text-3xl font-bold mb-1">IDLE</div>
      <p class="text-sm text-muted-foreground">Ready to connect</p>
    </SpotlightCard>

    <SpotlightCard>
      <div class="flex items-start justify-between mb-4">
        <Wallet class="w-8 h-8 text-primary" />
        <span class="text-xs font-mono text-muted-foreground">BALANCE</span>
      </div>
      <div class="text-3xl font-bold mb-1">1.24 SOL</div>
      <p class="text-sm text-muted-foreground">≈ $184.20 USD</p>
    </SpotlightCard>

    <SpotlightCard>
      <div class="flex items-start justify-between mb-4">
        <Activity class="w-8 h-8 text-primary" />
        <span class="text-xs font-mono text-muted-foreground">THROUGHPUT</span>
      </div>
      <div class="text-3xl font-bold mb-1">45 MB/s</div>
      <p class="text-sm text-muted-foreground">Peak velocity</p>
    </SpotlightCard>
  </div>

  <!-- Actions -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <a href="/seeker" class="group relative block">
      <div class="absolute inset-0 bg-primary/20 translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
      <div class="relative bg-card border border-primary p-8 h-full flex flex-col justify-center items-center text-center hover:bg-primary/5 transition-colors">
        <h3 class="text-2xl font-bold mb-2">INITIATE CONNECTION</h3>
        <p class="text-muted-foreground">Search for active Wardens and establish a secure tunnel.</p>
      </div>
    </a>

    <a href="/warden" class="group relative block">
      <div class="absolute inset-0 bg-secondary translate-x-2 translate-y-2 transition-transform group-hover:translate-x-3 group-hover:translate-y-3"></div>
      <div class="relative bg-card border border-border p-8 h-full flex flex-col justify-center items-center text-center hover:border-primary transition-colors">
        <h3 class="text-2xl font-bold mb-2">MANAGE NODE</h3>
        <p class="text-muted-foreground">Configure pricing, view earnings, and monitor node health.</p>
      </div>
    </a>
  </div>
</div>
