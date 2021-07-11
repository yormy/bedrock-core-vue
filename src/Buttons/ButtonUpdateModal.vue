<template>
  <div>
    <v-dialog
      v-model="showModal"
      tabindex="0"
      width="auto "
      @click:outside="doCancelled"
      @keydown.esc="doCancelled">

      <div class="card">
        <slot name="modal">
          <v-card-title :class="'modal-header header-warning'">{{ headerText }}</v-card-title>

          <div class="card-body">
            <h3>{{ title }} </h3>
            <p v-if="description" v-html="description"></p>
            <slot name="form"></slot>
          </div>
        </slot>

        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <button @click="doCancelled">
              {{ $t('bedrock-core.general.cancel') }}
            </button>

            <button class="btn btn-warning" @click="doUpdateItem">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>

      </div>
    </v-dialog>

  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: false,
      default: 'modal-header header-warning',
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    iconAppend: {
      type: String,
    },

    disabled: {
      type: Boolean,
    },

    headerClass: {
      type: String,
    },

    confirmButton: {
      type: String,
      required: false,
    },

    reShowModal: false,

    showModal: false,
  },

  data() {
    return {
      headerText: this.header ? this.header : this.$t('bedrock-core.action.update'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.action.update'),
      showModalData: this.showModal
    };
  },

  watch: {
    reShowModal() {
      this.showModalData = true;
    }
  },

  methods: {
    doCancelled() {
      this.showModalData = false;
      this.$emit('cancelled');
      this.syncData();
    },

    doUpdateItem() {
      this.showModalData = false;
      this.$emit('confirmed');
      this.syncData();
    },

    syncData() {
      this.$emit('update:showModal', this.showModalData);
    }
  },
};
</script>
