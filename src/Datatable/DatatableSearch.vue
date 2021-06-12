<template>
  <div class="d-flex">
    <div v-if="showSearchInput">
      <v-text-field
        v-model="searchInput"
        :label="$t('bedrock-core.action.search')"
        dense
        single-line
      ></v-text-field>
    </div>
    <div class="align-middle" @click="showSearchInput=!showSearchInput"><span class="fal fa-search"></span></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '',
      showSearchInput: false,
    };
  },

  watch: {
    searchInput() {
      this.$emit('update:searchInput', this.searchInput);
    },
  },
};
</script>
