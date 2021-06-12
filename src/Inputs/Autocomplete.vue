<template>
  <div>
    <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      :items="items"
    >
    </v-autocomplete>
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
