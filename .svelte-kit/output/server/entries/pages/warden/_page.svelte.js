import "clsx";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="space-y-8"><div class="flex items-center justify-between"><div><h2 class="text-4xl font-bold uppercase tracking-tighter">Warden Console</h2> <p class="text-muted-foreground">Manage your node and earnings.</p></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="h-64 flex items-center justify-center border border-border bg-card"><span class="animate-pulse font-mono">INITIALIZING UPLINK...</span></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  _page as default
};
