<template>
  <v-card>
    <div class="m-3">
      <card-header :title="$t('bedrock-core.marketingsnippit.show.title')"></card-header>

      <div>
        <h3>{{ $t('bedrock-core.marketingsnippit.field.title.hint') }}</h3>
        <p>{{ form.data.title }}</p>
      </div>

      <div>
        <h3>{{ $t('bedrock-core.marketingsnippit.field.content.hint') }}</h3>
        <p>{{ form.data.description }}</p>
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
      },
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
        window.close();
      }

      window.history.back();
    },
  },
};
</script>
