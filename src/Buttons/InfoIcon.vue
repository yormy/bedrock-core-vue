<template>
  <div v-if="content">
    <span class="fal fa-info-circle" @click="infoDialog= !infoDialog"></span>
    <info-modal
      :content="content"
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

    content: {
      type: String,
    },
  },

  data() {
    return {
      infoDialog: false,
    };
  },

};
</script>

