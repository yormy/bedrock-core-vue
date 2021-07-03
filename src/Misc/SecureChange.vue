<script>
import CodeInput from './CodeInput.vue';

export default {
  components: {
    CodeInput,
  },

  props: {
    changeActionUrl: String,

    authenticatorEnabled: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      confirmCode: '',
      confirmCodeInvalid: false,

      formConfirmCode: {
        isSubmitting: false,

        messages: {
          success: '',
          warning: '',
          error: '',
        },
      },

      expiredMessage: '',

      confirmableAction: {
        xid: '',
        method: '',
        title: '',
        description: '',
      },

      passwordExpose: false,

      successMessage: '',

      emailWarning: {},

      backendhint: '',

      skipWarnings: false,

      passwordConfirmExpose: false,
    };
  },

  mounted() {
  },

  methods: {
    onCodeChange() {
      this.confirmCode = null;
    },

    onCodeComplete(value) {
      this.confirmCodeInvalid = false;
      this.confirmCode = value;
    },

    onCodeEnter() {
      this.submitChangeRequest();
    },

    isFormValid() {
      if (this.authenticatorEnabled && (!this.confirmCode || this.confirmCodeInvalid)) {
        return false;
      }

      if (!this.isInputValid()) {
        return false;
      }

      this.$refs.form.validate();
      return !this.$refs.form.flags.invalid;
    },

    submitChangeRequest() {
      if (!this.isFormValid()) {
        return;
      }

      this.form.state.isSubmitting = true;

      const data = this.getData();

      this.clearResponses();
      this.$http
        .post(this.changeActionUrl, data)
        .then((success) => {
          this.formConfirmCode.messages.success = success.data.message;
          this.confirmableAction.xid = success.data.data.xid;
          this.confirmableAction.method = success.data.data.method;
          this.confirmableAction.title = success.data.data.title;
          this.confirmableAction.description = success.data.data.description;
        })
        .catch((error) => {
          this.clearInput();
          this.form.apiErrors = error.response.data.data;

          if (error.response.data.data && error.response.data.data.warnings) {
            this.formConfirmCode.messages.error = error.response.data.data.warnings;
            this.backendhint = this.emailWarning.email.message;
            this.$refs.emailInput.focus();
            this.skipWarnings = true;
          }

          if (error.response.data.code) {
            if (error.response.data.code === 'AUTHENTICATOR_CODE_MISSING') {
              this.resetLoadingState();
              return;
            }
            if (this.form.apiErrors.errors && this.form.apiErrors.errors.authenticatorCode) {
              this.resetLoadingState();
              return;
            }
          }
          this.resetLoadingState();
        })
        .finally(() => {
          this.resetLoadingState();
        });
    },

    cancel() {
      this.$emit('cancelled');
    },

    clearResponses() {
      this.form.apiErrors = {};
      this.formConfirmCode.messages.success = '';
      this.formConfirmCode.messages.error = '';
    },

    clearInput() {
      if (this.$refs.codeInputComponent !== undefined) {
        this.$refs.codeInputComponent.clear();
      }
    },

    resetLoadingState() {
      this.form.state.isSubmitting = false;
    },
  },
};
</script>
