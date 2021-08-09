<template>
  <div class="nav-item">
    <a class="nav-link" href="#">
      <i class="menu-icon fal fa-users menu-icon"></i>
      <span class="menu-title">{{ $t('menu.admin.users.title') }}</span>
    </a>
    <div class="submenu">
      <div class="submenu-inner ps-enabled">
        <br />
        <top-warnings-spacer></top-warnings-spacer>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.users.members.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.members.index">
              <!--        <x-bedrock-rbac-menulink :user="$admin" route="admin.members.index">-->
              <i class="nav-icon fal fa-list"></i>
              {{ $t('menu.admin.users.members.overview') }}
              <!--          <div class="badge badge-pill ml-auto badge-success">8</div>-->
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.members.notify.create"
            >
              <!--        <x-bedrock-rbac-menulink :user="$admin">-->
              <i class="nav-icon fal fa-envelope"></i>
              {{ $t('menu.admin.users.members.notify') }}
            </rbac-link-sidebar>
          </div>
        </ul>

        <div class="submenu-toolbar"></div>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.users.admins.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.admins.index">
              <!--        <x-bedrock-rbac-menulink :user="$admin" route="admin.admins.index">-->
              <i class="nav-icon fal fa-list"></i>
              {{ $t('menu.admin.users.members.overview') }}
            </rbac-link-sidebar>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import TopWarningsSpacer from '../TopWarningsSpacer.vue';

export default {
  components: {
    TopWarningsSpacer,
  },

  data() {
    return {
      admin: this.$page.props.shared.admin,
    };
  },
};
</script>
