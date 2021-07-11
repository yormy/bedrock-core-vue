<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.marketingpromo.edit.title')"></card-header>

      this IS PROMO:
      <ValidationObserver ref="form">

        {{ form.data.position }}
        <dropdown
          v-model="form.data.position"
          :api-errors="form.apiErrors"
          :items="options['positions']"
          :label="$t('bedrock-users.standby.field.reason.label')"
          fieldname="position"
        ></dropdown>


        <text-field
          v-model="form.data.title"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.marketingpromo.field.title.hint')"
          :label="$t('bedrock-core.marketingpromo.field.title.label')"
          fieldname="title"
        ></text-field>

        <text-field
          v-model="form.data.subtitle"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.marketingpromo.field.subtitle.hint')"
          :label="$t('bedrock-core.marketingpromo.field.subtitle.label')"
          fieldname="subtitle"
        ></text-field>

        <text-area
          v-model="form.data.content"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.marketingpromo.field.content.hint')"
          :label="$t('bedrock-core.marketingpromo.field.content.label')"
          fieldname="content"
        ></text-area>
      </ValidationObserver>

      <date-time-picker
        v-model="form.data.active_at"
        :api-errors="form.apiErrors"
        :current="form.data.active_at"
        :description="$t('bedrock-core.marketingpromo.field.active_at.hint')"
        :label="$t('bedrock-core.marketingpromo.field.active_at.label')"
        fieldname="active_at"
      />

      <date-time-picker
        v-model="form.data.expires_at"
        :api-errors="form.apiErrors"
        :current="form.data.expires_at"
        :description="$t('bedrock-core.marketingpromo.field.expires_at.hint')"
        :label="$t('bedrock-core.marketingpromo.field.expires_at.label')"
        fieldname="expires_at"/>

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


export default {
  components: {
    CardFooter,
    CardHeader,
    DateTimePicker
  },

  props: {
    model: {
      type: Object,
      required: true,
    },

    options: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        data: {
          position: this.model.position,
          title: this.model.title,
          subtitle: this.model.subtitle,
          content: this.model.content,
          active_at: this.model.active_at,
          expires_at: this.model.expires_at,
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
        update: 'admin.system.communications.marketingpromos.update',
        store: 'admin.system.communications.marketingpromos.store'
      }

    };
  },

  methods: {
    getQueryParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      return Object.fromEntries(urlParams.entries());
    },

    back() {
      return;
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
