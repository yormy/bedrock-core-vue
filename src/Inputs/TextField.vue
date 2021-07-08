<template>
  <span>
    <ValidationProvider v-slot="{ errors }" :name="fieldname" :rules="validationRules">

      <v-text-field
        v-bind="$attrs"
        v-on="$listeners"
        :label="getLabel()"
        :color="isValid"
        :error-messages="apiError ? apiError : errors"
        :value="value"
        @keydown="clearApiError()"
        :append-outer-icon="description != null ? 'fal fa-info-circle fa-xs': ''"
        @click:append-outer="() => (infoDialog = !infoDialog)"
      >
      </v-text-field>

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
      return this.apiErrors.errors[this.fieldname];
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
