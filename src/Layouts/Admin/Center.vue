<template>
  <div>
    <div class="container-scroller" style="min-height: unset">
      <div class="container-fluid full-page-wrapper">
        <div class="content-wrapper auth p-0 theme-two">
          <div class="row mx-0 my-0 d-flex align-items-stretch">
            <div class="col-12 px-0 py-0 banner-section align-items-stretch justify-content-center">
              <!-- eslint-disable-->
              <div
                :style="`background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${background.login}')no-repeat top fixed; -webkit-background-size: cover;-moz-background-size: cover; -o-background-size: cover;background-size: cover;`"
                class="
                  auto-form-wrapper
                  landing-half-wrapper-image
                  d-flex
                  no-block
                  justify-content-center
                  align-items-center
                "
              >
                <div class="d-flex flex-column">
                  <div class="d-flex align-items-center">
                    <div class="d-flex justify-content-center">
                      <div class="container card px-5 my-auto">
                        <div class="d-flex flex-row-reverse">
                          <locale-switcher></locale-switcher>
                        </div>
                        <div class="text-center">
                          <span class="db">
                            <img :src="logo.transparant.size96x96" alt="logo" />
                            <br />
                            <img :src="logo.text" alt="logo" />
                          </span>
                        </div>

                        <v-app>
                          <slot />
                        </v-app>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LocaleSwitcher from '../../Misc/LocaleSwitcher.vue';

export default {
  components: {
    LocaleSwitcher,
  },

  data() {
    return {
      switch1: true,
      background: this.$page.props.shared.images.background,
      logo: this.$page.props.shared.images.logo,
    };
  },
};
</script>
