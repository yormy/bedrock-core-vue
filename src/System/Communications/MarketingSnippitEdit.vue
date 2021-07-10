<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.marketingsnippit.edit.title')"></card-header>

      <ValidationObserver ref="form">
        <text-field
          v-model="form.data.title"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.marketingsnippit.field.title.hint')"
          :label="$t('bedrock-core.marketingsnippit.field.title.label')"
          fieldname="title"
        ></text-field>

        <text-area
          v-model="form.data.description"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.marketingsnippit.field.content.hint')"
          :label="$t('bedrock-core.marketingsnippit.field.content.label')"
          fieldname="description"
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
import CardHeader from "../../Pages/CardHeader.vue";
import CardFooter from "../../Pages/CardFooter.vue";

export default {
  components: {
    CardFooter,
    CardHeader
  },

  props: {
    model: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        data: {
          title: this.model.title,
          description: this.model.description,
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
        update: 'admin.system.communications.marketingsnippits.update',
        store: 'admin.system.communications.marketingsnippits.store'
      }

    };
  },

  methods: {
    getQueryParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      return Object.fromEntries(urlParams.entries());
    },

    back() {
      const params = this.getQueryParameters();
      if ("new" in params) {
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

      const url = this.getSaveUrl()
      this.$http
        .post(url, this.form.data)
        .then((success) => {
          this.form.messages.success = success.data.message;
          this.back();
        })
        .catch((error) => {
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
