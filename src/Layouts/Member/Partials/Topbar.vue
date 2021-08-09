<template>
  <div class="fixed-top">
    <div class="d-flex flex-column">
      <top-warnings></top-warnings>

      <div class="d-flex">
        <div class="navbar nav-item brand-logo">
          <Link :class="'nav-link'" :href="route('member.home')">
            <img :src="logo.white.size48x48" alt="logo" />
          </Link>
        </div>

        <div class="navbar w-100">
          <div class="navbar-menu-wrapper d-flex align-items-center w-100">
            <ul class="nav">
              <!--              @include('layouts.partials.topbar._quick-links')-->
              <!--              @include('layouts.partials.topbar._orders')-->
              <!--              @include('layouts.partials.topbar._reports')-->
            </ul>
            <!--            <ul class="nav">-->
            <!--              <li class="nav-item dropdown">-->
            <!--                {{ __('app.language') }}-->
            <!--              </li>-->

            <!--              <li class="nav-item dropdown">-->
            <!--                {{$timezone}}-->
            <!--              </li>-->
            <!--            </ul>     -->
            <ul class="nav navbar-nav-right ml-auto">
              <notifications></notifications>

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

export default {
  components: {
    Notifications,
    Account,
    LocaleSwitcher,
    TopWarnings,
  },

  data() {
    return {
      member: this.$page.props.shared.member,
      logo: this.$page.props.shared.images.logo,
    };
  },
};
</script>
