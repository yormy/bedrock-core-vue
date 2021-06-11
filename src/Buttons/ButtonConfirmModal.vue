<template>
  <div>
    <message-modal
      :show="deleteModal"
      :type="actionType"
      max-width="290"
    >
      <template v-slot:title>
        {{ headerText }}
      </template>
      <template v-slot:description>
        <h3>{{ title }} </h3>
        <p>{{ description }}</p>
        <slot name="message"></slot>
      </template>
      <template v-slot:actions>
        <button class="btn btn-link" @click="doCancelled">
          {{ $t('bedrock-core.general.cancel') }}
        </button>

        <button :class="'btn btn-primary'" @click="doConfirmed">
          {{ confirmButtonText }}
        </button>
      </template>
    </message-modal>

    <button-submit :btnClass="btnClass" :is-loading="isLoading" @click="askConfirmation">
      <slot name="button-content">
        [specify the text on the button]
      </slot>
    </button-submit>
  </div>
</template>

<script>
import ButtonSubmit from './ButtonSubmit.vue';
import MessageModal from '../Modals/MessageModal.vue';

export default {
  components: {
    ButtonSubmit,
    MessageModal
  },

  props: {
    header: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    item: {
      type: Object,
      required: true,
    },

    confirmButton: {
      type: String,
      required: false,
    },

    iconAppend: {
      type: String,
    },

    disabled: {
      type: Boolean,
    },

    isLoading: {
      type: Boolean,
    },

    showText: {
      type: Boolean,
      default: false,
    },

    btnClass: {
      type: String,
      required: true
    },

    actionType: {
      type: String,
      default: 'success'
    }
  },

  data() {
    return {
      deleteModal: false,

      headerText: this.header ? this.header : this.$t('bedrock-core.general.delete'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.general.delete'),
    };
  },

  methods: {
    askConfirmation() {
      this.deleteModal = true;
    },

    doCancelled() {
      this.deleteModal = false;
    },

    doConfirmed() {
      this.deleteModal = false;
      this.$emit('confirmed', this.item);
    },

  },
};
</script>

<style scoped></style>
