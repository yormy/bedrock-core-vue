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
          :re-show-modal="reShowModal"
          @addItem="addItem"
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
      reShowModal: false,

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

      urls: {
        create: this.route('api.v1.admin.system.blacklist.ip.add'),
        delete: this.route('api.v1.admin.system.blacklist.ip.delete'),
      },
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

    addItem() {
      this.clearformResult();
      this.form.state.isSubmittingAdd = true;

      const payload = this.form.data;

      this.$http
        .post(this.urls.create, payload)
        .then(response => {
          this.table.values = this.addItemToTable(this.table.values, response.data.data);
          this.form.messages.success = response.data.message;
          this.form.data = {};
        })
        .catch(error => {
          this.reShowModal = !this.reShowModal; // just triggering the reshowing
          this.form.messages.error = error.response.data.message;
          this.form.apiErrors = error.response.data.errors;
        })
        .finally(() => {
          this.form.state.isSubmittingAdd = false;
        });
    },

    deleteAgreed(item) {
      this.table.values = this.deleteItemFromTable(this.table.values, item, 'xid');
      this.deleteModal = false;
      this.deleteItem(item);
    },

    deleteItem(item) {
      this.clearformResult();
      this.form.state.isSubmittingRemove = true;

      const payload = {
        xid: item.xid,
      };

      this.$http
        .delete(this.urls.delete, {data: payload})
        .then(response => {
          this.form.messages.success = response.data.message;
        })
        .catch(error => {
          this.table.values = this.restoreTable();
          this.form.messages.error = error.response.data.message;
        })
        .finally(() => {
          this.form.state.isSubmittingRemove = false;
        });
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
