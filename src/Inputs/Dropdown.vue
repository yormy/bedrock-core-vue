<template>
  <div>
    <ValidationProvider v-slot="{ errors }" :name="fieldname" :rules="validationRules">
      <v-select
        :color="isValid"
        :error-messages="apiError ? apiError : errors"
        :items="items"
        :value="value"
        v-bind="$attrs"
        v-on="$listeners"
      >
      </v-select>
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

    items: {
      type: Array,
      required: false,
    },

    validationRules: {
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
