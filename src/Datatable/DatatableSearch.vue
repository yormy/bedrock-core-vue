<template>
  <div class="d-flex justify-content-end">
    <div v-if="showSearchInput">
      <v-text-field
        v-model="searchInput"
        :label="$t('bedrock-core.action.search')"
        dense
        single-line
      ></v-text-field>
    </div>
    <div class="align-middle" @click="showSearchInput=!showSearchInput"><span class="fal fa-search"></span></div>
    <div v-if="filter" @click="showFilters = !showFilters"><span class="fal fa-filter"></span></div>
  </div>
</template>

<script>
export default {
  props: {
    filter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      searchInput: '',
      showSearchInput: false,
      showFilters: false,
    };
  },

  watch: {
    searchInput() {
      this.$emit('update:searchInput', this.searchInput);
    },

    showFilters() {
      this.$emit('update:showFilters', this.showFilters);
    }
  },
};
</script>
