<template>
    <v-select
      v-if="show"
      v-model="selected"
      :clear-icon="'fal fa-xs fa-times'"
      :items="options"
      :label="$t('bedrock-core.action.select')"
      clearable
      item-text="name"
      item-value="key"
      persistent-hint
      return-object
      single-line
      @click:append="reset"
      dense
    >
    </v-select>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
    },
    show: {
      type: Boolean,
      default: false,
    }
  },

  data() {
    return {
      selected: '',
    };
  },

  watch: {
    selected() {
      this.$emit('update:selected', this.selected);

      window.setTimeout(() => {
        this.$emit('changed');
      }, 0);
    },
  },

  methods: {
    reset() {
      this.selected = '';
    },
  },
};
</script>
