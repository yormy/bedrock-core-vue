<template>
  <div class="nav-item">
    <a class="nav-link" href="#">
      <i class="menu-icon fal fa-file-code"></i>
      <span class="menu-title">{{ $t('menu.admin.developer.title') }}</span>
    </a>
    <div class="submenu">
      <div class="submenu-inner ps-enabled">
        <br />
        <top-warnings-spacer></top-warnings-spacer>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.developer.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.developer.routes">
              <!--              <x-bedrock-rbac-menulink ">-->
              <i class="nav-icon fal fa-link"></i>
              {{ $t('menu.admin.developer.routes') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.developer.design.index"
            >
              <!--              <x-bedrock-rbac-menulink :">-->
              <i class="nav-icon fal fa-paint-roller"></i>
              {{ $t('menu.admin.developer.design') }}
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
