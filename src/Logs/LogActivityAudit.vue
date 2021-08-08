<template>
  <v-card class="datatable">
    <datatable-header
      :title="$t('bedrock-users.user_details.audit.title')"
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
      item-key="id"
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

      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.auditable_type }} / {{ item.auditable_id }}<br>
          <span v-for="(value, field) in item.diff" :key="field">
            {{ field }}: <span v-html="value"></span>
          </span>

        </td>
      </template>

      <template v-slot:[`item.diff`]="{ item }">
        <span v-for="(value, field) in item.diff" :key="field">
          <span v-if="'action' !== field"> {{ field }}:</span>
          <span v-html="value"></span>
          <br/>
        </span>
      </template>

      <template v-slot:[`item.auditable_type`]="{ item }">
        {{ item.auditable_type | truncateBegin(20) }}
      </template>

      <template v-slot:[`item.impersonator.email`]="{ item }">
        <span v-if="item.impersonator">
          <span
            :title="$t('bedrock-core.audit.field.impersonated.label') +' : ' + item.impersonator.email "
            class="fal fa-exclamation-triangle"></span>
        </span>
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
            text: this.$t('bedrock-users.misc.user'),
            value: 'person.xid',
          },
          {
            text: this.$t('bedrock-users.misc.email'),
            value: 'person.email',
          },
        );
      }

      this.table.headers.push(
        {
          text: '',
          value: 'impersonator.email',
        },
        {
          text: this.$t('bedrock-core.audit.field.event.label'),
          value: 'event',
        },
        {
          text: this.$t('bedrock-core.audit.field.ip_user.label'),
          value: 'ip_address',
        },
        {
          text: this.$t('bedrock-core.audit.field.difference.label'),
          value: 'diff',
        },
        {
          text: this.$t('bedrock-core.audit.field.auditable.label'),
          value: 'auditable_type',
        },
        {
          text: this.$t('bedrock-users.misc.ip_address'),
          value: 'ip_address',
        },
        {
          text: this.$t('bedrock-core.general.utc'),
          value: 'created_at',
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

/* start hide search support*/
::v-deep .v-data-table__wrapper thead tr th:nth-of-type(3) {
  display: none;
}

::v-deep .v-data-table__wrapper tr td:nth-of-type(3) {
  display: none;
}

/* end hide search support*/

/*Hide columns on mobile*/
/*::v-deep .v-data-table__wrapper tr.v-data-table__mobile-table-row td:nth-of-type(5) {*/
/*  display:none*/
/*}*/

</style>
