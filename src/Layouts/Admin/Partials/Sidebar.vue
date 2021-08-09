<template>
  <div>
    <div id="sidebar-icon-only" class="sidebar sidebar-offcanvas">
      <top-warnings-spacer></top-warnings-spacer>
      <div class="sidebar-inner ps-enabled">
        <nav class="nav">
          <div class="nav-item">
            <div class="nav-link">
              <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.home">
                <i class="menu-icon fal fa-tachometer-alt-fast menu-icon"></i>
                <span class="menu-title">{{ $t('menu.admin.dashboard.title') }}</span>
              </rbac-link-sidebar>
            </div>
          </div>

          <users></users>
          <system></system>
          <developer></developer>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Developer from './Sidebar/Developer.vue';
import Users from './Sidebar/Users.vue';
import System from './Sidebar/System.vue';
import TopWarningsSpacer from './TopWarningsSpacer.vue';

export default {
  components: {
    Developer,
    Users,
    System,
    TopWarningsSpacer,
  },

  data() {
    return {
      admin: this.$page.props.shared.admin,
    };
  },
};
</script>
