<template>
  <text-field
    v-model="searchInput"
    :label="$t('bedrock-core.action.search')"
    append-icon="mdi-magnify"
    single-line
  ></text-field>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
    };
  },

  watch: {
    searchInput() {
      this.$emit('update:searchInput', this.searchInput);
    },
  },
};
</script>
