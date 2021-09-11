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

    cancel() {
      const params = this.getQueryParameters();
      if ("new" in params) {
        this.form.state.isSubmitting = false;
        window.close();
      }
      window.history.back();
    },

    back() {
      const params = this.getQueryParameters();
      if ("new" in params) {
        this.form.state.isSubmitting = false;
        this.RefreshParent();
        window.close();
      }
      //window.location.href = (this.route(this.routes.index));
      window.location.href = this.redirectAfterUpdate();
    },

    RefreshParent() {
      if (window.opener != null && !window.opener.closed) {
        window.opener.location.reload();
      }
    },

    preProcessData(data) {
      return data;
    },

    // override in child to pass additional parameters
    addItemRouteParameters() {
      return this.model.xid;
    },

    getSaveUrl() {
      if (this.model.xid) {
        return this.route(this.routes.update, this.addItemRouteParameters());
      }
      return this.route(this.routes.store, this.addItemRouteParameters());
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

    // refactor so that function use eithee the POST or PUT method
    update() {
      if (!this.isFormValid()) {
        return;
      }

      this.form.state.isSubmitting = true;
      this.clearResponses();

      const postData = this.preProcessData(this.form.data)

      const url = this.route(this.routes.update, this.addItemRouteParameters());

      this.$http
        .put(url, postData)
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

    deleteAgreedModel() {
      const url = this.route(this.routes.destroy, this.addItemRouteParameters());

      this.$http
        .delete(url)
        .then((success) => {
          this.form.messages.success = success.data.message;
          this.$inertia.get(this.redirectAfterDelete());
        })
        .catch((error) => {
          this.form.apiErrors = error.response.data.data;
          this.form.messages.error = error.response.data.message;
          this.form.state.isSubmitting = false;
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
