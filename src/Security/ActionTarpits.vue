<template>
  <v-card class="datatable">
    <datatable-header
      :messages="form.messages"
      :title="$t('bedrock-core.action_tarpit.index.title')"
    >
      <template v-slot:search>
        <datatable-search :search-input.sync="searchInput"></datatable-search>
      </template>

    </datatable-header>

    <v-data-table
      :headers="headers"
      :items="datatableValues"
      :search="searchData"
      class="elevation-1"
      item-key="xid"
      single-select
    >
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
      searchInput: null,
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    createHeaders() {
      this.makeSearchable();

      this.headers.push(
        {
          text: this.$t('bedrock-core.general.ip_address'),
          value: 'ip_address',
        },
        {
          text: this.$t('bedrock-core.action_tarpit.field.action.label'),
          value: 'action',
        },
        {
          text: this.$t('bedrock-core.action_tarpit.field.tries.label'),
          value: 'tries',
        },
        {
          text: this.$t('bedrock-core.action_tarpit.field.block_until.label'),
          value: 'block_until',
        },
        {
          text: this.$t('bedrock-core.general.date'),
          value: 'created_at_human',
        }
      );
    },
  },
};
</script>
<style scoped>
/* start hide search support */
::v-deep .v-data-table__wrapper thead tr th:nth-of-type(1) {
  display: none;
}

::v-deep .v-data-table__wrapper tr td:nth-of-type(1) {
  display: none;
}

/* end hide search support*/
</style>
