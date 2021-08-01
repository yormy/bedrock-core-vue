<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },

    settings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      infoDialog: false,
    };
  },

  methods: {
    flipChanged(field, data) {
      this.form.data[field] = data;
      this.formChanged();
    },

    save() {
      this.form.state.isSubmitting = true;
      this.form.state.isDirty = false;

      this.resetErrorState();

      this.$http
        .post(this.route(this.routes.save), this.form.data)
        .then((success) => {
          this.form.messages.success = success.data.message;
          this.form.state.savedSuccessful = true;
          this.$emit('saved');
        })
        .catch((error) => {
          this.form.messages.success = '';
          this.form.messages.error = error.response.data.message;
          this.form.apiErrors = error.response.data.data;
        })
        .finally(() => {
          this.form.state.isSubmitting = false;
        });
    },

    formChanged() {
      this.form.state.isDirty = true;
      this.resetErrorState();
    },

    resetErrorState() {
      this.form.apiErrors = {};
      this.form.state.savedSuccessful = false;
      this.clearMessages();
    },

    clearMessages() {
      this.form.messages = {
        success: '',
        error: '',
        warning: '',
      };
    },
  },
};
</script>
