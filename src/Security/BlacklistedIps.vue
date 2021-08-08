<template>
  <v-card class="datatable">
    <datatable-header
      :messages="form.messages"
      :subtitle="$t('bedrock-core.blacklisted_ip.index.description')"
      :title="$t('bedrock-core.blacklisted_ip.index.title')"
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
      <template v-slot:[`item.actions`]="{ item }">
        <button-delete :item="item" @deleteItem="deleteAgreed(item)">
          <template v-slot:delete-preview>{{ item.ip_address }}</template>
        </button-delete>
      </template>
    </v-data-table>

    <datatable-footer>
      <template v-slot:buttons>
        <button-add-modal
          :description="$t('bedrock-core.blacklisted_ip.create.description')"
          :header="$t('bedrock-core.blacklisted_ip.create.title')"
          :isLoading="form.state.isSubmittingAdd"
          :re-show-modal="modals.reshowAdd"
          @confirmed="addItem"
          @cancelled="modalCancelled()"
          @click="openUpdateModal(item)"
        >
          <template v-slot:form>

            <text-field
              v-model="form.data.ip_address"
              :label="$t('bedrock-core.general.ip_address')"
              fieldname="ip_address"
              :api-errors="form.apiErrors"
            ></text-field>

            <text-area
              v-model="form.data.comment"
              :label="$t('bedrock-core.general.comment')"
              fieldname="comment"
              :api-errors="form.apiErrors"
            ></text-area>
          </template>
        </button-add-modal>
      </template>
    </datatable-footer>

  </v-card>
</template>

<script>
import ButtonDelete from '../Buttons/ButtonDelete.vue';
import ButtonAddModal from '../Buttons/ButtonAddModal.vue';
import Datatable from '../Datatable/Datatable.vue';
import DatatableHeader from '../Datatable/DatatableHeader.vue';
import DatatableFooter from '../Datatable/DatatableFooter.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';


export default {
  extends: Datatable,

  components: {
    ButtonDelete,
    ButtonAddModal,
    DatatableHeader,
    DatatableFooter,
    DatatableSearch,
  },

  data() {
    return {
      form: {
        data: {
          ip: '',
          comment: '',
        },

        state: {
          isSubmittingAdd: false,
          isSubmittingRemove: false,
        },

        messages: {
          success: '',
          warning: '',
          error: '',
        },

        apiErrors: {},
      },

      routes: {
        delete: 'api.v1.admin.system.blacklist.ip.delete',
        store: 'api.v1.admin.system.blacklist.ip.add',
      }
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    setFormData(item) {
      this.form.data.ip_address = item.ip_address;
      this.form.data.comment = item.comment;
    },

    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: this.$t('bedrock-core.general.ip_address'),
          value: 'ip_address',
        },
        {
          text: this.$t('bedrock-core.general.comment'),
          value: 'comment',
        },
        {
          text: this.$t('bedrock-core.blacklisted_ip.field.blacklisted_by.label'),
          value: 'blacklisted_by',
        },
        {
          text: this.$t('bedrock-core.general.since'),
          value: 'created_at',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
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
