<template>
  <v-card class="datatable">
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>
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


        <button-submit :is-loading="item.xid == currentItem.xid" @click="openUpdateModal(item)">
          <span class="fal fa-pencil"></span>
        </button-submit>
        <button class="btn btn-primary" @click="openViewModal(item)">
          <span class="fal fa-eye"></span>
        </button>

      </template>

    </v-data-table>
    <datatable-footer>
      <template v-slot:buttons>
        <!--          <a :href="route(routes.create)">-->
        <!--            <button class="btn btn-success">-->
        <!--              <span class="fal fa-plus">{{ $t('bedrock-core.action.add') }}</span>-->
        <!--            </button>-->
        <!--          </a>-->

        <button-add-modal
          :description="$t('bedrock-core.marketingsnippit.create.description')"
          :header="$t('bedrock-core.marketingsnippit.create.title')"
          :isLoading="form.state.isSubmittingAdd"
          :re-show-modal="modals.reshowAdd"
          @confirmed="addItem"
        >
          <template v-slot:form>
            <ValidationObserver ref="form">
              <text-field
                v-model="form.data.title"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.marketingsnippit.field.title.hint')"
                :label="$t('bedrock-core.marketingsnippit.field.title.label')"
                fieldname="title"
              ></text-field>

              <text-area
                v-model="form.data.description"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.marketingsnippit.field.content.hint')"
                :label="$t('bedrock-core.marketingsnippit.field.content.label')"
                fieldname="description"
              ></text-area>
            </ValidationObserver>

            <date-time-picker
              v-model="form.data.active_at"
              :api-errors="form.apiErrors"
              :current="form.data.active_at"
              :description="$t('bedrock-core.marketingsnippit.field.active_at.hint')"
              :label="$t('bedrock-core.marketingsnippit.field.active_at.label')"
              fieldname="active_at"
            />

            <date-time-picker
              v-model="form.data.expires_at"
              :api-errors="form.apiErrors"
              :current="form.data.expires_at"
              :description="$t('bedrock-core.marketingsnippit.field.expires_at.hint')"
              :label="$t('bedrock-core.marketingsnippit.field.expires_at.label')"
              fieldname="expires_at"/>
          </template>
        </button-add-modal>
      </template>
    </datatable-footer>

    <button-update-modal
      :description="$t('bedrock-core.marketingsnippit.create.description')"
      :header="$t('bedrock-core.marketingsnippit.create.title')"
      :re-show-modal="modals.reshowUpdate"
      :show-modal.sync="modals.showUpdate"
      @cancelled="modalCancelled()"
      @confirmed="updateItem(currentItem.xid)"
    >
      <template v-slot:form>
        <ValidationObserver ref="form">
          <text-field
            v-model="form.data.title"
            :api-errors="form.apiErrors"
            :hint="$t('bedrock-core.marketingsnippit.field.title.hint')"
            :label="$t('bedrock-core.marketingsnippit.field.title.label')"
            fieldname="title"
          ></text-field>

          <text-area
            v-model="form.data.description"
            :api-errors="form.apiErrors"
            :hint="$t('bedrock-core.marketingsnippit.field.content.hint')"
            :label="$t('bedrock-core.marketingsnippit.field.content.label')"
            fieldname="description"
          ></text-area>
        </ValidationObserver>

        <date-time-picker
          v-model="form.data.active_at"
          :api-errors="form.apiErrors"
          :current="form.data.active_at"
          :description="$t('bedrock-core.marketingsnippit.field.active_at.hint')"
          :label="$t('bedrock-core.marketingsnippit.field.active_at.label')"
          fieldname="active_at"
        />

        <date-time-picker
          v-model="form.data.expires_at"
          :api-errors="form.apiErrors"
          :current="form.data.expires_at"
          :description="$t('bedrock-core.marketingsnippit.field.expires_at.hint')"
          :label="$t('bedrock-core.marketingsnippit.field.expires_at.label')"
          fieldname="expires_at"/>
      </template>
    </button-update-modal>

    <button-view-modal
      :description="$t('bedrock-core.marketingsnippit.create.description')"
      :header="$t('bedrock-core.marketingsnippit.create.title')"
      :show-modal.sync="modals.showView"
      @closed="modalCancelled()"
    >
      <template v-slot:form>
        <h1>{{ $t('bedrock-core.marketingsnippit.show.title') }}</h1>
        <div>
          <h3>{{ $t('bedrock-core.marketingsnippit.field.title.label') }}</h3>
          <p>{{ form.data.title }}</p>
        </div>

        <div>
          <h3>{{ $t('bedrock-core.marketingsnippit.field.content.label') }}</h3>
          <p>{{ form.data.description }}</p>
        </div>

        <div>
          <h3>
            {{ $t('bedrock-core.marketingsnippit.field.active_from_till.label') }}
          </h3>
          <p>
            {{
              $t('bedrock-core.marketingsnippit.field.active_from_till.content',
                {active_at: form.data.active_at, expires_at: form.data.expires_at})
            }}
          </p>
        </div>
      </template>
    </button-view-modal>

  </v-card>
</template>

<script>
import Datatable from '../../../Datatable/Datatable.vue';
import DatatableHeader from '../../../Datatable/DatatableHeader.vue';
import DatatableSearch from '../../../Datatable/DatatableSearch.vue';
import DatatableFooter from "../../../Datatable/DatatableFooter.vue";
import ButtonDelete from '../../../Buttons/ButtonDelete.vue';
import ButtonAddModal from '../../../Buttons/ButtonAddModal.vue';
import ButtonUpdateModal from '../../../Buttons/ButtonUpdateModal.vue';
import ButtonViewModal from '../../../Buttons/ButtonViewModal.vue';


export default {
  extends: Datatable,

  components: {
    DatatableFooter,
    DatatableHeader,
    DatatableSearch,
    ButtonDelete,
    ButtonAddModal,
    ButtonUpdateModal,
    ButtonViewModal
  },

  data() {
    return {
      currentItem: {},

      form: {
        data: {
          title: '',
          description: '',
          active_at: '',
          expires_at: ''
        },

        messages: {
          success: '',
          warning: '',
          error: '',
        },

        state: {
          isSubmitting: false,
          isSubmittingAdd: false,
          isSubmittingUpdate: ''
        },

        apiErrors: {},
      },


      routes: {
        show: 'admin.system.communications.marketingsnippits.show',
        edit: 'admin.system.communications.marketingsnippits.edit',
        create: 'admin.system.communications.marketingsnippits.create',
        delete: 'admin.system.communications.marketingsnippits.delete',

        store: 'admin.system.communications.marketingsnippits.store',
        update: 'admin.system.communications.marketingsnippits.update',
      }
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    setFormData(item) {
      this.form.data.title = item.title;
      this.form.data.description = item.description;
      this.form.data.active_at = item.active_at;
      this.form.data.expires_at = item.expires_at;
    },

    createHeaders() {
      this.makeSearchable();

      this.table.headers.push(
        {
          text: '#',
          value: 'xid',
        },
        {
          text: this.$t('bedrock-core.marketingsnippit.field.title.label'),
          value: 'title',
        },
        {
          text: this.$t('bedrock-core.marketingsnippit.field.content.label'),
          value: 'description',
        },
        {
          text: this.$t('bedrock-core.general.active_at'),
          value: 'active_at_human',
        },
        {
          text: this.$t('bedrock-core.general.expires_at'),
          value: 'expires_at_human',
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
