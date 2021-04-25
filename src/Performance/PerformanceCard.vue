<template>
  <div :style="clickable ? 'cursor: pointer;' : ''" class="card" @click="clicked">
    <div :class="color" class="box p-2 rounded text-center">
      <h1 class="font-weight-light text-white">{{ title }}</h1>
      <h6 class="text-white">{{ subtitle }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
    },

    subtitle: {
      required: false,
    },

    clickable: Boolean,

    color: {
      required: false,
      default: 'bg-info', // bg-warning, bg-success bg-primary
    },
  },

  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
};
</script>
