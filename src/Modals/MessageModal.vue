<template>
  <v-dialog
    v-model="show"
    v-bind="$attrs"
    v-on="$listeners"
    persistent
  >
    <v-card>
      <v-card-title :class="'modal-header header-'+ type">
        <slot name="title"></slot>
      </v-card-title>

      <div class="mx-2">
        <slot name="description"></slot>
      </div>

      <v-card-actions>
        <v-spacer></v-spacer>
        <slot name="actions">
          <v-btn text @click="closed">
            {{ $t('bedrock-core.action.close') }}
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
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
