<template>
  <v-card class="datatable">
    <datatable-header :title="$t('bedrock-core.server_log.access.title')">
      <template v-slot:search>
        <datatable-search :search-input.sync="searchInput"></datatable-search>
      </template>
      <template v-slot:filter_01>
        <a :href="route('admin.developer.serverlogs.access.export')">
          <button class="btn btn-primary" target="_blank">
            {{ $t('bedrock-core.action.export') }}
          </button>
        </a>
      </template>
    </datatable-header>

    <v-data-table
      :custom-filter="filter"
      :headers="headers"
      :items="datatableValues"
      :items-per-page="10"
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

export default {
  extends: Datatable,

  components: {
    DatatableHeader,
    DatatableSearch,
  },

  props: {
    title: {
      type: String,
    },
    datatableValues: {
      type: Array,
    },
  },

  data() {
    return {
      headers: null,
      severitySelected: null,
    };
  },

  created() {
    this.setHeaders();
  },

  methods: {
    hasFilter() {
      return false;
    },

    setHeaders() {
      this.headers = [
        {
          text: this.$t('bedrock-core.server_log.access.field.host.label'),
          value: 'host',
        },
        {
          text: this.$t('bedrock-core.server_log.access.field.user.label'),
          value: 'user',
        },
        {
          text: this.$t('bedrock-core.server_log.access.field.remote_ip.label'),
          value: 'remoteIp',
        },
        {
          text: this.$t('bedrock-core.server_log.access.field.request.label'),
          value: 'request',
        },
        {
          text: this.$t('bedrock-core.general.date'),
          value: 'time',
        },
        {
          text: 'd',
          value: 'dummy',
          class: 'hidden',
          width: '1px',
          align: ' d-none',
        } /* add dummy column to be able to additional default filtering on status */,
      ];
    },
  },
};
</script>
