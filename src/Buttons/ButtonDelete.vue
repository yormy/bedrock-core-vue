<template>
  <div>
    <message-modal
      :show="deleteModal"
      max-width="290"
      type="warning"
    >
      <template v-slot:title>
        {{ headerText }}
      </template>
      <template v-slot:description>
        <h3>{{ title }} </h3>
        <p>{{ description }}</p>
        <slot name="delete-preview"></slot>
      </template>
      <template v-slot:actions>
        <v-btn color="green darken-1" text @click="doCancelled">
          {{ $t('bedrock-core.general.cancel') }}
        </v-btn>

        <v-btn color="red darken-1" text @click="doAgreed">
          {{ confirmButtonText }}
        </v-btn>
      </template>
    </message-modal>


    <button-submit :btnClass="btnClass" :is-loading="isLoading" @click="askConfirmation">
      <slot name="button-content">
        <span class="fal fa-fw fa-trash"></span>
        <span v-if="showText">{{ $t('bedrock-core.general.delete') }}</span>
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
    MessageModal,
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
      default: 'btn btn-danger',
    },
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

    doAgreed() {
      this.deleteModal = false;
      this.$emit('deleteItem', this.item);
    },

  },
};
</script>

<style scoped></style>
