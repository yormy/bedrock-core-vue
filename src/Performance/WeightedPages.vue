<template>
  <v-card class="datatable">
    <datatable-header :title="title">
      <template v-slot:search>
        <datatable-search :search-input.sync="table.searchInput"></datatable-search>
      </template>
    </datatable-header>

    <v-data-table
      :headers="table.headers"
      :items="table.values"
      :search="searchData"
      class="elevation-1"
      item-key="description"
      show-expand
      single-select
    >
      <template v-slot:[`item.description`]="{ item }">
        {{ item.description | truncate(40) }}
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">{{ item.description }} <br/></td>
      </template>
    </v-data-table>

  </v-card>
</template>

<script>
import Datatable from '../Datatable/Datatable.vue';
import DatatableHeader from '../Datatable/DatatableHeader.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';

export default {
  extends: Datatable,

  components: {
    DatatableHeader,
    DatatableSearch,
  },

  created() {
    this.createHeaders();
  },

  methods: {
    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: this.$t('bedrock-core.general.count'),
          value: 'count',
        },
        {
          text: this.$t('bedrock-core.general.description'),
          value: 'description',
        },
        {
          text: this.$t('bedrock-core.performance.avg_weight'),
          value: 'weightedAvg',
        },
      );
    }
  }
};
</script>

<style scoped>
/* start hide search support */
::v-deep .v-data-table__wrapper thead tr th:nth-of-type(2) {
  display: none;
}

::v-deep .v-data-table__wrapper tr td:nth-of-type(2) {
  display: none;
}

/* end hide search support*/
</style>
