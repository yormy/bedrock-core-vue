<template>
  <div>
    <li class="nav-item dropdown d-none d-inline-block dropdown">
      <a
        id="UserDropdown"
        aria-expanded="false"
        class="nav-link dropdown-toggle"
        data-toggle="dropdown"
        href="#"
      >
        <img :src="admin.avatar_url" alt="Profile image" class="img-xs rounded-circle" />
        <span class="profile-text d-none d-sm-block">{{ admin.name }}</span>
      </a>

      <div
        aria-labelledby="accountDropdown"
        class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list pb-0 shift-left"
      >
        <a class="dropdown-item dropdown-header">
          <div class="wrapper">
            <h4 class="mb-1 font-weight-medium">{{ $t('menu.user.manage.title') }}</h4>
          </div>
        </a>

        <rbac-link-top :as-admin="true" :user="admin" route-name="admin.account.profile.show">
          <topbar-dropdown-item
            :description="$t('menu.user.profile.description')"
            :title="$t('menu.user.profile.title')"
            icon="fal fa-user"
          ></topbar-dropdown-item>
        </rbac-link-top>

        <rbac-link-top
          :as-admin="true"
          :user="admin"
          route-name="admin.account.notifications.index"
        >
          <topbar-dropdown-item
            :description="$t('menu.user.notifications.description')"
            :title="$t('menu.user.notifications.title')"
            icon="fal fa-envelope"
          ></topbar-dropdown-item>
        </rbac-link-top>

        <rbac-link-top
          :as-admin="true"
          :user="admin"
          route-name="admin.account.notifications.settings"
        >
          <topbar-dropdown-item
            :description="$t('menu.user.notifications_subscriptions.description')"
            :title="$t('menu.user.notifications_subscriptions.title')"
            icon="fal fa-mailbox"
          ></topbar-dropdown-item>
        </rbac-link-top>

        <div class="wrapper px-4 pt-2">
          <div class="d-flex justify-content-center">
            <Link :href="route('admin.account.logout')">
              <button class="btn btn-link btn-sm mr-2" type="button">
                <i class="fal fa-power-off fa-sm"></i> {{ $t('menu.user.auth.logout') }}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>
<script>
export default {
  data() {
    return {
      admin: this.$page.props.shared.admin,
    };
  },
};
</script>
<style scoped>
.shift-left {
  left: -100px !important;
}
</style>
