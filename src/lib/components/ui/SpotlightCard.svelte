<script lang="ts">
  let div: HTMLDivElement;

  function handleMouseMove(e: MouseEvent) {
    if (!div) return;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    div.style.setProperty("--x", `${x}px`);
    div.style.setProperty("--y", `${y}px`);
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  bind:this={div}
  on:mousemove={handleMouseMove}
  class="spotlight-card bg-card border border-border p-6 hover:border-primary/50 transition-colors"
>
  <div class="relative z-10">
    <slot />
  </div>
</div>
