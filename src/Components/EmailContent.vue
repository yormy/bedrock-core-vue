<template>
  <div>

    <text-field
      v-show="!isFullScreen()"
      v-model="form.data.subject"
      :api-errors="form.apiErrors"
      :hint="$t('bedrock-core.emailtemplate.field.subject.hint')"
      :label="$t('bedrock-core.emailtemplate.field.subject.label')"
      fieldname="subject"
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
              v-for="(placeholder, index) in form.placeholders"
              :key="index"
            >
              <chip class="ma-1" @click="insertPlaceholderAtCursor(placeholder)">
                <span>{{ placeholder }}</span>
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
            :content-html="$t('bedrock-core.emailtemplate.field.placeholders.info')"
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
        :class="htmlEditorClass"
        :name="$t('bedrock-core.emailtemplate.field.html.label')"
        :options="editorOption"
        @change="onEditorChange($event)"
      />
      <!--      @blur="onEditorBlur($event)"-->
      <!--      @focus="onEditorFocus($event)"-->
      <!--      @ready="onEditorReady($event)"-->

      <error-message v-if="form.apiErrors.errors && form.apiErrors.errors.html_template"
                     :message="form.apiErrors.errors.html_template[0]"></error-message>

      <v-checkbox

        v-show="!fullscreenText"
        v-model="autoSyncTxtWithHtml"
        :label="$t('bedrock-core.emailtemplate.edit.autosyncHtml.label')"
        class="mt-0"
        @change="clickedAutoSync"
      >
      </v-checkbox>
    </div>

    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-header>
          {{ $t('bedrock-core.emailtemplate.field.text.label') }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <div v-if="autoSyncTxtWithHtml">
            {{ $t('bedrock-core.emailtemplate.field.text.copied') }}
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
                :disabled="autoSyncTxtWithHtml"
                :hint="$t('bedrock-core.emailtemplate.field.text.hint')"
                :label="$t('bedrock-core.emailtemplate.field.text.label')"
                :rows="textRowsCurrent"
                fieldname="text_template"
                @change="formChanged()"
                @keydown.esc="clickPlainFullscreen()"
              ></text-area>
            </div>
          </div>

        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor';
import InfoIcon from "../Buttons/InfoIcon.vue";
import ErrorMessage from "../Alerts/ErrorMessage.vue";

const {htmlToText} = require('html-to-text');

export default {
  fullscreenHtml: false,
  fullscreenText: false,

  components: {
    ErrorMessage,
    quillEditor,
    InfoIcon
  },

  props: {
    form: {
      type: Object,
      required: true,
    },
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

  methods: {
    inputChanged() {
      this.$emit('update:inputData', this.form.data.html_template);
      this.$emit('updated');
    },

    clickHtmlFullscreen() {
      this.fullscreenHtml = !this.fullscreenHtml;
    },
    clickPlainFullscreen() {
      this.fullscreenText = !this.fullscreenText;
    },

    isFullScreen() {
      return this.fullscreenHtml || this.fullscreenText;
    },

    clickedAutoSync(event) {
      this.onEditorChange(event);
      this.$emit('update:autoSync', this.autoSyncTxtWithHtml);
    },


    formChanged() {
      this.$emit('changed');
      this.$emit('update:from', this.form);
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
  }
}

</script>

<style scoped>
::v-deep .ql-editor {
  min-height: 260px !important;
}

.quill-large {
  height: 550px;
}
</style>
