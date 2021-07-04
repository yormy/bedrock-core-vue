<template>
  <div>
    <form @submit.prevent>
      <text-field
        :api-errors="apiErrors"
        :append-icon="expose ? 'fal fa-eye' : 'fal fa-eye-slash'"
        :autocomplete="autocomplete ? 'password' : ''"
        :fieldname="fieldname"
        :hint="hint"
        :label="label"
        v-bind="$attrs"
        :type="expose ? 'text' : 'password'"
        :validation-rules="validationRules"
        :value="value"
        @click:append="() => (expose = !expose)"
        v-on="$listeners"
        :required="required"
        counter
      >
      </text-field>
    </form>
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

    label: {
      type: String,
      required: false,
    },

    hint: {
      type: String,
      required: false,
    },

    validationRules: {
      type: String,
      required: false,
      default: "required|strong-password"
    },

    autocomplete: {
      type: Boolean,
      default: true,
    },

    apiErrors: {
      type: Object,
    },

    required: {
      type: Boolean,
      required: false,
      default: false,
    }

  },

  data() {
    return {
      expose: false,
    };
  },

};
</script>
