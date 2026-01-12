<script>
  import "../app.css";
</script>

<svelte:head>
  <title>ZARKHAM</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen flex flex-col font-sans selection:bg-primary selection:text-primary-foreground">
  <!-- Header -->
  <header class="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <div class="w-3 h-8 bg-primary"></div>
        <h1 class="text-2xl font-bold tracking-tighter">ZARKHAM</h1>
      </div>
      
      <nav class="flex gap-6 text-sm font-medium">
        <a href="/" class="hover:text-primary transition-colors">DASHBOARD</a>
        <a href="/warden" class="hover:text-primary transition-colors">WARDEN</a>
        <a href="/seeker" class="hover:text-primary transition-colors">SEEKER</a>
        <a href="/wallet" class="hover:text-primary transition-colors">WALLET</a>
      </nav>
    </div>
  </header>

  <!-- Main Content -->
  <main class="flex-1 container mx-auto px-4 py-8">
    <slot />
  </main>

  <!-- Status Bar / Footer -->
  <footer class="border-t border-border py-4 bg-card text-xs text-muted-foreground">
    <div class="container mx-auto px-4 flex justify-between">
      <span>ZARKHAM CORE v1.0.0</span>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 bg-green-500 rounded-none"></div>
        <span>ONLINE</span>
      </div>
    </div>
  </footer>
</div>
