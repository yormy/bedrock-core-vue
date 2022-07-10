<template>
  <span :class="icon"></span>
</template>

<script>

export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
