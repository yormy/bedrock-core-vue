<template>
  <div>
    <h5 class="submenu-category-heading mb-3">
      {{ $t('menu.admin.system.communications.title') }}
    </h5>
    <ul class="nav">
      <div class="nav-item">
        <rbac-link-sidebar
          :as-admin="true"
          :user="admin"
          route-name="admin.system.communications.marketingsnippits.index"
        >
          <i class="nav-icon fal fa-ad"></i>
          {{ $t('menu.admin.system.communications.marketingsnippits.title') }}
        </rbac-link-sidebar>
      </div>

      <div class="nav-item">
        <rbac-link-sidebar
          :as-admin="true"
          :user="admin"
          route-name="admin.system.communications.marketingpromos.index"
        >
          <i class="nav-icon fal fa-arrow-to-top"></i>
          {{ $t('menu.admin.system.communications.marketingpromos.title') }}
        </rbac-link-sidebar>
      </div>

      <div class="nav-item">
        <rbac-link-sidebar
          :as-admin="true"
          :user="admin"
          route-name="admin.system.communications.emailtemplates.index"
        >
          <i class="nav-icon fal fa-envelope"></i>
          {{ $t('menu.admin.system.communications.emailtemplates.title') }}
        </rbac-link-sidebar>
      </div>

      <!--    <div class="nav-item">-->
      <!--      <x-bedrock-rbac-menulink :user="$admin" route="admin.account.login">-->
      <!--        {{$t('menu.admin.translations.emails')}} ??-->
      <!--      </x-bedrock-rbac-menulink>-->
      <!--    </div>-->

      <!--    <div class="nav-item">-->
      <!--      <x-bedrock-rbac-menulink :user="$admin" route="admin.account.login">-->
      <!--        {{$t('menu.admin.translations.mails')}} ??-->
      <!--      </x-bedrock-rbac-menulink>-->
      <!--    </div>-->

      <!--    <div class="nav-item">-->
      <!--      <x-bedrock-rbac-menulink :user="$admin" route="admin.account.login">-->
      <!--        Translation sync??-->
      <!--      </x-bedrock-rbac-menulink>-->
      <!--    </div>-->
    </ul>
    <div class="submenu-toolbar"></div>
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
