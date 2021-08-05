<template>
  <div>
    <edit-history-component v-if="historyNeeded()" :field="field"></edit-history-component>

    <slot name="header"></slot>
    <div v-if="isInput">
      <ValidationProvider v-slot="{ errors }" :name="inputName" :rules="validationRules">
        <v-text-field
          :id="inputId"
          v-model="translated"
          :append-icon="suggestionAllowed ? 'fal fa-info-circle' : ''"
          :color="!apiErrors && translated ? 'success' : ''"
          :error-messages="apiErrors ? apiErrors : errors"
          :label="inputLabel"
          :name="inputName"
          :readonly="readonly"
          hide-details="auto"
          @keyup="inputChanged()"
          @click:append="getSuggestion"
        >
        </v-text-field>
      </ValidationProvider>
    </div>

    <div v-if="isTextArea">
      <v-textarea
        :id="inputId"
        v-model="translated"
        :append-icon="suggestionAllowed ? 'fal fa-info-circle' : ''"
        :error-messages="apiErrors"
        :label="inputLabel"
        :name="inputName"
        :readonly="readonly"
        auto-grow
        filled
        @keyup="inputChanged()"
        @click:append="getSuggestion"
      ></v-textarea>
    </div>

    <div v-if="isHtml">
      <span v-if="suggestionAllowed">
        <a href="#"><span class="fal fa-info-circle" @click="getSuggestion"></span></a>
      </span>
      <quill-editor
        :id="inputId"
        ref="myQuillEditor"
        v-model="translated"
        :name="inputName"
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
    </div>
  </div>
</template>

<script>
import EventBus from '@components/event-bus';
import 'quill/dist/quill.core.css'; /* eslint-disable-line */
import 'quill/dist/quill.snow.css'; /* eslint-disable-line */
import 'quill/dist/quill.bubble.css'; /* eslint-disable-line */
import {quillEditor} from 'vue-quill-editor';
import store from '../store';
import EditHistoryComponent from './EditHistoryComponent.vue';

const htmlToText = require('html-to-text');

export default {
  components: {
    EditHistoryComponent,
    quillEditor,
  },

  props: {
    field: {
      type: String,
      required: true,
    },

    inputName: {
      type: String,
      required: false,
    },

    inputId: {
      type: String,
      required: false,
    },

    inputType: {
      type: String,
      default: 'INPUT',
    },

    inputData: {
      type: String,
      required: true,
    },

    inputLabel: {
      type: String,
      required: true,
    },

    apiErrors: {
      type: Array,
    },

    suggestionAllowed: {
      type: Boolean,
    },

    autoSync: {
      type: Boolean,
    },

    readonly: {
      type: Boolean,
    },

    validationRules: {
      type: String,
    },
  },

  data() {
    return {
      translated: '',
      state: store.state,

      editorOption: {
        // Some Quill options...
      },
      autoSyncTxtWithHtml: this.autoSync,
    };
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },

    isInput() {
      return this.inputType === 'INPUT';
    },

    isTextArea() {
      return this.inputType === 'TEXTAREA';
    },
    isHtml() {
      return this.inputType === 'HTML';
    },
  },

  mounted() {
    this.init();
  },

  watch: {
    meta() {
      this.init();
    },

    inputData() {
      this.translated = this.inputData;
    },
  },

  methods: {
    clickedAutoSync(event) {
      this.onEditorChange(event);
      this.$emit('update:autoSync', this.autoSyncTxtWithHtml);
    },

    historyNeeded() {
      return this.state.selectedItem.meta.langBase !== this.state.selectedItem.meta.langTranslation;
    },

    init() {
      this.translated = this.inputData;
    },

    inputChanged() {
      this.$emit('update:inputData', this.translated);
      this.$emit('updated');
    },

    getSuggestion() {
      if (this.suggestionAllowed) {
        this.state.suggestion.field = this.field;
        EventBus.$emit('multilingual-suggestion-requested');
      }
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
        const plain = htmlToText.fromString(this.translated, {
          wordwrap: 130,
          format: {
            // lineBreak(elem, fn, options) {
            //   const h = fn(elem.children, options);
            //   return '\r';
            // },
            anchor(elem, fn, options) {
              const h = fn(elem.children, options);
              const {href} = elem.attribs;
              const clickable = `<a href="${href}">${h}</a>`;
              return clickable;
              // return ` ${h} [${href}]`;
            },
          },
        });
        const fixedDoubleReturns = plain.replace(/\n\n/g, '\n');

        const truncateLength = 10;
        let resultPlainText = fixedDoubleReturns.substr(0, truncateLength);
        if (fixedDoubleReturns.length > truncateLength) {
          resultPlainText += '...';
        }

        this.$emit('updatedPlainText', fixedDoubleReturns, resultPlainText);
      }
      this.inputChanged();
    },
  },
};
</script>

<style>
ins {
  background: lightgreen;
  text-decoration: none;
}

del {
  background: pink;
}
</style>

<style scoped>
::v-deep .ql-editor {
  min-height: 260px !important;
}
</style>
