<template>
  <v-card class="datatable">
    <datatable-header :title="$t('bedrock-core.server_log.error.title')">

      <template v-slot:search>
        <datatable-search
          :search-input.sync="table.searchInput"
          :show-filters.sync="table.showFilters"
        ></datatable-search>
      </template>

      <template v-slot:filter_01>
        <datatable-filter
          :options="filterSeverities"
          :selected.sync="severitySelected"
          :show="table.showFilters"
        ></datatable-filter>
      </template>

      <template v-slot:filter_01>
        <a :href="route('admin.developer.serverlogs.error.export')">
          <button class="btn btn-primary" target="_blank">
            {{ $t('bedrock-core.action.export') }}
          </button>
        </a>
      </template>
    </datatable-header>

    <v-data-table
      :custom-filter="filter"
      :headers="table.headers"
      :items="table.values"
      :search="searchData"
      class="elevation-1"
      item-key="index"
      show-expand
      single-select
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item }}
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Datatable from '../Datatable/Datatable.vue';
import DatatableHeader from '../Datatable/DatatableHeader.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';
import DatatableFilter from '../Datatable/DatatableFilter.vue';


export default {
  extends: Datatable,

  components: {
    DatatableHeader,
    DatatableFilter,
    DatatableSearch,
  },

  props: {
    filterSeverities: {
      type: Array,
    },
  },

  data() {
    return {
      severitySelected: null,
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    hasFilter() {
      if (this.severitySelected) {
        return true;
      }
      return false;
    },

    applyFilters(item) {
      if (item.severity === this.severitySelected) {
        return true;
      }

      return false;
    },

    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: this.$t('bedrock-core.server_log.error.field.severity.label'),
          value: 'severity',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.host.label'),
          value: 'host',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.referrer.label'),
          value: 'referrer',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.client_ip.label'),
          value: 'clientIp',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.request.label'),
          value: 'request',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.date.label'),
          value: 'date',
        },
        {
          text: this.$t('bedrock-core.server_log.error.field.time.label'),
          value: 'time',
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
