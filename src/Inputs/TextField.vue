<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="fieldname" :rules="validationRules">

      <v-text-field
        v-bind="$attrs"
        v-on="$listeners"
        :color="isValid"
        :error-messages="apiError ? apiError : errors"
        :value="value"
        @keydown="clearApiError()"
      >
      </v-text-field>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
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

    validationRules: {
      type: String,
      required: false,
    },
  },

  data() {
    return {};
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

  methods: {
    clearApiError() {
      if (this.apiErrors && this.apiErrors.errors) {
        // eslint-disable-next-line vue/no-mutating-props
        this.apiErrors.errors[this.fieldname] = '';
      }
    },
  },
};
</script>
