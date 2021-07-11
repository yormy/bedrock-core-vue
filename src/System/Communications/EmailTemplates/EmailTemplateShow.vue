<template>
  <v-card>
    <div class="m-3">
      <card-header :title="$t('bedrock-core.emailtemplate.show.title')"></card-header>

      <div>
        <h3>{{ $t('bedrock-core.emailtemplate.field.name.label') }}</h3>
        <p>{{ form.data.name }}</p>
      </div>

      <card-footer>
        <template v-slot:buttons>
          <button-submit :is-loading="form.state.isSubmitting" @click="back">
            <slot name="button-content">
              <span>{{ $t('bedrock-core.action.back') }}</span>
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
import View from "../../../Crud/View.vue";

export default {
  extends: View,

  components: {
    CardFooter,
    CardHeader
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
      },
    };
  },

};
</script>
