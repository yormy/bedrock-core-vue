<template>
  <div>
    <message-modal
      :show="deleteModal"
      :max-width="maxWidth"
      type="danger"
      @closed="doCancelled()"
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
        <div class="d-flex justify-content-between">
          <button @click="doCancelled">
            {{ $t('bedrock-core.general.cancel') }}
          </button>

          <button class="btn btn-danger" @click="doAgreed">
            {{ confirmButtonText }}
          </button>
        </div>
      </template>
    </message-modal>


    <button-submit :btnClass="btnClass" :is-loading="state.isLoading" @click="askConfirmation">
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
      required: false,
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

    maxWidth: {
      type: Number,
      default: 200
    }
  },

  data() {
    return {
      state: {
        isLoading: this.isLoading,
      },


      deleteModal: false,

      headerText: this.header ? this.header : this.$t('bedrock-core.general.delete'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.general.delete'),
    };
  },

  watch: {
    isLoading() {
      this.state.isLoading = this.isLoading;
    },
  },

  methods: {
    askConfirmation() {
      this.deleteModal = true;
      this.state.isLoading = true;
    },

    doCancelled() {
      this.deleteModal = false;
      this.state.isLoading = false;
    },

    doAgreed() {
      this.deleteModal = false;
      this.$emit('deleteItem', this.item);
    },

  },
};
</script>

<style scoped></style>
