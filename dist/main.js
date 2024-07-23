// ==UserScript==
// @name            Vue生产环境（production） Devtools 调试
// @namespace       https://github.com/xcr1234/vue-devtools-production
// @version         2.0.0
// @description     使用本脚本支持直接调试生产环境的Vue项目 完美支持Vue2、Vue3！
// @homepage        https://github.com/xcr1234/vue-devtools-production
// @icon            data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAbpJREFUOE+lkz9IG2EYxp/3Eo1GHWzFDqFKLQ6CIGpLS9GSQzGniw5OLTg6CCLO5kT86FpolnR3kFYXJ+9o2u9EcPEPEdqp4qKlbbaihpxw98n3JUqMqYp+03s87/P7/jzvEe656J5+KIC+ymwQBmR99OGnYgoh1rethdeyfjY4tg6gR9Z1U615HfTFMeIDCtC38u6RH/L/yPo0/S/lrmX6VRfRKAEBIcQn+Vn5on4j9LLhlQL43mNnaO7w4grR1XlGRHEpHn/c3xWu1wHgBwANQBtVaPu1E09bCuAEj8Wn1B7Fb6Bb7ARA2Pud28l+Pugq1sIjke+B5nA7gBw3zOpz7RIgarNREliSYnb5IOX9yqmraA2hzZq3Tc/Vjj4mvg2ZybIA9aAW4wCivutnjpN7NUSk1Y4/yVJ18CGANDfMzuKTXYlRt+e7IWhLNrk8w4WPYFVfY28+GejOoOlcCyjEmgBhsmRGFrlhvimdm7KDFLPmHpwikAEQyBvI01yKfB2e+XsrgDqFzaYh8L5gmOWGyUrNV2IsbdAtlgYQ5IYp4yu7rv0XojYbkQAnZi7fCfA/040p3MZ43nMG7TKHEfrJ20kAAAAASUVORK5CYII=
// @include         *
// @run-at          document-end
// @grant           none
// ==/UserScript==
const v = (e, n) => {
  let o = Object.getPrototypeOf(n).constructor;
  for (; o.super; )
    o = o.super;
  if (!o.config.devtools && (o.config.devtools = !0, e.emit("init", o), console.log(`vue devtools for [${o.version}] already open !!!`), n.$store)) {
    const t = n.$store;
    t._devtoolHook = e, e.emit("vuex:init", t), e.on("vuex:travel-to-state", (s) => {
      t.replaceState(s);
    }), t.subscribe((s, a) => {
      e.emit("vuex:mutation", s, a);
    });
  }
};
/**
* @vue/shared v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const N = (e) => typeof e == "symbol";
/**
* @vue/reactivity v3.4.33
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(N)
);
function E(e) {
  const n = e && e.__v_raw;
  return n ? E(n) : e;
}
function R() {
  return I().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function I() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const C = typeof Proxy == "function", U = "devtools-plugin:setup", D = "plugin:settings:set";
let _, m;
function G() {
  var e;
  return _ !== void 0 || (typeof window < "u" && window.performance ? (_ = !0, m = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (_ = !0, m = globalThis.perf_hooks.performance) : _ = !1), _;
}
function M() {
  return G() ? m.now() : Date.now();
}
class F {
  constructor(n, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = n, this.hook = o;
    const t = {};
    if (n.settings)
      for (const i in n.settings) {
        const r = n.settings[i];
        t[i] = r.defaultValue;
      }
    const s = `__vue-devtools-plugin-settings__${n.id}`;
    let a = Object.assign({}, t);
    try {
      const i = localStorage.getItem(s), r = JSON.parse(i);
      Object.assign(a, r);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(s, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return M();
      }
    }, o && o.on(D, (i, r) => {
      i === this.plugin.id && this.fallbacks.setSettings(r);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, r) => this.target ? this.target.on[r] : (...c) => {
        this.onQueue.push({
          method: r,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, r) => this.target ? this.target[r] : r === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(r) ? (...c) => (this.targetQueue.push({
        method: r,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[r](...c)) : (...c) => new Promise((f) => {
        this.targetQueue.push({
          method: r,
          args: c,
          resolve: f
        });
      })
    });
  }
  async setRealTarget(n) {
    this.target = n;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function H(e, n) {
  const o = e, t = I(), s = R(), a = C && o.enableEarlyProxy;
  if (s && (t.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    s.emit(U, e, n);
  else {
    const i = a ? new F(o, s) : null;
    (t.__VUE_DEVTOOLS_PLUGINS__ = t.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: n,
      proxy: i
    }), i && n(i.proxiedTarget);
  }
}
/*!
 * pinia v2.1.7
 * (c) 2023 Eduardo San Martin Morote
 * @license MIT
 */
