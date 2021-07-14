<template>
  <span>
    <div class="d-flex justify-content-between">
      <div>
          <v-switch
            v-model="switchValue"
            v-bind="$attrs"
            v-on="$listeners"
            :label="getLabel()"
            :persistent-hint="true"
            :false-value="false"
            :true-value="true"
          ></v-switch>
      </div>
      <info-icon
        :content="description"
        :show="infoDialog"
        :title="label"
      >
      </info-icon>
    </div>

    <!--    <v-switch-->
    <!--      :append-icon="description != null ? 'fal fa-info-circle fa-xs': ''"-->
    <!--      :label="getLabel()"-->
    <!--      @click:append="() => (infoDialog = !infoDialog)"-->
    <!--      :persistent-hint="true"-->
    <!--      :value="true"-->
    <!--      v-model="switchValue"-->
    <!--      v-bind="$attrs"-->
    <!--      v-on="$listeners"-->
    <!--    ></v-switch>-->

    <!--    <info-modal-->
    <!--      :content="description"-->
    <!--      :show="infoDialog"-->
    <!--      :title="label"-->
    <!--    >-->
    <!--    </info-modal>-->
  </span>
</template>

<script>
//import InfoModual from '../Modals/InfoModal.vue';
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
