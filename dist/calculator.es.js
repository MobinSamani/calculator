import { openBlock as i, createElementBlock as c, createElementVNode as s, toDisplayString as o, Fragment as d, renderList as p, createCommentVNode as v, resolveComponent as f, createVNode as _ } from "vue";
const h = (e, t) => {
  const r = e.__vccOpts || e;
  for (const [n, a] of t)
    r[n] = a;
  return r;
}, m = {
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
      var t;
      if (!((t = this.value2) != null && t.length))
        return this.replaceOperation(e);
      this.calculated ? (this.value1 = `${this.value2} ${e} `, this.calculated = !1) : (this.calculate(), this.value1 += `${this.value2} ${e} `), this.value2 = "0", this.lastOperation = e;
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
      !((e = this.value2) != null && e.length) || this.calculated || (this.calculate(), this.value1 += this.value2, this.value2 = String(this.result), this.calculated = !0);
    },
    backspace() {
      var e;
      !((e = this.value2) != null && e.length) || this.calculated || (this.value2 = this.value2.slice(0, -1));
    },
    clear() {
      this.value1 = "", this.value2 = "0", this.result = null, this.lastOperation = null, this.calculated = !1;
    }
  }
}, x = { class: "flex flex-col gap-y-8" }, w = { class: "h-20 rounded-3xl shadow-inner bg-gray-100 py-3.5 px-6" }, g = { class: "flex flex-col items-end justify-between w-full h-full overflow-hidden" }, b = { class: "text-sm text-gray-500 whitespace-nowrap" }, k = { class: "text-3xl whitespace-nowrap" }, y = {
  key: 0,
  class: "grid grid-cols-4 gap-6 relative"
}, $ = ["onClick"];
function C(e, t, r, n, a, u) {
  return i(), c("div", x, [
    s("div", w, [
      s("div", g, [
        s("div", b, o(a.value1), 1),
        s("div", k, o(a.value2), 1)
      ])
    ]),
    a.buttons && a.buttons.length ? (i(), c("div", y, [
      (i(!0), c(d, null, p(a.buttons, (l) => (i(), c("button", {
        key: l,
        class: "rounded-full shadow-md aspect-square flex items-center justify-center text-3xl hover:bg-gray-900 hover:text-white duration-150",
        onClick: (V) => u.handleClick(l)
      }, o(l), 9, $))), 128))
    ])) : v("", !0)
  ]);
}
const F = /* @__PURE__ */ h(m, [["render", C]]), O = {
  name: "App",
  components: {
    Calculator: F
  }
}, E = { class: "min-h-screen bg-gray-100 flex items-center justify-center p-8" }, B = { class: "flex flex-col gap-y-8 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 2xl:w-1/4" }, S = /* @__PURE__ */ s("div", { class: "flex items-center justify-center gap-2 flex-wrap text-center" }, [
  /* @__PURE__ */ s("div", { class: "text-gray-600" }, "A Vue Calculator Application by"),
  /* @__PURE__ */ s("a", {
    class: "font-bold",
    href: "https://MobinSamani.com",
    target: "_blank"
  }, "MobinSamani.com")
], -1), j = { class: "bg-white shadow rounded-3xl p-8" };
function A(e, t, r, n, a, u) {
  const l = f("calculator");
  return i(), c("div", E, [
    s("div", B, [
      S,
      s("div", j, [
        _(l)
      ])
    ])
  ]);
}
const K = /* @__PURE__ */ h(O, [["render", A]]);
export {
  K as default
};
