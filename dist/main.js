// ==UserScript==
// @name            Vue生产环境（production） Devtools 调试
// @namespace       https://github.com/xcr1234/vue-devtools-production
// @version         2.1.1
// @description     使用本脚本支持直接调试生产环境的Vue项目 完美支持Vue2、Vue3！
// @homepage        https://github.com/xcr1234/vue-devtools-production
// @icon            data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAbpJREFUOE+lkz9IG2EYxp/3Eo1GHWzFDqFKLQ6CIGpLS9GSQzGniw5OLTg6CCLO5kT86FpolnR3kFYXJ+9o2u9EcPEPEdqp4qKlbbaihpxw98n3JUqMqYp+03s87/P7/jzvEe656J5+KIC+ymwQBmR99OGnYgoh1rethdeyfjY4tg6gR9Z1U615HfTFMeIDCtC38u6RH/L/yPo0/S/lrmX6VRfRKAEBIcQn+Vn5on4j9LLhlQL43mNnaO7w4grR1XlGRHEpHn/c3xWu1wHgBwANQBtVaPu1E09bCuAEj8Wn1B7Fb6Bb7ARA2Pud28l+Pugq1sIjke+B5nA7gBw3zOpz7RIgarNREliSYnb5IOX9yqmraA2hzZq3Tc/Vjj4mvg2ZybIA9aAW4wCivutnjpN7NUSk1Y4/yVJ18CGANDfMzuKTXYlRt+e7IWhLNrk8w4WPYFVfY28+GejOoOlcCyjEmgBhsmRGFrlhvimdm7KDFLPmHpwikAEQyBvI01yKfB2e+XsrgDqFzaYh8L5gmOWGyUrNV2IsbdAtlgYQ5IYp4yu7rv0XojYbkQAnZi7fCfA/040p3MZ43nMG7TKHEfrJ20kAAAAASUVORK5CYII=
// @include         *
// @run-at          document-end
// @grant           none
// ==/UserScript==
const T = (s, e) => {
  let o = Object.getPrototypeOf(e).constructor;
  for (; o.super; )
    o = o.super;
  if (!o.config.devtools && (o.config.devtools = !0, s.emit("init", o), console.log(`vue devtools for [${o.version}] already open !!!`), e.$store)) {
    const n = e.$store;
    n._devtoolHook = s, s.emit("vuex:init", n), s.on("vuex:travel-to-state", (r) => {
      n.replaceState(r);
    }), n.subscribe((r, a) => {
      s.emit("vuex:mutation", r, a);
    });
  }
};
function V() {
  return E().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function E() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
const k = typeof Proxy == "function", A = "devtools-plugin:setup", D = "plugin:settings:set";
let m, w;
function j() {
  var s;
  return m !== void 0 || (typeof window < "u" && window.performance ? (m = !0, w = window.performance) : typeof globalThis < "u" && (!((s = globalThis.perf_hooks) === null || s === void 0) && s.performance) ? (m = !0, w = globalThis.perf_hooks.performance) : m = !1), m;
}
function N() {
  return j() ? w.now() : Date.now();
}
class $ {
  constructor(e, o) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = e, this.hook = o;
    const n = {};
    if (e.settings)
      for (const i in e.settings) {
        const c = e.settings[i];
        n[i] = c.defaultValue;
      }
    const r = `__vue-devtools-plugin-settings__${e.id}`;
    let a = Object.assign({}, n);
    try {
      const i = localStorage.getItem(r), c = JSON.parse(i);
      Object.assign(a, c);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return a;
      },
      setSettings(i) {
        try {
          localStorage.setItem(r, JSON.stringify(i));
        } catch {
        }
        a = i;
      },
      now() {
        return N();
      }
    }, o && o.on(D, (i, c) => {
      i === this.plugin.id && this.fallbacks.setSettings(c);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, c) => this.target ? this.target.on[c] : (..._) => {
        this.onQueue.push({
          method: c,
          args: _
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, c) => this.target ? this.target[c] : c === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(c) ? (..._) => (this.targetQueue.push({
        method: c,
        args: _,
        resolve: () => {
        }
      }), this.fallbacks[c](..._)) : (..._) => new Promise((b) => {
        this.targetQueue.push({
          method: c,
          args: _,
          resolve: b
        });
      })
    });
  }
  async setRealTarget(e) {
    this.target = e;
    for (const o of this.onQueue)
      this.target.on[o.method](...o.args);
    for (const o of this.targetQueue)
      o.resolve(await this.target[o.method](...o.args));
  }
}
function U(s, e) {
  const o = s, n = E(), r = V(), a = k && o.enableEarlyProxy;
  if (r && (n.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !a))
    r.emit(A, s, e);
  else {
    const i = a ? new $(o, r) : null;
    (n.__VUE_DEVTOOLS_PLUGINS__ = n.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: o,
      setupFn: e,
      proxy: i
    }), i && e(i.proxiedTarget);
  }
}
const h = "pinia-production", p = "_root", S = /* @__PURE__ */ new WeakMap(), L = (s, e) => {
  try {
    return s[e];
  } catch (o) {
    return String(o);
  }
}, G = (s) => {
  const e = new Set(s._getters ?? []);
  for (const [o, n] of Object.entries(Object.getOwnPropertyDescriptors(s))) {
    const r = n.value;
    r && typeof r == "object" && r.__v_isRef === !0 && "effect" in r && e.add(o);
  }
  return Array.from(e, (o) => ({ key: o, editable: !1, value: L(s, o) }));
}, Q = (s, e) => {
  const o = S.get(e);
  if (o) return o;
  let n = !1;
  const r = /* @__PURE__ */ new Map(), a = () => {
    n = !0, r.forEach((i) => i()), r.clear(), S.delete(e);
  };
  return S.set(e, a), U({
    id: "vue-devtools-production.pinia",
    label: "Pinia",
    app: s,
    homepage: "https://github.com/xcr1234/vue-devtools-production"
  }, (i) => {
    var P;
    if (n) return;
    const c = () => {
      n || (i.sendInspectorTree(h), i.sendInspectorState(h));
    }, _ = (t) => {
      n || r.has(t) || !t.$subscribe || r.set(t, t.$subscribe(c, { detached: !0, flush: "sync" }));
    }, b = () => {
      var l;
      const t = new Set((l = e._s) == null ? void 0 : l.values());
      for (const [u, f] of r)
        t.has(u) || (f(), r.delete(u));
      t.forEach(_);
    }, O = () => {
      var t;
      return Array.from(/* @__PURE__ */ new Set([
        ...Object.keys(e.state.value),
        ...((t = e._s) == null ? void 0 : t.keys()) ?? []
      ]));
    }, v = (t) => {
      var l, u;
      return ((u = (l = e._s) == null ? void 0 : l.get(t)) == null ? void 0 : u.$state) ?? e.state.value[t];
    };
    i.addInspector({
      id: h,
      label: "Pinia",
      icon: "storage",
      treeFilterPlaceholder: "Search stores",
      nodeActions: [{
        icon: "restore",
        tooltip: "Reset this store",
        action: (t) => {
          var l, u, f;
          n || t === p || ((f = (u = (l = e._s) == null ? void 0 : l.get(t)) == null ? void 0 : u.$reset) == null || f.call(u), c());
        }
      }]
    }), i.on.getInspectorTree((t) => {
      if (n || t.app !== s || t.inspectorId !== h) return;
      b();
      const l = [
        { id: p, label: "🍍 Pinia (root)" },
        ...O().map((u) => ({ id: u, label: u }))
      ];
      t.rootNodes = l.filter((u) => u.label.toLowerCase().includes(t.filter.toLowerCase()));
    }), i.on.getInspectorState((t) => {
      var d, I;
      if (n || t.app !== s || t.inspectorId !== h) return;
      if (t.nodeId === p) {
        t.state = {
          state: O().map((g) => ({ key: g, editable: !0, value: v(g) }))
        };
        return;
      }
      const l = v(t.nodeId);
      if (!l) return;
      const u = {
        state: Object.keys(l).map((g) => ({ key: g, editable: !0, value: l[g] }))
      }, f = (d = e._s) == null ? void 0 : d.get(t.nodeId);
      if (f) {
        const g = G(f);
        g.length && (u.getters = g), (I = f._customProperties) != null && I.size && (u.customProperties = Array.from(f._customProperties, (y) => ({
          key: y,
          editable: !0,
          value: L(f, y)
        })));
      }
      t.state = u;
    }), i.on.editInspectorState((t) => {
      var u, f;
      if (n || t.app !== s || t.inspectorId !== h) return;
      let l;
      if (t.nodeId === p && t.type === "state")
        l = e.state.value;
      else if (t.type === "state")
        l = v(t.nodeId);
      else if (t.type === "customProperties") {
        const d = (u = e._s) == null ? void 0 : u.get(t.nodeId);
        (f = d == null ? void 0 : d._customProperties) != null && f.has(t.path[0]) && (l = d);
      }
      l && (t.set(l, t.path, t.state.value), c());
    }), b(), (P = e.use) == null || P.call(e, ({ store: t }) => {
      n || (_(t), c());
    });
  }), a;
}, C = (s) => {
  s.includes("-alpha.") && (s = s.split("-alpha.")[0]);
  const [e, o] = s.split(".").map(Number);
  return e > 3 || e === 3 && o >= 3;
}, x = (s, e) => {
  if (e.config.devtools)
    return;
  e.config.devtools = !0, C(e.version) ? s.emit("app:init", e, e.version, {
    Fragment: Symbol.for("v-fgt"),
    Text: Symbol.for("v-txt"),
    Comment: Symbol.for("v-cmt"),
    Static: Symbol.for("v-stc")
  }) : s.emit("app:init", e, e.version, {
    Fragment: Symbol.for("Fragment"),
    Text: Symbol.for("Text"),
    Comment: Symbol.for("Comment"),
    Static: Symbol.for("Static")
  }), console.log(`vue devtools for [${e.version}] already open !!!`);
  let o = () => {
  };
  const n = e.unmount.bind(e);
  e.unmount = () => {
    o(), s.emit("app:unmount", e), n();
  }, e.config.globalProperties.$store && console.warn("vuex for vue3 not support. please use pinia");
  const r = e.config.globalProperties.$pinia;
  r && (o = Q(e, r));
}, H = () => {
  if (self != top)
    return;
  const s = window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
  if (!s) {
    console.warn("No Vue devtools found , Please install it first: "), console.warn("see https://github.com/vuejs/vue-devtools");
    return;
  }
  const e = window.app;
  if (!e)
    return;
  if (e.__vue__) {
    T(s, e.__vue__);
    return;
  }
  if (e.__vue_app__) {
    x(s, e.__vue_app__);
    return;
  }
  new MutationObserver((n, r) => {
    const a = r.disconnect.bind(r);
    for (const i of n) {
      const c = i.target;
      c.__vue__ ? (T(s, c.__vue__), a()) : c.__vue_app__ && (x(s, c.__vue_app__), a());
    }
  }).observe(document.documentElement, {
    attributes: !0,
    subtree: !0,
    childList: !0
  });
};
H();
