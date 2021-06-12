<template>
  <div>
    <div class="d-flex">
      <button :class="disabledClass" :disabled="isLoading" class="btn btn-primary" @click="update">
        <span v-if="isLoading" class="fa fa-spinner fa-spin"></span>
        <span v-if="buttonIcon" :class="buttonIcon"></span>
        {{ buttonTextDefault }}
      </button>
      <div v-if="'' !== errorMessage" class="text-danger">&nbsp;{{ errorMessage }}</div>
      <div v-if="'' !== successMessage" class="text-success">&nbsp;{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      disabledClass: '',
      isLoading: false,
      errorMessage: '',
      successMessage: '',
    };
  },

  props: {
    buttonTextDefault: {
      type: String,
      required: true,
    },
    buttonIcon: {
      type: String,
    },
    successRedirect: {
      type: String,
    },
    url: {
      type: String,
      required: true,
    },
    csrf: {
      type: String,
      required: true,
    },
  },

  methods: {
    update() {
      this.makeAjaxCall(this);
    },

    SetLoading() {
      this.disabledClass = 'disabled';
      this.isLoading = true;
    },

    UnsetLoading() {
      this.disabledClass = '';
      this.isLoading = false;
    },

    handleError(errorMessage) {
      this.errorMessage = errorMessage;
      this.UnsetLoading();
    },

    handleSuccess() {
      if (this.successRedirect) {
        window.location.replace(this.successRedirect);
      } else {
        this.successMessage = 'ok';
        this.UnsetLoading();
      }
    },

    makeAjaxCall() {
      this.SetLoading();
      this.errorMessage = '';
      this.successMessage = '';

      const formData = new FormData();
      formData.set('_token', this.csrf);

      this.$http
        .post(this.url, formData)
        .then((success) => {
          const obj = success.data;

          if (obj.success === false) {
            this.handleError(obj.message);
          } else {
            this.handleSuccess();
          }
        })
        .catch(() => {
          this.handleError('error');
        });
    },
  },
};
</script>

<style scoped></style>
