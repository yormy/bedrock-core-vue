<template>
  <v-dialog
    v-model="show"
    v-bind="$attrs"
    v-on="$listeners"
    persistent
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
          <button class="btn btn-success float-right" @click="closed">
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
  },

  methods: {
    closed() {
      this.show = false
      this.$emit('closed');
    }
  }

};
</script>
