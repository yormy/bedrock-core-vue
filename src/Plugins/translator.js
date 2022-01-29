export default function activateMissingTranslations() {
  Vue.prototype.$tOriginal = Vue.prototype.$t;
  var translateWithCheck = function (...args) {
    const translated = this.$tOriginal(...args);
    if (translated === args[0]) {
      const translatedTagged = "#" + translated;
      return translatedTagged;
    }

    return translated;
  }
  Vue.prototype.$t = translateWithCheck;
}
