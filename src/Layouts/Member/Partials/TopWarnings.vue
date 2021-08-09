<template>
  <div class="fixed-top" style="position: relative">
    <div class="d-flex flex-column">
      <div
        v-if="config.environmentSettingsWarning"
        class="d-flex flex-column w-100 top-notification-bar system"
      >
        <p class="text-center py-1">{{ config.environmentSettingsWarning }}</p>
      </div>

      <div
        v-if="config.environmentWarning"
        class="d-flex flex-column w-100 top-notification-bar system"
      >
        <p class="text-center py-1">{{ config.environmentWarning }}</p>
      </div>

      <div
        v-if="marketingpromo_top"
        class="d-flex flex-column w-100 top-notification-bar marketing"
      >
        <p class="text-center py-1">{{ marketingpromo_top.title }}</p>
      </div>

      <div
        v-if="impersonated"
        class="d-flex flex-column w-100 top-notification-bar impersonation-warning"
      >
        <impersonated-warning :impersonated="impersonated"></impersonated-warning>
      </div>
    </div>
  </div>
</template>

<script>
import ImpersonatedWarning from '../../../Alerts/ImpersonatedWarning.vue';

export default {
  components: {
    ImpersonatedWarning,
  },

  data() {
    return {
      config: this.$page.props.shared.config,
      impersonated: this.$page.props.shared.impersonated,
      marketingpromo_top: this.$page.props.shared.notifications.marketingpromo_top,
    };
  },
};
</script>
