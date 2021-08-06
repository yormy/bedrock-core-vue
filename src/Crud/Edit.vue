<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },

    options: {
      type: Object,
      required: false,
    },
  },

  data() {
    return {
      isDirty: false,
    }
  },

  methods: {
    getQueryParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      return Object.fromEntries(urlParams.entries());
    },

    back() {
      const params = this.getQueryParameters();
      if ("new" in params) {
        this.form.state.isSubmitting = false;
        this.RefreshParent();
        window.close();
      }

      window.history.back();
    },

    RefreshParent() {
      if (window.opener != null && !window.opener.closed) {
        window.opener.location.reload();
      }
    },

    preProcessData(data) {
      return data;
    },

    getSaveUrl() {
      if (this.model.xid) {
        return this.route(this.routes.update, this.model.xid);
      }
      return this.route(this.routes.store);
    },

    isFormValid() {
      this.$refs.form.validate();
      return !this.$refs.form.flags.invalid;
    },

    save() {
      if (!this.isFormValid()) {
        return;
      }

      this.form.state.isSubmitting = true;
      this.clearResponses();

      const postData = this.preProcessData(this.form.data)

      const url = this.getSaveUrl()
      this.$http
          .post(url, postData)
          .then((success) => {
            this.form.messages.success = success.data.message;
            this.isDirty = false;
            this.$emit('saved');
            this.back();
          })
          .catch((error) => {
            console.log(error);
            this.form.messages.error = error.response.data.message;
            this.form.apiErrors = error.response.data.data;
            this.resetLoadingState();
          })
        .finally(() => {
        });

    },

    clearResponses() {
      this.form.apiErrors = {};
      this.form.messages.success = '';
      this.form.messages.error = '';
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
