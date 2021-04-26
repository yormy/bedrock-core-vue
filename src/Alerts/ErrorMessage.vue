<template>
  <div v-if="message">
    <div class="alert alert-danger" style="overflow-wrap: break-word">
      <strong>
        <div v-html="message"></div>
      </strong>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: '',
  },
}
</script>
