<template>
  <div>
    <v-chip
      v-bind="$attrs"
      v-on="$listeners"
      :items="items"
    >
    </v-chip>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      required: false,
    },

    items: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {};
  },

};
</script>
