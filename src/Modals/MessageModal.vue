<template>
  <v-dialog
    v-model="showModal"
    :max-width="maxWidth"
    @click:outside="close()"
  >
    <div class="card">
      <v-card-title :class="'modal-header header-'+ type">
        <slot name="title"></slot>
      </v-card-title>

      <div class="card-body mx-2">
        <slot name="description"></slot>
      </div>

      <div class="card-footer">
        <slot name="actions">
          <button class="btn btn-success float-right" @click="close()">
            {{ $t('bedrock-core.action.close') }}
          </button>
        </slot>
      </div>

    </div>
  </v-dialog>
</template>


<script>
export default {
  inheritAttrs: false,

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'success',
    },
    maxWidth: {
      type: Number,
      default: 200,
    },
  },

  data() {
    return {
      showModal: this.show,
    }
  },

  watch: {
    show() {
      return this.showModal = this.show;
    },
  },

  methods: {
    close() {
      console.log('close-event');
      this.$emit('closed');
    }
  }

};
</script>
