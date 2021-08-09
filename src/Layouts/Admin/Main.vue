<template>
  <div>
    <auto-logout v-if="config.autologoutEnabled" logged-in-as="ADMIN"></auto-logout>
    <div class="container-scroller">
      <topbar></topbar>

      <div class="container-fluid page-body-wrapper">
        <sidebar></sidebar>

        <div class="main-panel">
          <top-warnings-spacer></top-warnings-spacer>
          <div class="content-wrapper">
            <v-app>
              <div style="min-height: auto !important; width: inherit">
                admin-layout
                <!--                <sidebar-mini></sidebar-mini>-->
                <!--                <breadcrumb></breadcrumb>-->
                <br />
                <slot />
              </div>
            </v-app>
          </div>

          <footer-bar></footer-bar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from './Partials/Topbar.vue';
import TopWarningsSpacer from './Partials/TopWarningsSpacer.vue';
import Sidebar from './Partials/Sidebar.vue';
import FooterBar from './Partials/FooterBar.vue';
// import Breadcrumb from './Partials/Breadcrumb.vue';
// import SidebarMini from './Partials/SidebarMini.vue';

export default {
  components: {
    TopWarningsSpacer,
    Topbar,
    Sidebar,
    FooterBar,
    // Breadcrumb,
    // SidebarMini,
  },
  data() {
    return {
      config: this.$page.props.shared.config,
    };
  },
};
</script>
<style>
.v-application--wrap {
  min-height: inherit !important;
}
</style>
