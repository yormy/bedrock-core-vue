<template>
  <div>
    <v-dialog v-model="addModal" width="auto ">
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

    reShowModal: false,
  },

  data() {
    return {
      addModal: false,
      headerText: this.header ? this.header : this.$t('bedrock-core.action.add'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.action.add'),
    };
  },

  watch: {
    reShowModal() {
      this.addModal = true;
      console.log('reshow');
    }
  },

  methods: {
    showForm() {
      this.addModal = true;
    },

    doCancelled() {
      this.addModal = false;
    },

    doAddItem() {
      this.addModal = false;
      this.$emit('addItem');
    },
  },
};
</script>
