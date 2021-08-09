<template>
  <div v-if="hasNotifications()">
    <span class="badge badge-pill badge-danger notification-badge">
      {{ topbarNotifications.length }}
    </span>
    <li class="nav-item dropdown circle-grid">
      <a
        id="messageDropdown"
        aria-expanded="false"
        class="nav-link count-indicator dropdown-toggle"
        data-toggle="dropdown"
        href="#"
      >
        <i class="mdi mdi-bell-outline"></i>
      </a>

      <div
        aria-labelledby="messageDropdown"
        class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0"
      >
        <!-- href="{{route('member.account.notifications.index')}}" -->
        <a class="dropdown-item dropdown-header">
          <div class="wrapper">
            <h4 class="mb-1 font-weight-medium">
              {{ $t('menu.notifications.title') }}
            </h4>
            <p class="mb-0 font-weight-medium float-left font-weight-light">
              {{ $t('menu.notifications.subtitle') }}
            </p>
          </div>
          <span class="badge badge-pill badge-primary float-right">
            <Link :href="route('member.account.notifications.index')">
              {{ $t('menu.notifications.view_all') }}
            </Link>
          </span>

          <div class="dropdown-divider"></div>
        </a>

        <div v-for="notification in topbarNotifications" :key="notification.id">
          <notification-item
            :key="notification.id"
            :notification="notification"
          ></notification-item>
        </div>
      </div>
    </li>
  </div>
</template>

<script>
import NotificationItem from './NotificationItem.vue';

export default {
  components: {
    NotificationItem,
  },

  data() {
    return {
      member: this.$page.props.shared.member,
      topbarNotifications: this.$page.props.shared.notifications.topbar,
    };
  },

  methods: {
    hasNotifications() {
      return this.topbarNotifications && this.topbarNotifications.length > 0;
    },
  },
};
</script>
<style scoped>
.notification-badge {
  position: inherit;
  float: right;
}
</style>
