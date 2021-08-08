<template>
  <v-card>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="m-3">
      <card-header :title="$t('bedrock-core.emailtemplate.edit.title', {template_name: form.data.name})"></card-header>

      <messages :messages="form.messages"></messages>

      <ValidationObserver ref="form">
        <div class="d-flex">
          <flip-switch
            v-model="form.data.to_admin_only"
            :label="$t('bedrock-core.emailtemplate.field.to_admin_only.label')"
            color="success"
            @changed="flipChanged('to_admin_only', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.mail_preventable"
            :label="$t('bedrock-core.emailtemplate.field.mail_preventable.label')"
            color="success"
            @changed="flipChanged('mail_preventable', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.sms_preventable"
            :label="$t('bedrock-core.emailtemplate.field.sms_preventable.label')"
            color="success"
            @changed="flipChanged('sms_preventable', $event)"
          ></flip-switch>
          <flip-switch
            v-model="form.data.is_hidden"
            :label="$t('bedrock-core.emailtemplate.field.is_hidden.label')"
            color="success"
            @changed="flipChanged('is_hidden', $event)"
          ></flip-switch>
        </div>

        <select-multiple-chips
          v-show="!isFullScreen()"
          v-model="form.data.for_roles"
          :api-errors="form.apiErrors"
          :hint="$t('bedrock-core.emailtemplate.field.for_roles.hint')"
          :items="options.for_roles"
          :label="$t('bedrock-core.emailtemplate.field.for_roles.label')"
          fieldname="for_roles"
          @change="formChanged()"
        ></select-multiple-chips>

        <email-content
          :form.sync="form"
          :placeholders="form.placeholders"
          @changed="formChanged()"
        >
        </email-content>

        <v-expansion-panels v-show="!isFullScreen()">
          <v-expansion-panel>
            <v-expansion-panel-header>
              {{ $t('bedrock-core.emailtemplate.field.note.label') }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div>
                <text-area
                  v-model="form.data.note"
                  :api-errors="form.apiErrors"
                  :hint="$t('bedrock-core.emailtemplate.field.note.hint')"
                  :label="$t('bedrock-core.emailtemplate.field.note.label')"
                  fieldname="text_template"
                ></text-area>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </ValidationObserver>

      <card-footer>
        <template v-slot:buttons>
          <button :disabled="isDirty" class="btn btn-secondary" @click="previewEmail()">
            {{ $t('bedrock-core.emailtemplate.edit.preview') }}
            <div v-show="isDirty">{{ $t('bedrock-core.emailtemplate.edit.save_before_preview') }}</div>
          </button>

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
import CardHeader from '../../../PageDesign/CardHeader.vue';
import CardFooter from '../../../PageDesign/CardFooter.vue';
import Edit from '../../../Crud/Edit.vue';
import EmailContent from '../../../Components/EmailContent.vue';

export default {
  extends: Edit,

  components: {
    CardFooter,
    CardHeader,
    EmailContent,
  },

  data() {
    return {
      form: {
        placeholders: this.model.placeholders,

        data: {
          name: this.model.name,
          subject: this.model.subject,
          summary: this.model.summary,
          text_template: this.model.text_template,
          html_template: this.model.html_template,
          note: this.model.note,

          mail_preventable: this.model.mail_preventable,
          slack_preventable: this.model.slack_preventable,
          sms_preventable: this.model.sms_preventable,
          is_hidden: this.model.is_hidden,

          for_roles: this.model.for_roles,
          to_admin_only: this.model.to_admin_only,
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
        store: 'admin.system.communications.emailtemplates.store',
        preview: 'admin.system.communications.emailtemplates.preview'
      },
    };
  },

  methods: {
    formChanged() {
      this.isDirty = true
    },

    isFullScreen() {
      return false;
    },

    flipChanged(field, data) {
      this.form.data[field] = data;
      this.formChanged();
    },

    previewEmail() {
      window.open(this.route(this.routes.preview, this.model.xid));
    },

    utoa(data) {
      return btoa(unescape(encodeURIComponent(data)));
    },

    preProcessData(data) {
      // these fields might contain html, which would trigger the firewall
      // encode in js, and recode in request validation
      const encoded = {
        subject: this.utoa(data.subject),
        summary: this.utoa(data.summary),
        text_template: this.utoa(data.text_template),
        html_template: this.utoa(data.html_template),
      };

      return {...data, ...encoded};
    },
  },
};
</script>
