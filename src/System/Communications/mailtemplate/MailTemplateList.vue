<template>
  <div>
    <v-app>
      <div id="labels_overview_table">
        <v-card-title>
          <v-row>
            <v-col>
              <list-review-status-component
                :review-status-selected.sync="reviewStatusSelected"
              ></list-review-status-component>
            </v-col>

            <v-col>
              <list-text-status-component
                :text-status-selected.sync="textStatusSelected"
              ></list-text-status-component>
            </v-col>

            <v-spacer></v-spacer>

            <v-col cols="4">
              <list-search-component :search-input.sync="searchInput"></list-search-component>
            </v-col>
          </v-row>

          <button v-if="canAdd()" class="btn btn-success" type="submit" @click="addItem">+</button>
        </v-card-title>

        <v-data-table
          v-model="selectedItems"
          :custom-filter="filter"
          :headers="headers"
          :items="state.items"
          :items-per-page="10"
          :search="searchData"
          class="elevation-1"
          item-key="meta.id"
          show-expand
          single-select
          @click:row="rowClick"
          @current-items="getFiltered"
        >
          <!--            <template v-slot:item.actions="{ item }">-->
          <!--&lt;!&ndash;                <v-icon&ndash;&gt;-->
          <!--&lt;!&ndash;                    small&ndash;&gt;-->
          <!--&lt;!&ndash;                    class="mr-2"&ndash;&gt;-->
          <!--&lt;!&ndash;                    @click="editItem(item)"&ndash;&gt;-->
          <!--&lt;!&ndash;                >&ndash;&gt;-->
          <!--&lt;!&ndash;                    mdi-pencil&ndash;&gt;-->
          <!--&lt;!&ndash;                </v-icon>&ndash;&gt;-->
          <!--                <v-icon-->
          <!--                    v-if="item.langBase === item.langTranslation"-->
          <!--                    small-->
          <!--                    @click="deleteItem(item)"-->
          <!--                >-->
          <!--                    mdi-delete-->
          <!--                </v-icon>-->
          <!--            </template>-->

          <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">
              ID: {{ item.meta.id }} <br/>
              <span
                :style="`color:${
                  $config.multilingual.textstatus.status[item.meta.text_status].color
                }`"
              >
                <span
                  :class="$config.multilingual.textstatus.status[item.meta.text_status].fa_icon"
                ></span>
              </span>
              {{ $t(`multilingual-admin.textstatus.status.${item.meta.text_status}.text`) }}<br/>

              <span
                :style="`color:${
                  $config.multilingual.reviewstatus.status[item.meta.review_status].color
                }`"
              >
                <span
                  :class="$config.multilingual.reviewstatus.status[item.meta.review_status].fa_icon"
                ></span>
              </span>
              {{
                $t(`multilingual-admin.reviewstatus.status.${item.meta.review_status}.text`)
              }}<br/>
            </td>
          </template>

          <!--            <template v-slot:item.meta.text_status="{ item }">-->
          <!--                <td style="display: none"></td>-->
          <!--            </template>-->
          <!--            <template v-slot:item.meta.review_status="{ item }">-->
          <!--                <td style="display: none"></td>-->
          <!--            </template>-->
          <!--            <template v-slot:item.dummy="{ item }">-->
          <!--                <td style="background-color: red; padding-left:
          0px !important; padding-right: 0px !important; "></td>-->
          <!--            </template>-->

          <template v-slot:item.icons="{ item }">
            <div class="d-flex">
              <div
                :style="`color:${
                  $config.multilingual.textstatus.status[item.meta.text_status].color
                }`"
              >
                <span
                  :class="$config.multilingual.textstatus.status[item.meta.text_status].fa_icon"
                ></span>
                &nbsp;
              </div>
              <div
                :style="`color:${
                  $config.multilingual.reviewstatus.status[item.meta.review_status].color
                }`"
              >
                <span
                  :class="$config.multilingual.reviewstatus.status[item.meta.review_status].fa_icon"
                ></span>
                &nbsp;
              </div>
              <div>
                <button class="fal fa-eye" @click="preview(item.meta.id)"></button>
              </div>
            </div>
          </template>
        </v-data-table>
      </div>
    </v-app>
  </div>
</template>

<script>
import BaseList from '@components/vendor/mexion/multilingual-admin/base/BaseList.vue';
import ListReviewStatusComponent
  from '@components/vendor/mexion/multilingual-admin/base/ListReviewStatusComponent.vue';
import ListTextStatusComponent
  from '@components/vendor/mexion/multilingual-admin/base/ListTextStatusComponent.vue';
import ListSearchComponent
  from '@components/vendor/mexion/multilingual-admin/base/ListSearchComponent.vue';

export default {
  extends: BaseList,

  components: {
    ListReviewStatusComponent,
    ListTextStatusComponent,
    ListSearchComponent,
  },

  methods: {
    preview(xid) {
      const url = this.route('admin.multilingual.mailtemplates.preview', [xid, this.state.toLang]);
      window.open(url, '_blank');
    },

    setHeadersNonBase() {
      this.headers = [
        {
          text: this.$t('multilingual-admin.label.subject'),
          value: 'fields.subject.currentBase',
        },
        {
          text: '',
          value: 'icons',
          filterable: false,
          sortable: false,
        },
        // {text: $t('multilingual-admin.shared.actions'), value: 'actions', sortable: false },
        {
          text: 'd',
          value: 'dummy',
          class: 'hidden',
          width: '1px',
          align: ' d-none',
        } /* add dummy column to be able to additional default filtering on status */,
      ];
    },

    setHeadersBaseLanguage() {
      this.headers = [
        {
          text: this.$t('multilingual-admin.label.subject'),
          value: 'fields.subject.currentTranslated',
        },
        {
          text: '',
          value: 'icons',
          filterable: false,
          sortable: false,
        },
        // {text: $t('multilingual-admin.shared.actions'), value: 'actions', sortable: false },
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
