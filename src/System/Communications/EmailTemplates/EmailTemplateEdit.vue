<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.emailtemplate.edit.title')"></card-header>

      this IS emailtemplate:
      <ValidationObserver ref="form">

        <text-field
          v-model="form.data.subject"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.subject.hint')"
          :label="$t('bedrock-core.emailtemplate.field.subject.label')"
          fieldname="subject"
        ></text-field>
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
import CardHeader from "../../../Pages/CardHeader.vue";
import CardFooter from "../../../Pages/CardFooter.vue";
import DateTimePicker from "../../../Misc/DateTimePicker.vue";
import Edit from "../../../Crud/Edit.vue";

export default {
  extends: Edit,

  components: {
    CardFooter,
    CardHeader,
    DateTimePicker
  },

  data() {
    return {
      form: {
        data: {
          name: this.model.name,
          subject: this.model.subject,
          summary: this.model.summary,
          text_template: this.model.text_template,
          html_template: this.model.html_template,
          placeholders: this.model.placeholders,
          note: this.model.note,

          mail_preventable: this.model.mail_preventable,
          slack_preventable: this.model.slack_preventable,
          sms_preventable: this.model.sms_preventable,
          is_hidden: this.model.is_hidden,

          roles: this.model.roles,
          for_admin_only: this.model.for_admin_only,
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
        update: 'admin.system.communications.emailtemplates.update',
        store: 'admin.system.communications.emailtemplates.store'
      }

    };
  },

  methods: {
    utoa(data) {
      return btoa(unescape(encodeURIComponent(data)));
    },

    preProcessData(data) {
      // these fields might contain html, which would trigger the firewall
      // encode in js, and recode in request validation
      return {
        subject: this.utoa(data.subject),
        summary: this.utoa(data.summary),
        text_template: this.utoa(data.text_template),
        html_template: this.utoa(data.html_template),
      };
    },
  },
};
</script>
