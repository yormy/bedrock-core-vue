<template>
  <div class="d-flex flex-column">

    <div class="row">
      <div class="col">
        <div class="table_title">{{ title }}</div>
        <div v-if="subtitle" class="table_subtitle" v-html="subtitle"></div>
      </div>

      <div v-if="hasMessage()" class="col">
        <div v-if="messages && messages.success" class="table_message success">
          {{ messages.success }}
        </div>
        <div v-if="messages && messages.error" class="table_message danger">
          {{ messages.error }}
        </div>
        <div v-if="messages && messages.warning" class="table_message warning">
          {{ messages.warning }}
        </div>
      </div>

      <div class="col tablesearch float-right" style="min-width:100px">
        <slot name="search"></slot>
      </div>
    </div>

    <div class="row">
      <div class="mx-3 col col-md-3">
        <slot name="filter_01"></slot>
      </div>
      <div class="mx-3 col col-md-3">
        <slot name="filter_02"></slot>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },

    subtitle: {
      type: String,
      required: false,
    },

    messages: {
      type: Object,
      required: false,
    },
  },

  methods: {
    hasMessage() {
      if (this.messages) {
        return this.messages.success || this.messages.error || this.messages.warning;
      }
      return false;
    },
  }

}
</script>
