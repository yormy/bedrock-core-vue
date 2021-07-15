<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.emailtemplate.edit.title', {template_name: form.data.name})"></card-header>

      <ValidationObserver ref="form">
        <div class="d-flex">
          <flip-switch
            v-model="form.data.to_admin_only"
            :label="$t('bedrock-core.emailtemplate.field.to_admin_only.label')"
            color="success"
            @changed="flipChanged('to_admin_only', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.mail_preventable"
            :label="$t('bedrock-core.emailtemplate.field.mail_preventable.label')"
            color="success"
            @changed="flipChanged('mail_preventable', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.sms_preventable"
            :label="$t('bedrock-core.emailtemplate.field.sms_preventable.label')"
            color="success"
            @changed="flipChanged('sms_preventable', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.is_hidden"
            :label="$t('bedrock-core.emailtemplate.field.is_hidden.label')"
            color="success"
            @changed="flipChanged('is_hidden', $event)"
          ></flip-switch>
        </div>

        <select-multiple-chips
          v-show="!isFullScreen()"
          v-model="form.data.for_roles"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.for_roles.hint')"
          :items="options.for_roles"
          :label="$t('bedrock-core.emailtemplate.field.for_roles.label')"
          fieldname="for_roles"
          @change="formChanged()"
        ></select-multiple-chips>

        <text-field
          v-show="!isFullScreen()"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.subject.hint')"
          :label="$t('bedrock-core.emailtemplate.field.subject.label')"
          fieldname="subject"
          v-model="form.data.subject"
          @change="formChanged()"
        ></text-field>

        <text-area
          v-show="!isFullScreen()"
          v-model="form.data.summary"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.summary.hint')"
          :label="$t('bedrock-core.emailtemplate.field.summary.label')"
          fieldname="summary"
          @change="formChanged()"
        ></text-area>

        <div class="d-flex justify-content-between">
          <div v-show="!fullscreenText">
            <span
              v-for="(placeholder, index) in JSON.parse(form.data.placeholders,)"
              :key="index"
            >
              <chip class="ma-1" @click="insertPlaceholderAtCursor(placeholder)">
                <span v-pre>{{</span>
                {{ placeholder }}
                <span v-pre>}}</span>
              </chip>
            </span>
          </div>
          <div v-show="!fullscreenText" class="float-right">
            <div class="d-flex">
              <button class="btn btn-link btn-xs" @click="clickHtmlFullscreen()">
                <div v-if="!fullscreenHtml">{{ $t('bedrock-core.emailtemplate.edit.esc_fullscreen') }}</div>
                <div v-else>{{ $t('bedrock-core.emailtemplate.edit.exit_fullscreen') }}</div>
              </button>
              <info-icon
                :content="$t('bedrock-core.emailtemplate.field.placeholders.info')"
                :title="$t('bedrock-core.emailtemplate.field.placeholders.label')"
              >
              </info-icon>
            </div>
          </div>


        </div>

        <div @keydown.esc="clickHtmlFullscreen()">
          <quill-editor
            v-show="!fullscreenText"
            ref="myQuillEditor"
            v-model="form.data.html_template"
            :name="$t('bedrock-core.emailtemplate.field.html_template.label')"
            :options="editorOption"
            :class="htmlEditorClass"
            @change="onEditorChange($event)"
          />
          <!--      @blur="onEditorBlur($event)"-->
          <!--      @focus="onEditorFocus($event)"-->
          <!--      @ready="onEditorReady($event)"-->
          <v-checkbox
            v-show="!fullscreenText"
            v-model="autoSyncTxtWithHtml"
            :label="$t('bedrock-core.emailtemplate.edit.autosyncHtml.label')"

            class="mt-0"
            @change="clickedAutoSync"
          >
          </v-checkbox>
        </div>

        <div v-show="!fullscreenHtml" class="d-flex-column">
          <div class="d-flex justify-content-between">
            <div>
              <!--              //-->
            </div>
            <div>
              <button class="btn btn-link btn-xs float-right" @click="clickPlainFullscreen()">
                <div v-if="!fullscreenText">{{ $t('bedrock-core.emailtemplate.edit.esc_fullscreen') }}</div>
                <div v-else>{{ $t('bedrock-core.emailtemplate.edit.exit_fullscreen') }}</div>
              </button>
            </div>
          </div>
          <div>
            <text-area
              v-show="!fullscreenHtml"
              v-model="form.data.text_template"
              :api-errors="form.apiErrors"
              :hint="$t('bedrock-core.emailtemplate.field.text_template.hint')"
              :label="$t('bedrock-core.emailtemplate.field.text_template.label')"
              fieldname="text_template"
              @keydown.esc="clickPlainFullscreen()"
              :rows="textRowsCurrent"
              @change="formChanged()"
            ></text-area>
          </div>
        </div>

        <text-area
          v-show="!isFullScreen()"
          v-model="form.data.note"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.note.hint')"
          :label="$t('bedrock-core.emailtemplate.field.note.label')"
          fieldname="text_template"
        ></text-area>

      </ValidationObserver>

      <card-footer>
        <template v-slot:buttons>
          <button :disabled="isDirty" class="btn btn-secondary" @click="previewEmail()">
            {{ $t('bedrock-core.emailtemplate.edit.preview') }}
            <div v-show="isDirty">{{ $t('bedrock-core.emailtemplate.edit.save_before_preview') }}</div>
          </button>

          <button-submit :is-loading="form.state.isSubmitting" @click="save">
            <slot name="button-content">
              <span>{{ $t('bedrock-core.general.save') }}</span>
            </slot>
          </button-submit>

        </template>
      </card-footer>

    </div>
  </v-card>
