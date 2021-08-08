<template>
  <v-card class="datatable">
    <datatable-header
      :title="$t('bedrock-users.failed_jobs.index.title')"
    >
      <template v-slot:search>
        <datatable-search :search-input.sync="table.searchInput"></datatable-search>
      </template>
    </datatable-header>

    <v-data-table
      :headers="table.headers"
      :items="table.values"
      :search="searchData"
      class="elevation-1"
      item-key="xid"
      show-expand
      single-select
    >
      <template v-slot:[`item.payload`]="{ item }">
        {{ item.payload | truncate(10) }}
      </template>

      <template v-slot:[`item.exception`]="{ item }">
        {{ item.exception | truncate(10) }}
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.payload }}
          <br/>
          <hr/>
          <br/>
          {{ item.exception }}
        </td>
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
          text: this.$t('bedrock-users.failed_jobs.field.connection.label'),
          value: 'connection',
        },
        {
          text: this.$t('bedrock-users.failed_jobs.field.queue.label'),
          value: 'queue',
        },
        {
          text: this.$t('bedrock-users.failed_jobs.field.payload.label'),
          value: 'payload',
        },
        {
          text: this.$t('bedrock-users.failed_jobs.field.exception.label'),
          value: 'exception',
        },
        {
          text: this.$t('bedrock-users.failed_jobs.field.failed_at.label'),
          value: 'failed_at_humans',
        }
      );
    },
  },
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
