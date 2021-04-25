<template>
  <v-overlay :absolute="true" :opacity="0.2" :value="show">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
    },
  },
};
</script>
