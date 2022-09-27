import { openBlock as i, createElementBlock as r, createElementVNode as l, toDisplayString as n, Fragment as u, createTextVNode as d, renderList as v, createCommentVNode as f, resolveComponent as _, createVNode as x } from "vue";
const p = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [o, a] of t)
    s[o] = a;
  return s;
}, g = {
  name: "Calculator",
  data() {
    return {
      value1: "",
      value2: "0",
      result: null,
      buttons: ["C", "BS", "%", "/", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", "00", ".", "="],
      operations: ["%", "/", "x", "-", "+"],
      lastOperation: null,
      calculated: !1
    };
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeydown);
  },
  unmounted() {
    window.removeEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(e) {
      let t = e.key;
      !t || (t === "*" && (t = "x"), t === "Enter" && (t = "="), !(!this.buttons.includes(t) && t !== "Backspace") && this.handleClick(t));
    },
    handleClick(e) {
      switch (e) {
        case "00":
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case ".":
          this.addElement(e);
          break;
        case "x":
        case "+":
        case "-":
        case "/":
        case "%":
          this.addOperation(e);
          break;
        case "=":
          this.equal();
          break;
        case "Backspace":
        case "BS":
          this.backspace();
          break;
        case "C":
          this.clear();
          break;
      }
    },
    addElement(e) {
      this.calculated && this.clear(), this.value2 === "0" ? this.value2 = e : this.value2 += e;
    },
    addOperation(e) {
      var s;
      const t = this.getLastChar();
      if ((!((s = this.value2) != null && s.length) || this.value2 === "0") && this.operations.includes(t))
        return this.replaceOperation(e);
      this.calculated ? (this.value1 = `${parseFloat(this.value2).toLocaleString()} ${e} `, this.calculated = !1) : (this.calculate(), this.value1 += `${parseFloat(this.value2).toLocaleString()} ${e} `), this.value2 = "0", this.lastOperation = e;
    },
    getLastChar() {
      var t, s;
      const e = (s = (t = this.value1) == null ? void 0 : t.trim()) == null ? void 0 : s.split("");
      return e == null ? void 0 : e[(e == null ? void 0 : e.length) - 1];
    },
    replaceOperation(e) {
      var t;
      !((t = this.value1) != null && t.length) || (this.value1 = this.value1.trim().slice(0, -1), this.value1 += `${e} `, this.lastOperation = e);
    },
    calculate() {
      if (this.result === null || this.result == null)
        return this.result = this.value2;
      switch (this.lastOperation) {
        case "x":
          return this.result = parseFloat(this.result) * parseFloat(this.value2);
        case "+":
          return this.result = parseFloat(this.result) + parseFloat(this.value2);
        case "-":
          return this.result = parseFloat(this.result) - parseFloat(this.value2);
        case "/":
          return this.result = parseFloat(this.result) / parseFloat(this.value2);
        case "%":
          return this.result = parseFloat(this.result) % parseFloat(this.value2);
      }
    },
    equal() {
      var e;
      !((e = this.value2) != null && e.length) || this.calculated || (this.calculate(), this.value1 += parseFloat(this.value2).toLocaleString(), this.value2 = String(this.result), this.calculated = !0);
    },
    backspace() {
      var e, t;
      !((e = this.value2) != null && e.length) || this.calculated || (this.value2 = this.value2.slice(0, -1), (t = this.value2) != null && t.length || (this.value2 = "0"));
    },
    clear() {
      this.value1 = "", this.value2 = "0", this.result = null, this.lastOperation = null, this.calculated = !1;
    }
  }
}, m = { class: "flex flex-col gap-y-8" }, w = { class: "h-20 rounded-3xl shadow-inner bg-gray-100 py-3.5 px-6" }, b = { class: "flex flex-col items-end justify-between w-full h-full overflow-hidden" }, k = { class: "text-sm text-gray-500 whitespace-nowrap" }, y = { class: "text-3xl whitespace-nowrap" }, C = {
  key: 0,
  class: "grid grid-cols-4 gap-6 relative"
}, F = ["onClick"];
function $(e, t, s, o, a, h) {
  return i(), r("div", m, [
    l("div", w, [
      l("div", b, [
        l("div", k, n(a.value1), 1),
        l("div", y, [
          isNaN(a.value2) ? (i(), r(u, { key: 0 }, [
            d(n(a.value2), 1)
          ], 64)) : (i(), r(u, { key: 1 }, [
            d(n(parseFloat(a.value2).toLocaleString()), 1)
          ], 64))
        ])
      ])
    ]),
    a.buttons && a.buttons.length ? (i(), r("div", C, [
      (i(!0), r(u, null, v(a.buttons, (c) => (i(), r("button", {
        key: c,
        class: "rounded-full shadow-md aspect-square flex items-center justify-center text-xl md:text-2xl lg:text-3xl hover:bg-gray-900 hover:text-white focus:bg-inherit focus:text-inherit active:bg-inherit active:text-inherit duration-150",
        onClick: (j) => h.handleClick(c)
      }, n(c), 9, F))), 128))
    ])) : f("", !0)
  ]);
}
const O = /* @__PURE__ */ p(g, [["render", $]]), S = {
  name: "App",
  components: {
    Calculator: O
  }
}, L = { class: "min-h-screen bg-gray-100 flex items-center justify-center p-8" }, E = { class: "flex flex-col gap-y-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 2xl:w-1/4" }, B = /* @__PURE__ */ l("div", { class: "flex items-center justify-center gap-2 flex-wrap text-center" }, [
  /* @__PURE__ */ l("div", { class: "text-gray-600" }, "A Vue Calculator Application by"),
  /* @__PURE__ */ l("a", {
    class: "font-bold",
    href: "https://MobinSamani.com",
    target: "_blank"
  }, "MobinSamani.com")
], -1), N = { class: "bg-white shadow rounded-3xl p-8" };
function V(e, t, s, o, a, h) {
  const c = _("calculator");
  return i(), r("div", L, [
    l("div", E, [
      B,
      l("div", N, [
        x(c)
      ])
    ])
  ]);
}
const q = /* @__PURE__ */ p(S, [["render", V]]);
export {
  q as default
};
