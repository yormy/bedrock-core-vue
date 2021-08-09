<template>
  <div v-if="impersonated">
    <br><br>
  </div>
</template>

<script>
export default {
  data() {
    return {
      impersonated: this.$page.props.shared.impersonated,
    };
  },
};
</script>

