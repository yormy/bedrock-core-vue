<template>
  <div>
    <div class="row">
      <div class="col-3">
        <mail-template-list></mail-template-list>
      </div>

      <div class="col-6">
        <mail-template-edit
          add-route="api.v1.admin.multilingual.mailtemplates.store"
          delete-route="api.v1.admin.multilingual.mailtemplates.destroy"
          preview-route="admin.multilingual.mailtemplates.preview"
          update-route="api.v1.admin.multilingual.mailtemplates.update"
        >
        </mail-template-edit>
      </div>

      <div class="col-2">
        <v-card fixed style="position: fixed; top: 0; right: 0; border: solid red 2px">
          <v-card-title> tabs</v-card-title>
          <v-tabs>
            <v-tab v-if="isBaseLang" href="#suggestions">
              <v-icon>mdi-help</v-icon>
            </v-tab>
            <v-tab href="#history">
              <v-icon>mdi-history</v-icon>
            </v-tab>
            <v-tab href="#comments">
              <v-icon>mdi-chat-outline</v-icon>
            </v-tab>

            <v-tab-item v-if="isBaseLang" :value="'suggestions'">
              <edit-suggestion-component
                get-route="api.v1.admin.multilingual.mailtemplates.suggestions"
              >
              </edit-suggestion-component>
            </v-tab-item>

            <v-tab-item :value="'history'">
              <mail-template-history
                history-route="api.v1.admin.multilingual.mailtemplates.history"
              ></mail-template-history>
            </v-tab-item>

            <v-tab-item :value="'comments'">
              <edit-comments-component
                add-route="api.v1.admin.multilingual.mailtemplates.comments.add"
                index-route="api.v1.admin.multilingual.mailtemplates.comments.index"
              >
              </edit-comments-component>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIndex from '@components/vendor/mexion/multilingual-admin/base/BaseIndex.vue';
import EditSuggestionComponent
  from '@components/vendor/mexion/multilingual-admin/base/EditSuggestionComponent.vue';
import EditCommentsComponent
  from '@components/vendor/mexion/multilingual-admin/base/EditCommentsComponent.vue';

import MailTemplateList from './MailTemplateList.vue';
import MailTemplateEdit from './MailTemplateEdit.vue';
import MailTemplateHistory from './MailTemplateHistory.vue';

export default {
  extends: BaseIndex,

  components: {
    MailTemplateList,
    MailTemplateEdit,
    MailTemplateHistory,
    EditSuggestionComponent,
    EditCommentsComponent,
  },
};
</script>
