<template>
  <div>
    <div id="sidebar-icon-only" class="sidebar sidebar-offcanvas">
      <top-warnings-spacer></top-warnings-spacer>

      <div class="sidebar-inner ps-enabled">
        <nav class="nav">
          <div class="nav-item">
            <div class="nav-link">
              <rbac-link-sidebar :user="member" route-name="member.home">
                <i class="menu-icon fal fa-tachometer-alt-fast menu-icon"></i>
                <span class="menu-title">{{ $t('menu.user.dashboard.title') }}</span>
              </rbac-link-sidebar>
            </div>
          </div>

          <div v-for="menuItem in menu" :key="menuItem.xid" class="nav-item">
            <!--          {{ menuItem.xid }}-->
            <a class="nav-link" href="#">
              <!--f($menuItem->icon) <i class="menu-icon mdi mdi-poll-box"></i>-->
              <span class="menu-title">{{ menuItem.name }}</span>
            </a>
            <div class="submenu">
              <div class="submenu-inner ps-enabled">
                <top-warnings-spacer></top-warnings-spacer>
                <br />
                <h5 class="submenu-category-heading">
                  <Link :href="route('member.groups.show', menuItem.xid)">
                    {{ menuItem.name }}
                  </Link>
                </h5>

                <ul class="nav">
                  <div v-for="submenu in menuItem.children" :key="submenu.xid" class="nav-item">
                    <Link :class="'nav-link'" :href="route('member.groups.show', submenu.xid)">
                      {{ submenu.name }}
                      <!-- <div class="badge badge-pill ml-auto badge-danger">2</div>-->
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import TopWarningsSpacer from './TopWarningsSpacer.vue';

export default {
  components: {
    TopWarningsSpacer,
  },

  data() {
    return {
      menu: this.$page.props.shared.menu,
      member: this.$page.props.shared.member,
    };
  },
};
</script>
