<template>
  <div>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="form-horizontal">
      <div class="form-group">
        <messages :messages="form.messages"></messages>
      </div>
    </div>

    <div class="card card-table">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <div>
              <text-field
                v-model="form.data.name"
                :api-errors="form.apiErrors"
                :description="$t('bedrock-core.settings.branding.site_title.description')"
                :hint="$t('bedrock-core.settings.branding.site_title.hint')"
                :label="$t('bedrock-core.settings.branding.site_title.label')"
                autocomplete=""
                fieldname="name"
                validation-rules="required"
                @keydown="formChanged()"
              >
              </text-field>

              <text-field
                v-model="form.data.abbreviation"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.settings.branding.abbreviation.hint')"
                :label="$t('bedrock-core.settings.branding.abbreviation.label')"
                fieldname="abbreviation"
                validation-rules="required"
                @keydown="formChanged()"
              >
              </text-field>

              <text-field
                v-model="form.data.description"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.settings.branding.description.hint')"
                :label="$t('bedrock-core.settings.branding.description.label')"
                fieldname="description"
                validation-rules=""
                @keydown="formChanged()"
              >
              </text-field>

              <text-field
                v-model="form.data.footer_copyright"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.settings.branding.footer_copyright.hint')"
                :label="$t('bedrock-core.settings.branding.footer_copyright.label')"
                fieldname="footer_copyright"
                validation-rules="required"
                @keydown="formChanged()"
              >
              </text-field>

              <text-field
                v-model="form.data.sms_prefix"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.settings.branding.sms_prefix.hint')"
                :label="$t('bedrock-core.settings.branding.sms_prefix.label')"
                fieldname="sms_prefix"
                validation-rules=""
                @keydown="formChanged()"
              >
              </text-field>

              <text-field
                v-model="form.data.sms_postfix"
                :api-errors="form.apiErrors"
                :hint="$t('bedrock-core.settings.branding.sms_postfix.hint')"
                :label="$t('bedrock-core.settings.branding.sms_postfix.label')"
                fieldname="sms_postfix"
                validation-rules=""
                @keydown="formChanged()"
              >
              </text-field>
            </div>

            <div class="float-right">
              <button-submit
                :disabled="!form.state.isDirty"
                :is-loading="form.state.isSubmitting"
                :is-saved-successful="form.state.savedSuccessful"
                @click="save"
              >
                <slot name="button-content">
                  <span>{{ $t('bedrock-core.general.save') }}</span>
                </slot>
              </button-submit>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSettings from './BaseSettings.vue';

export default {
  extends: BaseSettings,

  data() {
    return {
      form: {
        data: {
          name: this.settings.site_title,
          abbreviation: this.settings.site_abbreviation,
          description: this.settings.site_description,
          sms_prefix: this.settings.sms_prefix,
          sms_postfix: this.settings.sms_postfix,
          footer_copyright: this.settings.footer_copyright,
        },

        state: {
          isSubmitting: null,
          isDirty: false,
          savedSuccessful: false,
        },

        messages: {
          success: '',
          error: '',
          warning: '',
        },

        apiErrors: {},
      },

      routes: {
        save: 'admin.system.settings.branding.store',
      },
    };
  },

  methods: {},
};
</script>
