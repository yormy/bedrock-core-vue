<template>
  <span class="hide-menu">
    <div class="d-flex">
      <span v-if="icon" class="preview-thumbnail mr-5">
        <i :class="icon" class="m-auto text-primary"></i>
      </span>
      <span class="preview-item-content">
        <h6 class="preview-subject font-weight-normal text-dark mb-1">{{ title }}</h6>
        <p v-if="description" class="font-weight-light small-text mb-0">{{ description }}</p>
      </span>
    </div>
  </span>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },
  },
};
</script>
