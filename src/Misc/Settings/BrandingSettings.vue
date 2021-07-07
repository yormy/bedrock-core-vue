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
        Branding CORE
        {{ settings }}
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-12">
            <text-field
              v-model="form.data.name"
              :api-errors="form.apiErrors"
              :hint="$t('bedrock-users.billing.checkout.name_cardholder.hint')"
              :label="$t('bedrock-users.billing.checkout.name_cardholder.label')"
              autocomplete=""
              fieldname="name"
              validation-rules="required"
            >
            </text-field>


            <button-submit :is-loading="form.state.isSubmitting" @click="save">
              <slot name="button-content">
                <span>{{ $t('bedrock-core.general.delete') }}</span>
              </slot>
            </button-submit>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    icon: {
      type: String,
    },
    description: {
      type: String,
    },

    settings: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        data: {
          name: null,
        },

        state: {
          isSubmitting: null,
        },

        messages: {
          success: '',
          warning: '',
          error: '',
        },

        apiErrors: {},
      },
    }
  },

  methods: {
    save() {
      console.log('save');
    },
  },

};
</script>
