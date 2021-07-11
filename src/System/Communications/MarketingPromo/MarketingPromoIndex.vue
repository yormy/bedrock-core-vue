<template>
  <v-card class="datatable">
    <datatable-header
      :messages="form.messages"
      :title="$t('bedrock-core.marketingpromo.index.title')"
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
        <div class="d-flex float-right">
          <button class="btn btn-primary mx-1" @click="openSameTab(routes.show, item.xid)">
            <span class="fal fa-eye"></span>
          </button>
          <button class="btn btn-primary mx-1" @click="openNewTab(routes.edit, item.xid)">
            <span class="fal fa-pencil"></span>
          </button>
          <button-delete :item="item" @deleteItem="deleteAgreed(item)">
            <template v-slot:delete-preview>
              {{ item.title }}
            </template>
          </button-delete>
        </div>

      </template>

    </v-data-table>
    <datatable-footer>
      <template v-slot:buttons>
        <a :href="route(routes.create)">
          <button class="btn btn-success">
            <span class="fal fa-plus">{{ $t('bedrock-core.action.add') }}</span>
          </button>
        </a>
      </template>
    </datatable-footer>

  </v-card>
</template>

<script>
import Datatable from '../../../Datatable/Datatable.vue';
import DatatableHeader from '../../../Datatable/DatatableHeader.vue';
import DatatableSearch from '../../../Datatable/DatatableSearch.vue';
import DatatableFooter from "../../../Datatable/DatatableFooter.vue";
import ButtonDelete from '../../../Buttons/ButtonDelete.vue';

export default {
  extends: Datatable,

  components: {
    DatatableFooter,
    DatatableHeader,
    DatatableSearch,
    ButtonDelete
  },

  data() {
    return {
      form: {
        messages: {
          success: '',
          warning: '',
          error: '',
        },
        state: {
          isSubmitting: false,
        }
      },

      routes: {
        edit: 'admin.system.communications.marketingpromos.edit',
        show: 'admin.system.communications.marketingpromos.show',
        create: 'admin.system.communications.marketingpromos.create',
        delete: 'admin.system.communications.marketingpromos.delete',
      }
    };
  },

  created() {
    this.createHeaders();
  },


  methods: {
    openNewTab(route, xid) {
      // opening with javascript allows the child to reload the parent on close
      window.open(this.route(route, xid) + '?new=1');
    },

    openSameTab(route, xid) {
      window.location.href = this.route(route, xid);
    },

    deleteAgreed(item) {
      this.table.values = this.deleteItemFromTable(this.table.values, item, 'xid');
      this.deleteModal = false;
      this.deleteItem(item);
    },

    deleteItem(item) {
      this.clearformResult();
      this.form.state.isSubmitting = true;

      this.$http
        .delete(this.route(this.routes.delete, item.xid))
        .then(response => {
          this.form.messages.success = response.data.message;
        })
        .catch(error => {
          this.table.values = this.restoreTable();
          this.form.messages.error = error.response.data.message;
        })
        .finally(() => {
          this.form.state.isSubmitting = false;
        });
    },

    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: '#',
          value: 'xid',
        },
        {
          text: this.$t('bedrock-core.marketingpromo.field.position.label'),
          value: 'position',
        },
        {
          text: this.$t('bedrock-core.marketingpromo.field.subject.label'),
          value: 'title',
        },
        {
          text: this.$t('bedrock-core.marketingpromo.field.subtitle.label'),
          value: 'subtitle',
        },
        {
          text: this.$t('bedrock-core.general.active_at'),
          value: 'active_at_human',
        },
        {
          text: '',
          value: 'actions',
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
