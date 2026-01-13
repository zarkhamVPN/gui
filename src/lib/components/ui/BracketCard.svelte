<script>
  import SpotlightCard from "./SpotlightCard.svelte";
</script>

<div class="relative group">
    <!-- Brackets -->
    <div class="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div>
    <div class="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div>
    <div class="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div>
    <div class="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div>

    <SpotlightCard>
        <slot />
    </SpotlightCard>
</div>