</template>

<script>
import CardHeader from "../../../Pages/CardHeader.vue";
import CardFooter from "../../../Pages/CardFooter.vue";
import DateTimePicker from "../../../Misc/DateTimePicker.vue";
import Edit from "../../../Crud/Edit.vue";
// import 'quill/dist/quill.core.css'; /* eslint-disable-line */
// import 'quill/dist/quill.snow.css'; /* eslint-disable-line */
// import 'quill/dist/quill.bubble.css'; /* eslint-disable-line */
import {quillEditor} from 'vue-quill-editor';
import InfoIcon from "../../../Buttons/InfoIcon.vue";

const {htmlToText} = require('html-to-text');

export default {
  extends: Edit,

  components: {
    InfoIcon,
    CardFooter,
    CardHeader,
    DateTimePicker,
    quillEditor,
  },

  data() {
    return {
      fullscreenHtml: false,
      fullscreenText: false,

      fieldHtml: {
        classFullscreen: 'quill-large',
        classNormal: '',
      },

      fieldText: {
        rowsFullscreen: 25,
        rowsNormal: 7,
      },

      form: {
        data: {
          name: this.model.name,
          subject: this.model.subject,
          summary: this.model.summary,
          text_template: this.model.text_template,
          html_template: this.model.html_template,
          placeholders: this.model.placeholders,
          note: this.model.note,

          mail_preventable: this.model.mail_preventable,
          slack_preventable: this.model.slack_preventable,
          sms_preventable: this.model.sms_preventable,
          is_hidden: this.model.is_hidden,

          for_roles: this.model.for_roles,
          to_admin_only: this.model.to_admin_only,
        },

        state: {
          isSubmitting: false,
        },

        messages: {
          success: '',
          warning: '',
          error: '',
        },

        apiErrors: {},
      },

      routes: {
        update: 'admin.system.communications.emailtemplates.update',
        store: 'admin.system.communications.emailtemplates.store',
        preview: 'admin.system.communications.emailtemplates.preview'
      },


      // editor
      editorOption: {
        // Some Quill options...
      },
      autoSyncTxtWithHtml: true,
    };
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },

    htmlEditorClass() {
      if (this.fullscreenHtml) {
        return this.fieldHtml.classFullscreen;
      }
      return this.fieldHtml.classNormal;
    },

    textRowsCurrent() {
      if (this.fullscreenText) {
        return this.fieldText.rowsFullscreen;
      }
      return this.fieldText.rowsNormal;
    }
  },

  mounted() {
    this.init();
  },


  methods: {
    formChanged() {
      this.isDirty = true
    },

    flipChanged(field, data) {
      this.form.data[field] = data;
      this.formChanged();
    },

    previewEmail() {
      window.open(this.route(this.routes.preview, this.model.xid));
    },

    isFullScreen() {
      return this.fullscreenHtml || this.fullscreenText;
    },

    clickHtmlFullscreen() {
      this.fullscreenHtml = !this.fullscreenHtml;
    },
    clickPlainFullscreen() {
      this.fullscreenText = !this.fullscreenText;
    },

    init() {
      this.translated = this.inputData;
    },

    clickedAutoSync(event) {
      this.onEditorChange(event);
      this.$emit('update:autoSync', this.autoSyncTxtWithHtml);
    },


    // HTML Editor Methods
    // onEditorBlur(quill) {
    //   //
    // },
    // onEditorFocus(quill) {
    //   //
    // },
    // onEditorReady(quill) {
    //   //
    // },
    insertAtCursor(text) {
      const selection = this.editor.getSelection(true);
      this.editor.insertText(selection.index, text)
    },

    insertPlaceholderAtCursor(placeholder) {
      const text = '{{' + placeholder + '}}';
      this.insertAtCursor(text);
    },

    onEditorChange({quill, html, text}) { /* eslint-disable-line */
      this.formChanged();
      if (this.autoSyncTxtWithHtml) {
        const plain = htmlToText(this.form.data.html_template, {
          wordwrap: 130,
          tags: {
            'h1': {options: {uppercase: false}},
          }
        });

        const fixedDoubleReturns = plain.replace(/\n\n/g, '\n');
        //
        // const truncateLength = 10;
        // let resultPlainText = fixedDoubleReturns.substr(0, truncateLength);
        // if (fixedDoubleReturns.length > truncateLength) {
        //   resultPlainText += '...';
        // }
        // console.log(plain);
        this.form.data.text_template = fixedDoubleReturns;
        //this.$emit('updatedPlainText', fixedDoubleReturns, resultPlainText);
      }
      this.inputChanged();
    },

    inputChanged() {
      this.$emit('update:inputData', this.form.data.html_template);
      this.$emit('updated');
    },

    utoa(data) {
      return btoa(unescape(encodeURIComponent(data)));
    },

    preProcessData(data) {
      // these fields might contain html, which would trigger the firewall
      // encode in js, and recode in request validation
      const encoded = {
        subject: this.utoa(data.subject),
        summary: this.utoa(data.summary),
        text_template: this.utoa(data.text_template),
        html_template: this.utoa(data.html_template),
      };

      return {...this.form.data, ...encoded};
    },
  },
};
</script>
<style scoped>
::v-deep .ql-editor {
  min-height: 260px !important;
}

.quill-large {
  height: 550px;
}
</style>
