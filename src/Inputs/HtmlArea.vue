<template>
  <div>
    <quill-editor
      ref="myQuillEditor"
      v-bind="$attrs"
      v-on="$listeners"
      :options="editorOption"
      :value="value"
      @keydown="clearApiError()"
    >
    </quill-editor>


    <!--      v-model="form.data.html_template"-->
    <!--      -->
    <!--      :name="$t('bedrock-core.emailtemplate.field.html.label')"-->

    <!--      @blur="onEditorBlur($event)"-->
    <!--      @focus="onEditorFocus($event)"-->
    <!--      @ready="onEditorReady($event)"-->

    <error-message :message="apiError"></error-message>
  </div>
</template>

<script>
import {quillEditor} from 'vue-quill-editor';
import InfoIcon from "../Buttons/InfoIcon.vue";
import ErrorMessage from "../Alerts/ErrorMessage.vue";

export default {
  components: {
    ErrorMessage,
    quillEditor,
    InfoIcon
  },

  inheritAttrs: false,
  props: {
    value: {
      required: false,
    },

    fieldname: {
      type: String,
      required: false,
    },

    apiErrors: {
      type: Object,
      required: false,
    },

    validationRules: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      // editor
      editorOption: {
        // Some Quill options...
      },
    };
  },

  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },

    apiError() {
      if (!this.apiErrors || !this.apiErrors.errors) {
        return '';
      }

      const fieldErrors = this.apiErrors.errors[this.fieldname];
      if (!Array.isArray(fieldErrors)) {
        return fieldErrors;
      }
      return fieldErrors[0]
    },
  },

  methods: {
    inputChanged() {
      this.$emit('update:inputData', this.form.data.html_template);
      this.$emit('updated');
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
    clearApiError() {
      if (this.apiErrors && this.apiErrors.errors) {
        // eslint-disable-next-line vue/no-mutating-props
        this.apiErrors.errors[this.fieldname] = '';
      }
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
