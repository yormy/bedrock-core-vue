<template>
  <div class="nav-item mt-auto settings-item-link">
    <a class="nav-link" href="#">
      <i class="menu-icon mdi mdi-wallet-travel"></i>
      <span class="menu-title">{{ $t('menu.admin.system.title') }}</span>
    </a>
    <div class="submenu">
      <div class="submenu-inner ps-enabled">
        <br />
        <top-warnings-spacer></top-warnings-spacer>
        <system-communications></system-communications>

        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.system.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.settings.index"
            >
              <!--            <x-bedrock-rbac-menulink :user="admin" route="">-->
              <i class="nav-icon fal fa-cogs"></i>
              {{ $t('menu.admin.system.settings') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.invites.index"
            >
              <i class="nav-icon fal fa-percent"></i>
              {{ $t('menu.admin.system.invite_codes') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.billing.discounts.index"
            >
              <i class="nav-icon fal fa-money-bill"></i>
              {{ $t('menu.admin.system.discount_codes') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.security.index"
            >
              <i class="nav-icon fal fa-user-slash"></i>
              {{ $t('menu.admin.system.security') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.system.terms.index">
              <i class="nav-icon fal fa-balance-scale-right"></i>
              {{ $t('menu.admin.system.terms') }}
            </rbac-link-sidebar>
          </div>
        </ul>

        <div class="submenu-toolbar"></div>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.system.logs.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.activity.index"
            >
              <i class="nav-icon fal fa-shoe-prints"></i>
              {{ $t('menu.admin.system.logs.activity') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.system.audit.index">
              <i class="nav-icon fal fa-comment-alt-lines"></i>
              {{ $t('menu.admin.system.logs.audit') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.system.emails.index"
            >
              <i class="nav-icon fal fa-comment-alt-lines"></i>
              {{ $t('menu.admin.system.logs.emails') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.system.jobs.index">
              <i class="nav-icon fal fa-books"></i>
              {{ $t('menu.admin.system.logs.jobs') }}
            </rbac-link-sidebar>
          </div>
        </ul>

        <div class="submenu-toolbar"></div>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.system.rbac.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.rbac.features.index"
            >
              <i class="nav-icon fal fa-tag"></i>
              {{ $t('menu.admin.system.rbac.features') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar :as-admin="true" :user="admin" route-name="admin.rbac.roles.index">
              <i class="nav-icon fal fa-user-tag"></i>
              {{ $t('menu.admin.system.rbac.roles') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.rbac.permissions.index"
            >
              <i class="nav-icon fal fa-shield-check"></i>
              {{ $t('menu.admin.system.rbac.permissions') }}
            </rbac-link-sidebar>
          </div>
        </ul>

        <div class="submenu-toolbar"></div>
        <h5 class="submenu-category-heading mb-3">{{ $t('menu.admin.system.sysadmin.title') }}</h5>
        <ul class="nav">
          <div class="nav-item">
            <!--            <rbac-link-sidebar :user="admin" route-name="log-viewer::dashboard">-->
            <!--            <x-bedrock-rbac-menulink :user="admin" route="log-viewer::dashboard">-->
            <a :href="route('log-viewer::dashboard')" target="_blank">
              <i class="nav-icon fal fa-browser"></i>
              {{ $t('menu.admin.system.sysadmin.app_log_dashboard') }}
            </a>
            <!--            </rbac-link-sidebar>-->
            <!--            </x-bedrock-rbac-menulink>-->
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.developer.performance.dashboard"
            >
              <i class="nav-icon fal fa-tachometer-slowest"></i>
              {{ $t('menu.admin.system.sysadmin.monitor_performance') }}
            </rbac-link-sidebar>
          </div>

          <div class="nav-item">
            <rbac-link-sidebar
              :as-admin="true"
              :user="admin"
              route-name="admin.developer.serverlogs.error"
            >
              <i class="nav-icon fal fa-engine-warning"></i>
              {{ $t('menu.admin.system.sysadmin.log_server_error') }}
            </rbac-link-sidebar>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SystemCommunications from './SystemCommunications.vue';
import TopWarningsSpacer from '../TopWarningsSpacer.vue';

export default {
  components: {
    TopWarningsSpacer,
    SystemCommunications,
  },

  data() {
    return {
      admin: this.$page.props.shared.admin,
    };
  },
};
</script>
