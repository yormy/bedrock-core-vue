<template>
  <div>
    <v-app>
      <div v-if="!state.selectedItem">select an item on the left33</div>

      <transition name="fade">
        <div v-if="show">
          <div v-if="state.selectedItem">
            <loading-overlay :show="isLoading"></loading-overlay>
            <v-card>
              <div v-if="!isAddItem()">
                <v-card-title>
                  <v-row>
                    <v-col>
                      {{ state.selectedItem.meta.id }} :
                      {{ state.selectedItem.fields.subject.currentTranslated }}
                    </v-col>
                    <v-col :align="'end'">
                      <into-locale-switcher :route-key="'admin.multilingual.mailtemplates.index'">
                      </into-locale-switcher>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-card-subtitle> ...TAGS...[show, add]</v-card-subtitle>
              </div>
              <div v-else>
                <v-card-title> NEW</v-card-title>
              </div>

              <v-card-text>
                <edit-header-component :meta="state.selectedItem.meta"></edit-header-component>
                <div class="row">
                  <div class="col-md-12 pb-0">
                    <a href="#"><span class="fal fa-eye" @click="showPreview()"></span></a>
                    <edit-input-component
                      :api-errors="validationErrors.subject"
                      :input-data.sync="state.selectedItem.fields.subject.currentTranslated"
                      :input-label="$t('multilingual-admin.label.subject')"
                      :suggestion-allowed="suggestionAllowed()"
                      field="subject"
                      @updated="updated()"
                    >
                    </edit-input-component>
                  </div>
                </div>

                <span
                  v-for="(placeholder, index) in JSON.parse(
                    state.selectedItem.staticFields.placeholders,
                  )"
                  :key="index"
                >
                  <v-chip class="ma-1" color="primary" outlined pill>
                    <span v-pre>{{</span>
                    {{ placeholder }}
                    <span v-pre>}}</span>
                  </v-chip>
                </span>

                <div class="row">
                  <div class="col-md-12 pb-0">
                    <h1>{{ $t('misc.user.notify.message.html_message') }}</h1>
                    {{ $t('misc.email_compose.token_tips') }}

                    <edit-input-component
                      :api-errors="validationErrors.html_template"
                      :auto-sync.sync="autoSync"
                      :input-data.sync="state.selectedItem.fields.html_template.currentTranslated"
                      :input-label="$t('multilingual-admin.label.text')"
                      :suggestion-allowed="suggestionAllowed()"
                      field="html_template"
                      input-type="HTML"
                      @updated="updated()"
                      @updatedPlainText="updatedPlainText"
                    >
                    </edit-input-component>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 pb-0">
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          {{ $t('misc.user.notify.message.text_message') }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <edit-input-component
                            :api-errors="validationErrors.text_template"
                            :input-data.sync="
                              state.selectedItem.fields.text_template.currentTranslated
                            "
                            :input-label="$t('multilingual-admin.label.text')"
                            :readonly="autoSync"
                            :suggestion-allowed="suggestionAllowed()"
                            field="text_template"
                            input-type="TEXTAREA"
                            @updated="updated()"
                          >
                          </edit-input-component>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-12 pb-0">
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          {{ $t('misc.user.notify.message.summary') }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <edit-input-component
                            :api-errors="validationErrors.summary"
                            :input-data.sync="state.selectedItem.fields.summary.currentTranslated"
                            :input-label="$t('multilingual-admin.label.text')"
                            :readonly="autoSync"
                            :suggestion-allowed="suggestionAllowed()"
                            field="summary"
                            input-type="TEXTAREA"
                            @updated="updated()"
                          >
                          </edit-input-component>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                </div>

                <div class="form-group">
                  <edit-reviewer-component :review-status.sync="review_status" @updated="updated()">
                  </edit-reviewer-component>
                </div>

                <div class="row">
                  <div class="col-md-12 pb-0">
                    <v-expansion-panels>
                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          {{ $t('misc.internal_note') }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <v-textarea
                            v-model="state.selectedItem.staticFields.note"
                            :error-messages="validationErrors.note"
                            :label="$t('misc.internal_note')"
                            :name="$t('misc.internal_note')"
                            auto-grow
                            filled
                            rows="2"
                            @keyup="updated()"
                          >
                          </v-textarea>
                        </v-expansion-panel-content>
                      </v-expansion-panel>
                    </v-expansion-panels>
                  </div>
                </div>

                <div class="form-actions">
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <button-delete
                        v-if="deleteAllowed() && !isAddItem()"
                        :item="state.selectedItem"
                        :show-text="false"
                        @deleteItem="deleteAgreed"
                      >
                        <template v-slot:delete-preview>
                          <!-- {{ state.selectedItem.fields.subject.currentTranslated }}-->
                        </template>
                      </button-delete>

                      <div v-if="isAddItem()">
                        <button-submit
                          id="btnAdd"
                          :disabled="!hasChanged"
                          :is-loading="isLoading"
                          @clicked="addAction"
                        >
                          {{ $t('misc.add') }}
                        </button-submit>
                      </div>
                      <div v-else>
                        <button-submit
                          id="btnUpdate"
                          :disabled="!hasChanged"
                          :is-loading="isLoading"
                          @clicked="updateAction"
                        >
                          {{ $t('misc.update-and-next') }}
                        </button-submit>
                      </div>
                    </div>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </transition>
    </v-app>
  </div>
</template>

<script>
import BaseEdit from '@components/vendor/mexion/multilingual-admin/base/BaseEdit.vue';
import store from '../store';

export default {
  extends: BaseEdit,

  props: {
    previewRoute: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      translatables: ['subject', 'text_template', 'html_template', 'summary'],
      statics: ['note'],
      autoSync: true,
    };
  },

  methods: {
    showPreview() {
      const previewUrl = store.createUrl(this.route(this.previewRoute, ['__ID__', '__I18N__']));
      window.open(previewUrl, '_blank');
    },

    updatedPlainText(plainText, summary) {
      if (this.hasChanged) {
        this.state.selectedItem.fields.text_template.currentTranslated = plainText;
        this.state.selectedItem.fields.summary.currentTranslated = summary;
      }
    },

    addAction() {
      const fields = {
        subject: this.state.selectedItem.fields.subject.currentTranslated,
        text_template: this.state.selectedItem.fields.text_template.currentTranslated,
        html_template: this.state.selectedItem.fields.html_template.currentTranslated,
        summary: this.state.selectedItem.fields.summary.currentTranslated,
        note: this.state.selectedItem.staticFields.note,
      };
      this.doAddCall(fields);
    },

    updateAction() {
      const fields = {
        subject: this.state.selectedItem.fields.subject.currentTranslated,
        text_template: this.state.selectedItem.fields.text_template.currentTranslated,
        html_template: this.state.selectedItem.fields.html_template.currentTranslated,
        summary: this.state.selectedItem.fields.summary.currentTranslated,
        note: this.state.selectedItem.staticFields.note,
      };
      this.doUpdateCall(fields);
    },

    deleteAgreed() {
      this.doDeleteCall(this.state.selectedItem);
    },
  },
};
</script>
