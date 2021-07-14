<template>
  <span>
    <ValidationProvider v-slot="{ errors }" :name="fieldname" :rules="validationRules">

      <v-select
        v-bind="$attrs"
        v-on="$listeners"
        :append-outer-icon="description != null ? 'fal fa-info-circle fa-xs': ''"
        :color="isValid"
        :error-messages="apiError ? apiError : errors"
        :label="getLabel()"
        :value="value"
        attach
        chips
        multiple
        @keydown="clearApiError()"
        @click:append-outer="() => (infoDialog = !infoDialog)"
      >
      </v-select>

      <info-modal
        :content="description"
        :show="infoDialog"
        :title="label"
      >
      </info-modal>


    </ValidationProvider>
  </span>
</template>

<script>
import InfoModal from '../Modals/InfoModal.vue';

export default {
  components: {
    InfoModal,
  },

  inheritAttrs: false,

  props: {
    value: {
      required: false,
    },

    fieldname: {
      type: String,
      required: false,
    },

    label: {
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

    description: {
      type: String,
      required: false,
      default: null,
    },

    required: {
      type: Boolean,
      required: false,
      default: false,
    }

  },

  data() {
    return {
      infoDialog: false,
    };
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

      // remove .x out of array of validations
      let copy = this.apiErrors.errors;
      for (const [key, value] of Object.entries(this.apiErrors.errors)) {
        const dotted = key.split('.');
        copy[dotted[0]] = value;
      }

      return copy[this.fieldname];
    },
  },

  methods: {
    getLabel() {
      let append = '';
      if (this.required) {
        append = ' *'
      }

      return this.label + append;
    },

    clearApiError() {
      if (this.apiErrors && this.apiErrors.errors) {
        // eslint-disable-next-line vue/no-mutating-props
        this.apiErrors.errors[this.fieldname] = '';
      }
    },
  },
};
</script>
