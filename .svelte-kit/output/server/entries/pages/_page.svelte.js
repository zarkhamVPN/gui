import { U as sanitize_props, V as spread_props, W as slot, a1 as bind_props, a2 as attr, a0 as stringify, Y as store_get, $ as attr_class, Z as unsubscribe_stores, X as ensure_array_like } from "../../chunks/index2.js";
import { a as activeMode, b as activeTab } from "../../chunks/app.js";
import "clsx";
import { f as fallback, e as escape_html } from "../../chunks/context.js";
import { S as SpotlightCard, W as Wallet, A as Arrow_right, R as Refresh_cw, C as Copy } from "../../chunks/SpotlightCard.js";
import QRCode from "qrcode";
import { I as Icon } from "../../chunks/Icon.js";
function Arrow_down_left($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M17 7 7 17" }],
    ["path", { "d": "M17 17H7V7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-down-left" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowDownLeft
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMTcgNyA3IDE3IiAvPgogIDxwYXRoIGQ9Ik0xNyAxN0g3VjciIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/arrow-down-left
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Arrow_up_right($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M7 7h10v10" }],
    ["path", { "d": "M7 17 17 7" }]
  ];
  Icon($$renderer, spread_props([
    { name: "arrow-up-right" },
    $$sanitized_props,
    {
      /**
       * @component @name ArrowUpRight
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNNyA3aDEwdjEwIiAvPgogIDxwYXRoIGQ9Ik03IDE3IDE3IDciIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/arrow-up-right
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Clock($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.469.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["circle", { "cx": "12", "cy": "12", "r": "10" }],
    ["polyline", { "points": "12 6 12 12 16 14" }]
  ];
  Icon($$renderer, spread_props([
    { name: "clock" },
    $$sanitized_props,
    {
      /**
       * @component @name Clock
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgLz4KICA8cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0IiAvPgo8L3N2Zz4K) - https://lucide.dev/icons/clock
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
const API_BASE = "/api";
async function getWalletBalance(profile) {
  try {
    const res = await fetch(`${API_BASE}/balance?profile=${profile}`);
    if (!res.ok) throw new Error("Balance API Error");
    return await res.json();
  } catch (e) {
    return { lamports: 0 };
  }
}
async function getAddresses() {
  try {
    const res = await fetch(`${API_BASE}/addresses`);
    if (!res.ok) return {};
    return await res.json();
  } catch (e) {
    return {};
  }
}
async function getHistory(profile) {
  try {
    const res = await fetch(`${API_BASE}/history?profile=${profile}`);
    if (!res.ok) throw new Error("History API Error");
    return await res.json();
  } catch (e) {
    return { solHistory: [], arkhamHistory: [], connectionHistory: [], throughputHistory: [] };
  }
}
function BracketCard($$renderer, $$props) {
  $$renderer.push(`<div class="relative group"><div class="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div> <div class="absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div> <div class="absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div> <div class="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-primary/50 group-hover:border-primary transition-colors z-20"></div> `);
  SpotlightCard($$renderer, {
    children: ($$renderer2) => {
      $$renderer2.push(`<!--[-->`);
      slot($$renderer2, $$props, "default", {});
      $$renderer2.push(`<!--]-->`);
    },
    $$slots: { default: true }
  });
  $$renderer.push(`<!----></div>`);
}
function Loading($$renderer) {
  $$renderer.push(`<div class="flex flex-col items-center justify-center gap-4 p-8"><div class="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div> <span class="text-xs font-mono text-primary animate-pulse tracking-widest">SCANNING...</span></div>`);
}
function WardenOverview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="space-y-8">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="h-[60vh] flex items-center justify-center">`);
      Loading($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function SeekerOverview($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="space-y-8">`);
    {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="h-[60vh] flex items-center justify-center">`);
      Loading($$renderer2);
      $$renderer2.push(`<!----></div>`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function WalletView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let profile = fallback(
      $$props["profile"],
      "warden"
      // 'warden' or 'seeker'
    );
    let balance = 0;
    let address = "Loading...";
    let qrDataUrl = "";
    let loading = true;
    let recipient = "";
    let amount = "";
    async function refresh() {
      loading = true;
      try {
        const addrs = await getAddresses();
        address = addrs[profile] || "Address not found";
        if (address && address !== "Address not found") {
          qrDataUrl = await QRCode.toDataURL(address, { color: { dark: "#fed600", light: "#00000000" }, margin: 1 });
        }
        const balData = await getWalletBalance(profile);
        balance = balData.lamports / 1e9;
      } catch (e) {
        console.error(e);
      } finally {
        loading = false;
      }
    }
    if (profile) {
      refresh();
    }
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="h-[60vh] flex items-center justify-center">`);
      Loading($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">`);
      BracketCard($$renderer2, {
        children: ($$renderer3) => {
          $$renderer3.push(`<div class="flex justify-between items-start mb-6"><span class="text-xs font-mono text-muted-foreground uppercase tracking-widest">${escape_html(profile)} WALLET</span> <button${attr("disabled", loading, true)}>`);
          Refresh_cw($$renderer3, {
            class: `w-4 h-4 text-muted-foreground hover:text-white ${stringify(loading ? "animate-spin" : "")}`
          });
          $$renderer3.push(`<!----></button></div> <div class="flex flex-col md:flex-row gap-8 items-center">`);
          if (qrDataUrl) {
            $$renderer3.push("<!--[-->");
            $$renderer3.push(`<div class="bg-black border border-primary/20 p-2"><img${attr("src", qrDataUrl)} alt="QR Code" class="w-32 h-32"/></div>`);
          } else {
            $$renderer3.push("<!--[!-->");
          }
          $$renderer3.push(`<!--]--> <div class="flex-1 w-full"><div class="text-5xl font-bold text-white mb-2">${escape_html(balance.toFixed(4))} <span class="text-2xl text-primary">SOL</span></div> <div class="flex flex-col gap-2 mt-4"><span class="text-[10px] font-mono text-muted-foreground uppercase">Public Key</span> <button class="flex items-center justify-between bg-card border border-border p-3 hover:border-primary/50 transition-colors group text-left w-full"><span class="text-xs font-mono text-muted-foreground truncate mr-2">${escape_html(address)}</span> `);
          Copy($$renderer3, {
            class: "w-3 h-3 text-muted-foreground group-hover:text-primary"
          });
          $$renderer3.push(`<!----></button></div></div></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <div class="bg-card border border-border p-8 flex flex-col relative overflow-hidden"><div class="absolute top-0 right-0 p-4 opacity-10">`);
      Wallet($$renderer2, { class: "w-32 h-32" });
      $$renderer2.push(`<!----></div> <h3 class="text-xl font-bold mb-6 flex items-center gap-2 italic relative z-10">`);
      Arrow_right($$renderer2, { class: "w-5 h-5 text-primary" });
      $$renderer2.push(`<!----> DISPATCH FUNDS</h3> <div class="space-y-6 relative z-10"><div><label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Recipient</label> <input type="text"${attr("value", recipient)} class="w-full bg-black border border-border p-4 text-sm focus:border-primary outline-none text-white font-mono placeholder:text-muted-foreground/30 transition-colors" placeholder="Solana Address..."/></div> <div><label class="block text-[10px] font-mono text-muted-foreground mb-2 uppercase tracking-widest">Amount</label> <div class="relative"><input type="number"${attr("value", amount)} class="w-full bg-black border border-border p-4 text-xl focus:border-primary outline-none text-white font-mono transition-colors" placeholder="0.00"/> <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-primary font-bold">SOL</span></div></div></div> <button class="w-full bg-primary text-black font-bold py-4 mt-8 hover:bg-white transition-all active:scale-[0.98] relative z-10 uppercase tracking-widest">Execute Transaction</button></div></div>`);
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { profile });
  });
}
function ConsoleView($$renderer) {
  $$renderer.push(`<div class="h-[60vh] bg-black border border-border p-4 font-mono text-xs overflow-y-auto text-muted-foreground"><div class="text-primary mb-2">root@zarkham-node:~# tail -f /var/log/syslog</div> <div class="space-y-1"><p>[INFO] System initialized. Version 1.0.0</p> <p>[INFO] P2P Host started. Listening on 0.0.0.0:0</p> <p>[INFO] Loading wallet profile...</p> <p>[WARN] DHT bootstrap pending...</p> <p class="text-green-500">[SUCCESS] Network uplink established.</p> <p class="animate-pulse">_</p></div></div>`);
}
function TransactionsView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let history = {
      solHistory: []
    };
    let loading = true;
    async function loadHistory() {
      loading = true;
      history = await getHistory(store_get($$store_subs ??= {}, "$activeMode", activeMode));
      loading = false;
    }
    function formatTime(ts) {
      return new Date(ts).toLocaleString();
    }
    if (store_get($$store_subs ??= {}, "$activeMode", activeMode)) loadHistory();
    $$renderer2.push(`<div class="space-y-6"><div class="flex gap-4 border-b border-border pb-1"><button${attr_class(`px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors ${stringify(
      "text-primary border-b-2 border-primary"
    )}`)}>SOLANA</button> <button${attr_class(`px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors ${stringify("text-muted-foreground")}`)}>ARKHAM</button> <button${attr_class(`px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors ${stringify("text-muted-foreground")}`)}>CONNECTIONS</button> <button${attr_class(`px-4 py-2 text-xs font-bold font-mono tracking-widest hover:text-primary transition-colors ${stringify("text-muted-foreground")}`)}>THROUGHPUT</button></div> <div class="min-h-[400px]">`);
    if (loading) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center justify-center h-64">`);
      Loading($$renderer2);
      $$renderer2.push(`<!----></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (history.solHistory) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="space-y-2"><!--[-->`);
        const each_array = ensure_array_like(history.solHistory);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let tx = each_array[$$index];
          $$renderer2.push(`<div class="bg-card border border-border p-4 flex items-center justify-between hover:border-primary/30 transition-colors group"><div class="flex items-center gap-4"><div class="p-2 bg-secondary rounded-none">`);
          if (tx.type.includes("Sent")) {
            $$renderer2.push("<!--[-->");
            Arrow_up_right($$renderer2, { class: "w-4 h-4 text-red-500" });
          } else {
            $$renderer2.push("<!--[!-->");
            Arrow_down_left($$renderer2, { class: "w-4 h-4 text-green-500" });
          }
          $$renderer2.push(`<!--]--></div> <div><div class="font-bold text-sm">${escape_html(tx.type)}</div> <div class="text-[10px] font-mono text-muted-foreground flex items-center gap-1">`);
          Clock($$renderer2, { class: "w-3 h-3" });
          $$renderer2.push(`<!----> ${escape_html(formatTime(tx.timestamp))}</div></div></div> <div class="text-right"><div class="font-mono font-bold">${escape_html((tx.amount / 1e9).toFixed(4))} SOL</div> <div class="text-[10px] text-muted-foreground truncate w-24">${escape_html(tx.signature)}</div></div></div>`);
        }
        $$renderer2.push(`<!--]--> `);
        if (history.solHistory.length === 0) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="text-center text-muted-foreground py-12 text-sm">No transaction history found.</div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function _page($$renderer) {
  var $$store_subs;
  if (store_get($$store_subs ??= {}, "$activeTab", activeTab) === "overview") {
    $$renderer.push("<!--[-->");
    if (store_get($$store_subs ??= {}, "$activeMode", activeMode) === "warden") {
      $$renderer.push("<!--[-->");
      WardenOverview($$renderer);
    } else {
      $$renderer.push("<!--[!-->");
      SeekerOverview($$renderer);
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[!-->");
    if (store_get($$store_subs ??= {}, "$activeTab", activeTab) === "wallet") {
      $$renderer.push("<!--[-->");
      WalletView($$renderer, {
        profile: store_get($$store_subs ??= {}, "$activeMode", activeMode)
      });
    } else {
      $$renderer.push("<!--[!-->");
      if (store_get($$store_subs ??= {}, "$activeTab", activeTab) === "history") {
        $$renderer.push("<!--[-->");
        TransactionsView($$renderer);
      } else {
        $$renderer.push("<!--[!-->");
        if (store_get($$store_subs ??= {}, "$activeTab", activeTab) === "console") {
          $$renderer.push("<!--[-->");
          ConsoleView($$renderer);
        } else {
          $$renderer.push("<!--[!-->");
        }
        $$renderer.push(`<!--]-->`);
      }
      $$renderer.push(`<!--]-->`);
    }
    $$renderer.push(`<!--]-->`);
  }
  $$renderer.push(`<!--]-->`);
  if ($$store_subs) unsubscribe_stores($$store_subs);
}
export {
  _page as default
};
