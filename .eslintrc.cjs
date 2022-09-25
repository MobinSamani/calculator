module.exports = {
  env: {
    node: true
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-essential", "prettier"],
  rules: {
    "vue/multi-word-component-names": "off"
  }
};
