<template>
  <div>
    <form @submit.prevent>
      <text-field
        v-bind="$attrs"
        v-on="$listeners"
        :api-errors="apiErrors"
        :append-icon="expose ? 'fal fa-eye' : 'fal fa-eye-slash'"
        :autocomplete="autocomplete ? 'password' : ''"
        :fieldname="fieldname"
        :hint="hint"
        :label="label"
        :type="expose ? 'text' : 'password'"
        :validation-rules="validationRules"
        :value="value"
        counter
        @click:append="() => (expose = !expose)"
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

  },

  data() {
    return {
      expose: false,
    };
  },

};
</script>
