<template>
  <v-card class="datatable">
    <datatable-header
      :messages="form.messages"
      :title="$t('bedrock-core.marketingsnippit.index.title')"
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
      single-select
    >
    </v-data-table>
  </v-card>
</template>

<script>
import Datatable from '../../Datatable/Datatable.vue';
import DatatableHeader from '../../Datatable/DatatableHeader.vue';
import DatatableSearch from '../../Datatable/DatatableSearch.vue';

export default {
  extends: Datatable,

  components: {
    DatatableHeader,
    DatatableSearch,
  },

  data() {
    return {
      form: {
        messages: {
          success: '',
          warning: '',
          error: '',
        },
      }
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: '#',
          value: 'xid',
        },
        {
          text: this.$t('bedrock-core.marketingsnippit.field.subject.label'),
          value: 'title',
        },
        {
          text: this.$t('bedrock-core.marketingsnippit.field.subject.label'),
          value: 'title',
        },
        {
          text: this.$t('bedrock-core.marketingsnippit.field.content.label'),
          value: 'description',
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
