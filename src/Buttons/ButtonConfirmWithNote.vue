<template>
  <div>
    <message-modal
      :show="confirmModal"
      :type="type"
      :max-width="290"
      :re-show-modal="reShowModal"
      @closed="doCancelled"
    >
      <template v-slot:title>
        <slot name="title">Confirm</slot>
      </template>
      <template v-slot:description>
        <slot name="delete-preview"></slot>
        <text-area
          v-model="note"
          :api-errors="apiErrors"
          fieldname="note"
          label="Note"
          name="note"
        >
        </text-area>
      </template>
      <template v-slot:actions>
        <div class="d-flex justify-content-between">
          <button class="btn btn-link" @click="doCancelled">{{ $t('bedrock-core.action.cancel') }}</button>

          <button :class="'btn btn-'+ type" @click="doAgreed">
            <slot name="button-confirm">{{ $t('bedrock-core.action.confirm') }}</slot>
          </button>
        </div>
      </template>
    </message-modal>

    <button :class="'btn btn-sm float-left btn-' + type" @click.prevent="askConfirmation">
      <slot name="button-open">
        <span class="fal fa-fw fa-trash"></span>{{ $t('bedrock-core.action.delete') }}
      </slot>
    </button>
  </div>
</template>

<script>
import MessageModal from '../Modals/MessageModal.vue';

export default {
  components: {
    MessageModal
  },

  props: {
    apiErrors: {
      type: Object,
      required: true,
    },

    item: {
      type: Object,
      required: true,
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

    type: {
      type: String,
      default: 'success'
    },

    reShowModal: {
      type: Boolean,
      default: false,
    }
  },

  watch: {
    reShowModal() {
      this.confirmModal = true;
    }
  },

  data() {
    return {
      confirmModal: false,
      note: '',
    };
  },

  methods: {
    askConfirmation() {
      this.note = '';
      this.confirmModal = true;
    },

    doCancelled() {
      this.confirmModal = false;
    },

    doAgreed() {
      this.confirmModal = false;
      this.$emit('confirmedItem', this.item, this.note);
    },

  },
};
</script>

<style scoped></style>
