<template>
  <div v-if="permission" class="rbac allowed">
    <slot></slot>
  </div>
  <div v-else>
    <div v-if="!hideOnDisabled" class="icon login rbac denied" @click.prevent="clickProtectedRoute">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      disabledClass: '',
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    };
  },

  props: {
    url: {
      type: String,
      required: false,
      default: '',
    },

    permission: {
      type: Boolean,
      required: false,
    },

    hideOnDisabled: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    clickProtectedRoute() {
      // console.log('protected route');
      // can redirect here to upgrade screen
    },
  },
};
</script>

<style scoped>
.icon span::before {
  display: inline-block;
  font-style: normal;
  font-variant: normal;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
}

.login span::before {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  content: '\f05e';
  padding-right: 10px;
  font-size: 0.7em;
}
</style>
