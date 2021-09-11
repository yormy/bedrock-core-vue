<template>
  <span>
    <span v-if="isCopied" class="fal fa-clipboard"></span>

    <span v-else @click="copyClipboard()">
      <slot></slot>
    </span>

  </span>
</template>

<script>
export default {

  props: {
    value: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isCopied: false,
      valueOnClipboard: '',
      timeoutInMs: 1000,
    }
  },

  methods: {
    copyClipboard() {
      this.isCopied = true

      const self = this;
      navigator.clipboard.writeText(this.value).then(function () {
        self.valueOnClipboard = self.value;
      }, function (err) {
        console.error('Could not copy text: ', err);
      });

      window.setTimeout(() => {
        this.isCopied = false
      }, this.timeoutInMs);
    },
  }
}
</script>
