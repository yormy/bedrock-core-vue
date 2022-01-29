function getCookieContextKey() {
  return 'translationcaptain_context';
}

const CONTEXT_ENABLED = 'translationcaptain';

export default function translationService() {
  Vue.prototype.$tOriginal = Vue.prototype.$t;
  var translateWithCheck = function (...args) {

    if (getCookieValue(CONTEXT_ENABLED)) {
      addKeyToScreenshotQueue(args[0]); // if cookie set add to screenshot queue
    }

    const translated = this.$tOriginal(...args);
    if (translated === args[0]) {
      const translatedTagged = "#" + translated;

      logMissingKey(translated);

      return translatedTagged;
    }

    return translated;
  }
  Vue.prototype.$t = translateWithCheck;
}

function logMissingKey(translated) {
  console.error("Key not translated: " + translated);
}

function addKeyToScreenshotQueue() {
  const todos = JSON.parse(decodeCookieValue(getTodos()));
  todos.push('new.key');
  setCookie(getCookieKey(), JSON.stringify(todos), 1);
}

function getTodos() {
  return getCookieValue(getCookieContextKey());
}

function getCookieValue(cookieName) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${cookieName}=`);
  if (parts.length == 2) {
    return parts.pop().split(';').shift();
  }
}

function decodeCookieValue(cookieVal) {
  return decodeURI(cookieVal.replace(/%3A/g, ":").replace(/%2C/g, ",").replace(/\+/g, "%20"));
}

function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
