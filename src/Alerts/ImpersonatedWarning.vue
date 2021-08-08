<template>
  <div v-if="impersonated">
    <div class="text-center">
      <strong>{{ $t('bedrock-users.profile.impersonated') }}</strong>
      <button-submit
        :is-loading="state.isSubmitting"
        btn-class="btn btn-success"
        @click="leaveImpersonation"
      >
        {{ $t('bedrock-users.profile.impersonated_leave') }}
      </button-submit>
    </div>
  </div>
</template>

<script>
import {removeTokensUser,} from "../Plugins/loginhelper.js";


export default {

  props: {
    impersonated: {
      type: Boolean,
    },
  },

  data() {
    return {
      state: {
        isSubmitting: false,
      },
    };
  },

  // computed: {
  //   impersonated() {
  //     //return localStorage.getItem('impersonated');
  //   },
  // },


  methods: {
    leaveImpersonation() {
      const url = this.route('admin.members.impersonate.leave');

      this.state.isSubmitting = true;
      this.$http
        .get(url)
        .then(response => {
          removeTokensUser();
          localStorage.removeItem('impersonated');
          window.location.reload();
        })
        .catch(() => {})
        .finally(() => {});
    },
  },
};
</script>

<style scoped>
.alert {
  z-index: 99 !important;
}
</style>
