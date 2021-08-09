<template>
  <div class="fixed-top">
    <div class="d-flex flex-column">
      <top-warnings></top-warnings>

      <div class="d-flex">
        <div class="navbar nav-item brand-logo">
          <Link :class="'nav-link'" :href="route('admin.home')">
            <img :src="logo.white.size48x48" alt="logo" />
          </Link>
        </div>

        <div class="navbar w-100">
          <div class="navbar-menu-wrapper d-flex align-items-center w-100">
            <ul class="nav">
              <!--              <quick-links></quick-links>-->
              <!--              <orders></orders>-->
              <!--              <reports></reports>-->
            </ul>
            <ul class="nav">
              <li class="nav-item dropdown">
                {{ app.language }}
              </li>

              <li class="nav-item dropdown">
                {{ admin.timezone }}
              </li>
              <li class="nav-item dropdown">
                <who></who>
              </li>
            </ul>

            <ul class="nav navbar-nav-right ml-auto">
              <notifications></notifications>
              <!--              <activity></activity>-->

              <locale-switcher></locale-switcher>

              <account></account>
            </ul>

            <button
              class="
                navbar-toggler navbar-toggler-right
                d-lg-none
                align-self-center
                pr-0
                text-white
              "
              data-toggle="offcanvas"
              type="button"
            >
              <span class="mdi mdi-menu"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from '../../../Misc/LocaleSwitcher.vue';
import Notifications from './Topbar/Notifications.vue';
import TopWarnings from './TopWarnings.vue';
import Account from './Topbar/Account.vue';
import Who from './Topbar/Who.vue';
// import QuickLinks from './Topbar/QuickLinks.vue';
// import Orders from './Topbar/Orders.vue';
// import Reports from './Topbar/Reports.vue';
// import Activity from './Topbar/Activity.vue';

export default {
  components: {
    Notifications,
    Account,
    LocaleSwitcher,
    TopWarnings,
    Who,
    // QuickLinks,
    // Orders,
    // Reports,
    // Activity,
  },

  data() {
    return {
      logo: this.$page.props.shared.images.logo,
      admin: this.$page.props.shared.admin,
      app: this.$page.props.shared.app,
    };
  },
};
</script>