var b;
(function(e) {
  e.direct = "direct", e.patchObject = "patch object", e.patchFunction = "patch function";
})(b || (b = {}));
const J = typeof window < "u";
const O = typeof window == "object" && window.window === window ? window : typeof self == "object" && self.self === self ? self : typeof global == "object" && global.global === global ? global : typeof globalThis == "object" ? globalThis : { HTMLElement: null };
function B(e, { autoBom: n = !1 } = {}) {
  return n && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type) ? new Blob(["\uFEFF", e], { type: e.type }) : e;
}
function S(e, n, o) {
  const t = new XMLHttpRequest();
  t.open("GET", e), t.responseType = "blob", t.onload = function() {
    A(t.response, n, o);
  }, t.onerror = function() {
    console.error("could not download file");
  }, t.send();
}
function L(e) {
  const n = new XMLHttpRequest();
  n.open("HEAD", e, !1);
  try {
    n.send();
  } catch {
  }
  return n.status >= 200 && n.status <= 299;
}
function g(e) {
  try {
    e.dispatchEvent(new MouseEvent("click"));
  } catch {
    const o = document.createEvent("MouseEvents");
    o.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), e.dispatchEvent(o);
  }
}
const h = typeof navigator == "object" ? navigator : { userAgent: "" }, P = /Macintosh/.test(h.userAgent) && /AppleWebKit/.test(h.userAgent) && !/Safari/.test(h.userAgent), A = J ? (
  // Use download attribute first if possible (#193 Lumia mobile) unless this is a macOS WebView or mini program
  typeof HTMLAnchorElement < "u" && "download" in HTMLAnchorElement.prototype && !P ? Q : (
    // Use msSaveOrOpenBlob as a second approach
    "msSaveOrOpenBlob" in h ? K : (
      // Fallback to using FileReader and a popup
      Y
    )
  )
) : () => {
};
function Q(e, n = "download", o) {
  const t = document.createElement("a");
  t.download = n, t.rel = "noopener", typeof e == "string" ? (t.href = e, t.origin !== location.origin ? L(t.href) ? S(e, n, o) : (t.target = "_blank", g(t)) : g(t)) : (t.href = URL.createObjectURL(e), setTimeout(function() {
    URL.revokeObjectURL(t.href);
  }, 4e4), setTimeout(function() {
    g(t);
  }, 0));
}
function K(e, n = "download", o) {
  if (typeof e == "string")
    if (L(e))
      S(e, n, o);
    else {
      const t = document.createElement("a");
      t.href = e, t.target = "_blank", setTimeout(function() {
        g(t);
      });
    }
  else
    navigator.msSaveOrOpenBlob(B(e, o), n);
}
function Y(e, n, o, t) {
  if (t = t || open("", "_blank"), t && (t.document.title = t.document.body.innerText = "downloading..."), typeof e == "string")
    return S(e, n, o);
  const s = e.type === "application/octet-stream", a = /constructor/i.test(String(O.HTMLElement)) || "safari" in O, i = /CriOS\/[\d]+/.test(navigator.userAgent);
  if ((i || s && a || P) && typeof FileReader < "u") {
    const r = new FileReader();
    r.onloadend = function() {
      let c = r.result;
      if (typeof c != "string")
        throw t = null, new Error("Wrong reader.result type");
      c = i ? c : c.replace(/^data:[^;]*;/, "data:attachment/file;"), t ? t.location.href = c : location.assign(c), t = null;
    }, r.readAsDataURL(e);
  } else {
    const r = URL.createObjectURL(e);
    t ? t.location.assign(r) : location.href = r, t = null, setTimeout(function() {
      URL.revokeObjectURL(r);
    }, 4e4);
  }
}
function l(e, n) {
  const o = "🍍 " + e;
  typeof __VUE_DEVTOOLS_TOAST__ == "function" ? __VUE_DEVTOOLS_TOAST__(o, n) : n === "error" ? console.error(o) : n === "warn" ? console.warn(o) : console.log(o);
}
function w(e) {
  return "_a" in e && "install" in e;
}
function x() {
  if (!("clipboard" in navigator))
    return l("Your browser doesn't support the Clipboard API", "error"), !0;
}
function $(e) {
  return e instanceof Error && e.message.toLowerCase().includes("document is not focused") ? (l('You need to activate the "Emulate a focused page" setting in the "Rendering" panel of devtools.', "warn"), !0) : !1;
}
async function z(e) {
  if (!x())
    try {
      await navigator.clipboard.writeText(JSON.stringify(e.state.value)), l("Global state copied to clipboard.");
    } catch (n) {
      if ($(n))
        return;
      l("Failed to serialize the state. Check the console for more details.", "error"), console.error(n);
    }
}
async function W(e) {
  if (!x())
    try {
      k(e, JSON.parse(await navigator.clipboard.readText())), l("Global state pasted from clipboard.");
    } catch (n) {
      if ($(n))
        return;
      l("Failed to deserialize the state from clipboard. Check the console for more details.", "error"), console.error(n);
    }
}
async function q(e) {
  try {
    A(new Blob([JSON.stringify(e.state.value)], {
      type: "text/plain;charset=utf-8"
    }), "pinia-state.json");
  } catch (n) {
    l("Failed to export the state as JSON. Check the console for more details.", "error"), console.error(n);
  }
}
let u;
function X() {
  u || (u = document.createElement("input"), u.type = "file", u.accept = ".json");
  function e() {
    return new Promise((n, o) => {
      u.onchange = async () => {
        const t = u.files;
        if (!t)
          return n(null);
        const s = t.item(0);
        return n(s ? { text: await s.text(), file: s } : null);
      }, u.oncancel = () => n(null), u.onerror = o, u.click();
    });
  }
  return e;
}
async function Z(e) {
  try {
    const o = await X()();
    if (!o)
      return;
    const { text: t, file: s } = o;
    k(e, JSON.parse(t)), l(`Global state imported from "${s.name}".`);
  } catch (n) {
    l("Failed to import the state from JSON. Check the console for more details.", "error"), console.error(n);
  }
}
function k(e, n) {
  for (const o in n) {
    const t = e.state.value[o];
    t ? Object.assign(t, n[o]) : e.state.value[o] = n[o];
  }
}
const j = "🍍 Pinia (root)", p = "_root";
function ee(e) {
  return w(e) ? {
    id: p,
    label: j
  } : {
    id: e.$id,
    label: e.$id
  };
}
function te(e) {
  if (w(e)) {
    const o = Array.from(e._s.keys()), t = e._s;
    return {
      state: o.map((a) => ({
        editable: !0,
        key: a,
        value: e.state.value[a]
      })),
      getters: o.filter((a) => t.get(a)._getters).map((a) => {
        const i = t.get(a);
        return {
          editable: !1,
          key: a,
          value: i._getters.reduce((r, c) => (r[c] = i[c], r), {})
        };
      })
    };
  }
  const n = {
    state: Object.keys(e.$state).map((o) => ({
      editable: !0,
      key: o,
      value: e.$state[o]
    }))
  };
  return e._getters && e._getters.length && (n.getters = e._getters.map((o) => ({
    editable: !1,
    key: o,
    value: e[o]
  }))), e._customProperties.size && (n.customProperties = Array.from(e._customProperties).map((o) => ({
    editable: !0,
    key: o,
    value: e[o]
  }))), n;
}
const ne = [], oe = "pinia:mutations", d = "pinia", y = (e) => "🍍 " + e;
function re(e, n) {
  H({
    id: "dev.esm.pinia",
    label: "Pinia 🍍",
    logo: "https://pinia.vuejs.org/logo.svg",
    packageName: "pinia",
    homepage: "https://pinia.vuejs.org",
    componentStateTypes: ne,
    app: e
  }, (o) => {
    typeof o.now != "function" && l("You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.addTimelineLayer({
      id: oe,
      label: "Pinia 🍍",
      color: 15064968
    }), o.addInspector({
      id: d,
      label: "Pinia 🍍",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      actions: [
        {
          icon: "content_copy",
          action: () => {
            z(n);
          },
          tooltip: "Serialize and copy the state"
        },
        {
          icon: "content_paste",
          action: async () => {
            await W(n), o.sendInspectorTree(d), o.sendInspectorState(d);
          },
          tooltip: "Replace the state with the content of your clipboard"
        },
        {
          icon: "save",
          action: () => {
            q(n);
          },
          tooltip: "Save the state as a JSON file"
        },
        {
          icon: "folder_open",
          action: async () => {
            await Z(n), o.sendInspectorTree(d), o.sendInspectorState(d);
          },
          tooltip: "Import the state from a JSON file"
        }
      ],
      nodeActions: [
        {
          icon: "restore",
          tooltip: 'Reset the state (with "$reset")',
          action: (t) => {
            const s = n._s.get(t);
            s ? typeof s.$reset != "function" ? l(`Cannot reset "${t}" store because it doesn't have a "$reset" method implemented.`, "warn") : (s.$reset(), l(`Store "${t}" reset.`)) : l(`Cannot reset "${t}" store because it wasn't found.`, "warn");
          }
        }
      ]
    }), o.on.inspectComponent((t, s) => {
      const a = t.componentInstance && t.componentInstance.proxy;
      if (a && a._pStores) {
        const i = t.componentInstance.proxy._pStores;
        Object.values(i).forEach((r) => {
          t.instanceData.state.push({
            type: y(r.$id),
            key: "state",
            editable: !0,
            value: r._isOptionsAPI ? {
              _custom: {
                value: E(r.$state),
                actions: [
                  {
                    icon: "restore",
                    tooltip: "Reset the state of this store",
                    action: () => r.$reset()
                  }
                ]
              }
            } : (
              // NOTE: workaround to unwrap transferred refs
              Object.keys(r.$state).reduce((c, f) => (c[f] = r.$state[f], c), {})
            )
          }), r._getters && r._getters.length && t.instanceData.state.push({
            type: y(r.$id),
            key: "getters",
            editable: !1,
            value: r._getters.reduce((c, f) => {
              try {
                c[f] = r[f];
              } catch (V) {
                c[f] = V;
              }
              return c;
            }, {})
          });
        });
      }
    }), o.on.getInspectorTree((t) => {
      if (t.app === e && t.inspectorId === d) {
        let s = [n];
        s = s.concat(Array.from(n._s.values())), t.rootNodes = (t.filter ? s.filter((a) => "$id" in a ? a.$id.toLowerCase().includes(t.filter.toLowerCase()) : j.toLowerCase().includes(t.filter.toLowerCase())) : s).map(ee);
      }
    }), o.on.getInspectorState((t) => {
      if (t.app === e && t.inspectorId === d) {
        const s = t.nodeId === p ? n : n._s.get(t.nodeId);
        if (!s)
          return;
        s && (t.state = te(s));
      }
    }), o.on.editInspectorState((t, s) => {
      if (t.app === e && t.inspectorId === d) {
        const a = t.nodeId === p ? n : n._s.get(t.nodeId);
        if (!a)
          return l(`store "${t.nodeId}" not found`, "error");
        const { path: i } = t;
        w(a) ? i.unshift("state") : (i.length !== 1 || !a._customProperties.has(i[0]) || i[0] in a.$state) && i.unshift("$state"), t.set(a, i, t.state.value);
      }
    }), o.on.editComponentState((t) => {
      if (t.type.startsWith("🍍")) {
        const s = t.type.replace(/^🍍\s*/, ""), a = n._s.get(s);
        if (!a)
          return l(`store "${s}" not found`, "error");
        const { path: i } = t;
        if (i[0] !== "state")
          return l(`Invalid path for store "${s}":
${i}
Only state can be modified.`);
        i[0] = "$state", t.set(a, i, t.state.value);
      }
    });
  });
}
const T = (e, n) => {
  if (n.config.devtools)
    return;
  n.config.devtools = !0, e.emit("app:init", n, n.version, {
    Fragment: Symbol.for("Fragment"),
    Text: Symbol.for("Text"),
    Comment: Symbol.for("Comment"),
    Static: Symbol.for("Static")
  }), console.log(`vue devtools for [${n.version}] already open !!!`);
  const o = n.unmount.bind(n);
  n.unmount = () => {
    e.emit("app:unmount", n), o();
  }, n.config.globalProperties.$store && console.warn("vuex for vue3 not support. please use pinia");
  const t = n.config.globalProperties.$pinia;
  t && re(n, t);
}, se = () => {
  if (self != top)
    return;
  const e = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  if (!e) {
    console.warn("No Vue devtools found , Please install it first: "), console.warn("see https://github.com/vuejs/vue-devtools");
    return;
  }
  const n = window.app;
  if (!n)
    return;
  if (n.__vue__) {
    v(e, n.__vue__);
    return;
  }
  if (n.__vue_app__) {
    T(e, n.__vue_app__);
    return;
  }
  new MutationObserver((t, s) => {
    const a = s.disconnect.bind(s);
    for (const i of t) {
      const r = i.target;
      r.__vue__ ? (v(e, r.__vue__), a()) : r.__vue_app__ && (T(e, r.__vue_app__), a());
    }
  }).observe(document.documentElement, {
    attributes: !0,
    subtree: !0,
    childList: !0
  });
};
se();
