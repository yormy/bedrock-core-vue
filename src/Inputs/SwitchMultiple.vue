<template>
  <span>
    <div class="d-flex justify-content-between">
      <div>{{ label }}</div>
          <info-icon
            :content-html="description"
            :show="infoDialog"
            :title="label"
          >
        </info-icon>
    </div>
    <small>{{ hint }}</small>
    <div class="d-flex justify-content-between">
      <span v-for="(option,key) in options" :key="key">
        <v-switch
          v-model="switchValue"
          v-bind="$attrs"
          v-on="$listeners"
          :label="option"
          :value="key"
        ></v-switch>
      </span>
    </div>
  </span>
</template>

<script>
import InfoIcon from '../Buttons/InfoIcon.vue';

export default {
  components: {
    InfoIcon,
  },

  inheritAttrs: true,

  props: {
    value: {
      required: false,
    },

    options: {
      type: Object,
      required: true,
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

    description: {
      type: String,
      required: false,
      default: null,
    },

  },

  data() {
    return {
      infoDialog: false,
      switchValue: this.value,
    };
  },

  watch: {
    switchValue() {
      this.$emit('changed', this.switchValue);
    },
  },

  methods: {
    getLabel() {
      return this.label;
    },
  },
};
</script>
