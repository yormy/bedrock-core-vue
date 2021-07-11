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

      <date-time-picker
        v-model="form.data.active_at"
        :current="form.data.active_at"
        :api-errors="form.apiErrors"
        fieldname="active_at"
        :description="$t('bedrock-core.marketingsnippit.field.active_at.hint')"
        :label="$t('bedrock-core.marketingsnippit.field.active_at.label')"
      />

      <date-time-picker
        v-model="form.data.expires_at"
        :current="form.data.expires_at"
        :api-errors="form.apiErrors"
        fieldname="expires_at"
        :description="$t('bedrock-core.marketingsnippit.field.expires_at.hint')"
        :label="$t('bedrock-core.marketingsnippit.field.expires_at.label')"/>

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
import Edit from "../../../Crud/Edit.vue";

export default {
  extends: Edit,

  components: {
    CardFooter,
    CardHeader,
  },

  data() {
    return {
      form: {
        data: {
          title: this.model.title,
          description: this.model.description,
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
        update: 'admin.system.communications.marketingsnippits.update',
        store: 'admin.system.communications.marketingsnippits.store'
      }

    };
  },

  methods: {
    //
  },
};
</script>
