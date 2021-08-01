<template>
  <div>
    <loading-overlay :show="form.state.isSubmitting"></loading-overlay>

    <div class="form-horizontal">
      <div class="form-group">
        <messages :messages="form.messages"></messages>
      </div>
    </div>

    <div class="card card-table">
      <div class="card-header">
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <flip-switch
              v-model="form.data.billing_enabled"
              :description="
                $t('bedrock-core.settings.billing.enabled.description')
              "
              :hint="$t('bedrock-core.settings.billing.enabled.hint')"
              :label="$t('bedrock-core.settings.billing.enabled.label')"
              color="success"
              @changed="flipChanged('billing_enabled', $event)"
            ></flip-switch>

            <flip-switch
              v-model="form.data.invoices_enabled"
              :description="
                $t('bedrock-core.settings.billing.invoices_enabled.description')
              "
              :hint="$t('bedrock-core.settings.billing.invoices_enabled.hint')"
              :label="$t('bedrock-core.settings.billing.invoices_enabled.label')"
              color="success"
              @changed="flipChanged('invoices_enabled', $event)"
            ></flip-switch>

            <flip-switch
              v-model="form.data.discount_enabled"
              :description="
                $t('bedrock-core.settings.billing.discount_enabled.description')
              "
              :hint="$t('bedrock-core.settings.billing.discount_enabled.hint')"
              :label="$t('bedrock-core.settings.billing.discount_enabled.label')"
              color="success"
              @changed="flipChanged('discount_enabled', $event)"
            ></flip-switch>

            <button-submit :is-loading="form.state.isSubmitting" @click="save">
              <slot name="button-content">
                <span>{{ $t('bedrock-core.general.save') }}</span>
              </slot>
            </button-submit>

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
          billing_enabled: this.settings.billing_enabled,
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
        save: 'admin.system.settings.billing.store',
      },
    };
  },

  methods: {},

};
</script>
