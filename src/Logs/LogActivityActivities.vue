<template>
  <v-card class="datatable">
    <datatable-header
      :title="$t('bedrock-users.user_details.visits.title')"
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
      <template v-slot:[`item.person.xid`]="{ item }">
        <span v-if="item.person"
              class="btn btn-link"
              @click="copyClipboard(item.person.xid)">
            <span v-if="item.person.xid === valueOnClipboard"><span class="fal fa-clipboard"></span></span>
            <span v-else>{{ item.person.xid | truncate(2) }}</span>
        </span>
      </template>

      <template v-slot:[`item.description`]="{ item }">
        {{ item.description | truncate(15) }}
      </template>

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.description }}
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
    withUser: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {};
  },

  created() {
    this.createHeaders();
  },

  methods: {
    createHeaders() {
      this.makeSearchable();

      if (this.withUser) {
        this.table.headers.push(
          {
            text: this.$t('bedrock-core.general.user'),
            value: 'person.xid',
          },
          {
            text: this.$t('bedrock-core.general.email'),
            value: 'person.email',
          },
        );
      }

      this.table.headers.push(
        {
          text: this.$t('bedrock-core.log_activities.field.description.label'),
          value: 'description',
        },
        {
          text: this.$t('bedrock-core.log_activities.field.ip_user.label'),
          value: 'ip_user',
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
/* start hide search support*/
::v-deep .v-data-table__wrapper thead tr th:nth-of-type(2) {
  display: none;
}

::v-deep .v-data-table__wrapper tr td:nth-of-type(2) {
  display: none;
}

/* end hide search support*/
</style>
