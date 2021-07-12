<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.emailtemplate.edit.title', {template_name: form.data.name})"></card-header>


      <ValidationObserver ref="form">

        <text-field
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.subject.hint')"
          :label="$t('bedrock-core.emailtemplate.field.subject.label')"
          fieldname="subject"
          v-model="form.data.subject"
        ></text-field>

        <text-area
          v-model="form.data.summary"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.summary.hint')"
          :label="$t('bedrock-core.emailtemplate.field.summary.label')"
          fieldname="summary"
        ></text-area>

        <!--        <text-area-->
        <!--          :api-errors="form.apiErrors"-->
        <!--          :hint="$t('bedrock-core.emailtemplate.field.html_template.hint')"-->
        <!--          :label="$t('bedrock-core.emailtemplate.field.html_template.label')"-->
        <!--          fieldname="html_template"-->
        <!--          v-model="form.data.html_template"-->
        <!--        ></text-area>-->

        <quill-editor
          ref="myQuillEditor"
          v-model="form.data.html_template"
          :name="$t('bedrock-core.emailtemplate.field.html_template.label')"
          :options="editorOption"
          @change="onEditorChange($event)"
        />
        <!--      @blur="onEditorBlur($event)"-->
        <!--      @focus="onEditorFocus($event)"-->
        <!--      @ready="onEditorReady($event)"-->
        <v-checkbox
          v-model="autoSyncTxtWithHtml"
          :label="$t('multilingual-admin.autoSyncHtmlTxt')"
          class="mt-0"
          @change="clickedAutoSync"
        >
        </v-checkbox>

        <text-area
          v-model="form.data.text_template"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.text_template.hint')"
          :label="$t('bedrock-core.emailtemplate.field.text_template.label')"
          fieldname="text_template"
        ></text-area>

        <text-area
          v-model="form.data.note"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.note.hint')"
          :label="$t('bedrock-core.emailtemplate.field.note.label')"
          fieldname="text_template"
        ></text-area>

      </ValidationObserver>

      <card-footer>
        <template v-slot:buttons>
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

const {htmlToText} = require('html-to-text');

export default {
  extends: Edit,

  components: {
    CardFooter,
    CardHeader,
    DateTimePicker,
    quillEditor,
  },

  data() {
    return {
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

          roles: this.model.roles,
          for_admin_only: this.model.for_admin_only,
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
        store: 'admin.system.communications.emailtemplates.store'
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
  },

  mounted() {
    this.init();
  },


  methods: {


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


    onEditorChange({quill, html, text}) { /* eslint-disable-line */
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
      return {
        subject: this.utoa(data.subject),
        summary: this.utoa(data.summary),
        text_template: this.utoa(data.text_template),
        html_template: this.utoa(data.html_template),
      };
    },
  },
};
</script>
<style scoped>
::v-deep .ql-editor {
  min-height: 260px !important;
}
</style>
