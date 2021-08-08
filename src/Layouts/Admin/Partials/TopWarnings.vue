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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      config: this.$page.props.config,
      impersonated: this.$page.props.impersonated,
      marketingpromo_top: this.$page.props.notifications.marketingpromo_top,
    };
  },
};
</script>
