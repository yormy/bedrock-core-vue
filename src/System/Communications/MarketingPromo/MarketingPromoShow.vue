<template>
  <v-card>
    <div class="m-3">
      <card-header :title="$t('bedrock-core.marketingpromo.show.title')"></card-header>

      <div>
        <h3>{{ $t('bedrock-core.marketingpromo.field.position.label') }}</h3>
        <p>{{ form.data.position }}</p>
      </div>

      <div>
        <h3>{{ $t('bedrock-core.marketingpromo.field.title.label') }}</h3>
        <p>{{ form.data.title }}</p>
      </div>

      <div>
        <h3>{{ $t('bedrock-core.marketingpromo.field.subtitle.label') }}</h3>
        <p>{{ form.data.subtitle }}</p>
      </div>


      <div>
        <h3>{{ $t('bedrock-core.marketingpromo.field.content.label') }}</h3>
        <p>{{ form.data.content }}</p>
      </div>

      <div>
        <h3>
          {{ $t('bedrock-core.marketingpromo.field.active_from_till.label') }}
        </h3>
        <p>
          {{
            $t('bedrock-core.marketingpromo.field.active_from_till.content',
              {active_at: form.data.active_at, expires_at: form.data.expires_at})
          }}
        </p>
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
import CardHeader from "../../../PageDesign/CardHeader.vue";
import CardFooter from "../../../PageDesign/CardFooter.vue";
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
      },
    };
  },

};
</script>
