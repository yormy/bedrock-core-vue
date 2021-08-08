<template>
  <v-card class="datatable">
    <datatable-header
      :title="$t('bedrock-users.jobs.index.title')"
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
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">{{ item }} <br/></td>
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
          text: this.$t('bedrock-users.jobs.field.queue.label'),
          value: 'queue',
        },
        {
          text: this.$t('bedrock-users.jobs.field.payload.label'),
          value: 'payload',
        },
        {
          text: this.$t('bedrock-users.jobs.field.attempts.label'),
          value: 'attempts',
        },
        {
          text: this.$t('bedrock-users.jobs.field.reserved_at.label'),
          value: 'reserved_at',
        },
        {
          text: this.$t('bedrock-users.jobs.field.available_at.label'),
          value: 'available_at',
        },
        {
          text: this.$t('bedrock-users.jobs.field.created_at.label'),
          value: 'created_at',
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
