import { a2 as attr, a0 as stringify, X as ensure_array_like } from "../../../chunks/index2.js";
import { R as Refresh_cw, S as SpotlightCard, A as Arrow_right, W as Wallet, C as Copy } from "../../../chunks/SpotlightCard.js";
import { e as escape_html } from "../../../chunks/context.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let addresses = {};
    let loading = true;
    let recipient = "";
    let amount = "";
    $$renderer2.push(`<div class="space-y-8"><div class="flex items-center justify-between"><h2 class="text-4xl font-bold uppercase tracking-tighter">Command Wallet</h2> <button class="p-2 border border-border hover:bg-primary/10 hover:text-primary transition-colors"${attr("disabled", loading, true)}>`);
    Refresh_cw($$renderer2, {
      class: `w-5 h-5 ${stringify("animate-spin")}`
    });
    $$renderer2.push(`<!----></button></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
    SpotlightCard($$renderer2, {
      children: ($$renderer3) => {
        $$renderer3.push(`<div class="flex justify-between items-start mb-6"><span class="text-xs font-mono text-muted-foreground">LIQUID ASSETS</span> `);
        Wallet($$renderer3, { class: "w-5 h-5 text-primary" });
        $$renderer3.push(`<!----></div> `);
        {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<div class="h-12 bg-white/5 animate-pulse w-3/4 mb-4"></div>`);
        }
        $$renderer3.push(`<!--]--> <div class="space-y-3 mt-8"><!--[-->`);
        const each_array = ensure_array_like(Object.entries(addresses));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let [name, addr] = each_array[$$index];
          $$renderer3.push(`<div class="flex flex-col gap-1"><span class="text-[10px] font-mono text-muted-foreground uppercase">${escape_html(name)} ADDRESS</span> <div class="flex items-center justify-between bg-black border border-border p-3 cursor-pointer hover:border-primary/50 transition-colors group"><span class="text-xs font-mono text-muted-foreground truncate mr-4">${escape_html(addr)}</span> `);
          Copy($$renderer3, {
            class: "w-3 h-3 text-muted-foreground group-hover:text-primary"
          });
          $$renderer3.push(`<!----></div></div>`);
        }
        $$renderer3.push(`<!--]--></div>`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----> <div class="bg-card border border-border p-6 flex flex-col"><div class="flex-1"><h3 class="text-xl font-bold mb-6 flex items-center gap-2 italic">`);
    Arrow_right($$renderer2, { class: "w-5 h-5 text-primary" });
    $$renderer2.push(`<!----> DISPATCH FUNDS</h3> <div class="space-y-6"><div><label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Recipient Pubkey</label> <input type="text"${attr("value", recipient)} class="w-full bg-background border border-border p-4 text-sm focus:border-primary outline-none text-white font-mono placeholder:text-muted-foreground/30" placeholder="Enter Solana Address..."/></div> <div><label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Amount (SOL)</label> <div class="relative"><input type="number"${attr("value", amount)} class="w-full bg-background border border-border p-4 text-xl focus:border-primary outline-none text-white font-mono" placeholder="0.00"/> <button class="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:text-white transition-colors">MAX</button></div></div></div></div> <button class="w-full bg-primary text-black font-bold py-4 mt-8 hover:invert transition-all active:scale-[0.98]">EXECUTE TRANSACTION</button></div></div> <div class="border border-border bg-card/30 p-6 italic text-center text-muted-foreground text-sm">Transaction history synchronization in progress...</div></div>`);
  });
}
export {
  _page as default
};
