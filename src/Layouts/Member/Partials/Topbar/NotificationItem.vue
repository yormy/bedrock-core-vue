<template>
  <div>
    <a :href="route('member.account.notifications.index')" class="dropdown-item preview-item">
      <div class="preview-thumbnail">
        <img :src="notification.from_avatar_url" />
      </div>
      <div class="preview-item-content flex-grow py-2">
        <p class="preview-subject ellipsis font-weight-medium text-dark">
          {{ notification.subject }}
        </p>
        <p class="font-weight-light small-text">{{ notification.summary }}</p>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    notification: {
      type: Object,
    },
  },

  data() {
    return {
      // branding: this.$page.props.shared.branding,
    };
  },
};
</script>
