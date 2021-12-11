<template>
  <span>
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <div>
          {{ label }}
        </div>
        <div class="self-align-start pl-1">
          <info-icon
            :content-html="description"
            :show="infoDialog"
            :title="label"
          >
          </info-icon>
        </div>
      </div>
    </div>
    <small>{{ hint }}</small>

    <div class="d-flex justify-content-between">
      <span v-for="(option,key) in options" :key="key">
        <div class="d-flex">
          <v-switch
            v-model="switchValue"
            :hint="option.hint"
            :label="option.label"
            :persistent-hint="true"
            :value="option.key"
            class="mt-0 pr-1"
            v-bind="$attrs"
            v-on="$listeners"
          ></v-switch>
          <info-icon
            :content-html="option.description"
            :show="infoDialog"
            :title="option.label"
          >
          </info-icon>
        </div>
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
      type: Array,
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
