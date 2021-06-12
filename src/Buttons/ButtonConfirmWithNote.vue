<template>
  <div>

    <message-modal
      :show="confirmModal"
      :type="type"
      max-width="290"
    >
      <template v-slot:title>
        <slot name="title">Confirm</slot>
      </template>
      <template v-slot:description>
        <slot name="delete-preview"></slot>
        <text-area v-model="note" label="Note" name="note" solo></text-area>
      </template>
      <template v-slot:actions>
        <button class="btn btn-link" @click="doCancelled"> Cancel</button>

        <button :class="'btn btn-'+ type" @click="doAgreed">
          <slot name="button-confirm">Confirm</slot>
        </button>
      </template>
    </message-modal>

    <button :class="'btn btn-sm float-left btn-' + type" @click.prevent="askConfirmation">
      <slot name="button-open">
        <span class="fal fa-fw fa-trash"></span> {{ $t('misc.delete') | capitalizeFirst }}
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
