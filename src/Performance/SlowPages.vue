<template>
  <v-card class="datatable">
    <datatable-header :title="title">
      <template v-slot:search>
        <datatable-search :search-input.sync="search"></datatable-search>
      </template>
    </datatable-header>

    <v-data-table
      :headers="headers"
      :items="values"
      :search="search"
      class="elevation-1"
      item-key="xid"
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
import DatatableHeader from '../Datatable/DatatableHeader.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';

export default {
  components: {
    DatatableHeader,
    DatatableSearch,
  },

  props: {
    title: {
      type: String,
    },
    values: {
      type: Array,
    },
  },

  data() {
    return {
      headers: null,
      search: '',
    };
  },

  created() {
    this.headers = [
      {
        text: this.$t('bedrock-core.general.description'),
        value: 'description',
      },
      {
        text: this.$t('bedrock-core.performance.response_time'),
        value: 'response_time',
      },
    ];
  },
};
</script>
