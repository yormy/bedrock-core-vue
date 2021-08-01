<template>
  <div>
    <v-autocomplete
      v-bind="$attrs"
      v-on="$listeners"
      :items="items"
      :value="value"
      :color="isValid"
      :error-messages="apiError ? apiError : ''"
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

    fieldname: {
      type: String,
      required: false,
    },

    apiErrors: {
      type: Object,
      required: false,
    },

  },

  computed: {
    isValid() {
      if (
        (!this.apiErrors || !this.apiErrors.errors || !this.apiErrors.errors[this.fieldname]) &&
        this.value
      ) {
        return 'success';
      }

      return '';
    },

    apiError() {
      if (!this.apiErrors || !this.apiErrors.errors) {
        return '';
      }
      return this.apiErrors.errors[this.fieldname];
    },
  },

  data() {
    return {};
  },

};
</script>
