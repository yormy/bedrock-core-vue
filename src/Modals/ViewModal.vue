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
          <v-card-title :class="'modal-header header-info'">{{ headerText }}</v-card-title>

          <div class="card-body">
            <h3>{{ title }} </h3>
            <p v-if="description" v-html="description"></p>
            <slot name="form"></slot>
          </div>
        </slot>

        <div class="card-footer">
          <div class="d-flex justify-content-end">
            <button @click="doCancelled">
              {{ $t('bedrock-core.general.close') }}
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
      default: 'modal-header header-info',
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

    showModal: false,
  },

  data() {
    return {
      headerText: this.header ? this.header : this.$t('bedrock-core.action.add'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.action.add'),
      showModalData: this.showModal
    };
  },

  methods: {
    doCancelled() {
      this.showModalData = false;
      this.$emit('closed');
      this.syncData();
    },
    syncData() {
      this.$emit('update:showModal', this.showModalData);
    }
  },
};
</script>
