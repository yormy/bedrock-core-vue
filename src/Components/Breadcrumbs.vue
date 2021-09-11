<template>
  <span>
    <span v-for="breadcrumb in breadcrumbs" :key="breadcrumb.title">
      <Link :href="breadcrumb.url">
        <button class="text-link">
          {{ breadcrumb.title }}
        </button>
      </Link>
      /
    </span>
  </span>
</template>

<script>

export default {
  props: {
    breadcrumbs: {
      type: Array,
      required: false,
    },
  },

  data() {
    return {};
  },

  methods: {},
};
</script>
