<template>
  <div v-if="contentHtml || contentText">
    <span :class="size" class="fal fa-info-circle" @click="infoDialog= !infoDialog"></span>
    <info-modal
      :content-html="contentHtml"
      :content-text="contentText"
      :show="infoDialog"
      :title="title"
    >
    </info-modal>
  </div>
</template>

<script>
import InfoModal from '../Modals/InfoModal.vue'

export default {
  components: {
    InfoModal,
  },

  props: {
    title: {
      type: String,
    },

    contentHtml: {
      type: String,
    },

    contentText: {
      type: String,
    },

    size: {
      type: String,
      default: 'fa-xs'
    }
  },

  data() {
    return {
      infoDialog: false,
    };
  },

};
</script>

