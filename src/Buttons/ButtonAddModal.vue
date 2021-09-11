<template>
  <div>
    <v-dialog
      v-model="showModal"
      tabindex="0"
      :width="widthSpaced"
      @click:outside="doCancelled"
      @keydown.esc="doCancelled"
    >

      <div class="card">
        <slot name="modal">
          <v-card-title :class="'modal-header header-success'">{{ headerText }}</v-card-title>

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

            <button class="btn btn-success" @click="doAddItem">
              {{ confirmButtonText }}
            </button>
          </div>
        </div>

      </div>
    </v-dialog>

    <button-submit :btn-class="btnClass" :is-loading="isLoading" @click="showForm">
      <slot name="button-content">
        <span class="fal fa-plus"></span>
        <span v-if="withText">
          {{ confirmButtonText }}
        </span>
      </slot>
    </button-submit>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: false,
      default: 'modal-header header-success',
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

    isLoading: {
      type: Boolean,
    },

    withText: {
      type: Boolean,
      default: false,
    },

    btnClass: {
      type: String,
    },

    headerClass: {
      type: String,
    },

    confirmButton: {
      type: String,
      required: false,
    },

    width: {
      type: String,
      default: 'auto',
    },

    reShowModal: false,
  },

  data() {
    return {
      showModal: false,
      headerText: this.header ? this.header : this.$t('bedrock-core.action.add'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.action.add'),

      widthSpaced: this.width + " ",
    };
  },

  watch: {
    width() {
      this.widthSpaced = this.width + " ";
    },

    reShowModal() {
      this.showModal = true;
    }
  },

  methods: {
    showForm() {
      this.showModal = true;
      this.$emit('showForm');
      this.syncData();
    },

    doCancelled() {
      this.showModal = false;
      this.$emit('cancelled');
      this.syncData();
    },

    doAddItem() {
      this.showModal = false;
      this.$emit('confirmed');
      this.syncData();
    },

    syncData() {
      this.$emit('update:showModal', this.showModalData);
    }
  },
};
</script>
