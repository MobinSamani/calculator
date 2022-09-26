<template>
  <div class="flex flex-col gap-y-8">
    <div class="h-20 rounded-3xl shadow-inner bg-gray-100 py-3.5 px-6">
      <div class="flex flex-col items-end justify-between w-full h-full overflow-hidden">
        <div class="text-sm text-gray-500 whitespace-nowrap">
          {{ value1 }}
        </div>

        <div class="text-3xl whitespace-nowrap">
          {{ value2 }}
        </div>
      </div>
    </div>

    <div v-if="buttons && buttons.length" class="grid grid-cols-4 gap-6 relative">
      <button
        v-for="button in buttons"
        :key="button"
        class="rounded-full shadow-md aspect-square flex items-center justify-center text-3xl hover:bg-gray-900 hover:text-white duration-150"
        @click="handleClick(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calculator",
  data() {
    return {
      value1: "",
      value2: "0",
      result: null,
      buttons: ["C", "BS", "%", "/", "7", "8", "9", "x", "4", "5", "6", "-", "1", "2", "3", "+", "0", "00", ".", "="],
      operations: ["%", "/", "x", "-", "+"],
      lastOperation: null,
      calculated: false
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
      let key = e.key;
      if (!key) return;

      if (key === "*") key = "x";
      if (key === "Enter") key = "=";

      if (!this.buttons.includes(key) && key !== "Backspace") return;
      this.handleClick(key);
    },
    handleClick(key) {
      switch (key) {
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
          this.addElement(key);
          break;
        case "x":
        case "+":
        case "-":
        case "/":
        case "%":
          this.addOperation(key);
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
    addElement(key) {
      if (this.calculated) this.clear();
      if (this.value2 === "0") this.value2 = key;
      else this.value2 += key;
    },
    addOperation(key) {
      if (!this.value2?.length) return this.replaceOperation(key);

      if (this.calculated) {
        this.value1 = `${this.value2} ${key} `;
        this.calculated = false;
      } else {
        this.calculate();
        this.value1 += `${this.value2} ${key} `;
      }
      this.value2 = "";
      this.lastOperation = key;
    },
    replaceOperation(key) {
      if (!this.value1?.length) return;
      this.value1 = this.value1.trim().slice(0, -1);
      this.value1 += `${key} `;
      this.lastOperation = key;
    },
    calculate() {
      if (this.result === null || this.result == undefined) return (this.result = this.value2);

      switch (this.lastOperation) {
        case "x":
          return (this.result = parseFloat(this.result) * parseFloat(this.value2));
        case "+":
          return (this.result = parseFloat(this.result) + parseFloat(this.value2));
        case "-":
          return (this.result = parseFloat(this.result) - parseFloat(this.value2));
        case "/":
          return (this.result = parseFloat(this.result) / parseFloat(this.value2));
        case "%":
          return (this.result = parseFloat(this.result) % parseFloat(this.value2));
      }
    },
    equal() {
      if (!this.value2?.length || this.calculated) return;

      this.calculate();

      this.value1 += this.value2;
      this.value2 = String(this.result);
      this.calculated = true;
    },
    backspace() {
      if (!this.value2?.length || this.calculated) return;
      this.value2 = this.value2.slice(0, -1);
    },
    clear() {
      this.value1 = "";
      this.value2 = "";
      this.result = null;
      this.lastOperation = null;
      this.calculated = false;
    }
  }
};
</script>