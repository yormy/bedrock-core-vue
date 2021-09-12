<template>
  <span>
    <span v-for="(breadcrumb,key) in breadcrumbs" :key="breadcrumb.title">

      <span v-if="key+1 != breadcrumbs.length">
        <Link :href="breadcrumb.url">
          <button class="text-link">
            {{ breadcrumb.title }}
          </button>
        </Link>
        /
      </span>
      <span v-else>
        {{ breadcrumb.title }}
      </span>

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
