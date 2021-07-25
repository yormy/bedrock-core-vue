<template>
  <span v-if="messages">
    <success-message :message="messages.success"></success-message>
    <error-message :message="messages.error"></error-message>
    <warning-message :message="messages.warning"></warning-message>
    <info-message :message="messages.info"></info-message>
  </span>
</template>

<script>
export default {
  props: {
    messages: {},
  },
}
</script>
