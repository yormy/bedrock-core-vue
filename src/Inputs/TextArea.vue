<!-- eslint-disable vue/no-mutating-props-->
<template>
  <div class="w-100">
    <ValidationProvider v-slot="{ errors }" :name="fieldname" :rules="validationRules">
      <v-textarea
        v-bind="$attrs"
        v-on="$listeners"
        :color="isValid"
        :error-messages="apiError ? apiError : errors"
        :rows="rows"
        :value="value"
        @keydown="clearApiError()"
      >
      </v-textarea>
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

    rows: {
      type: Number,
      default: 3,
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
