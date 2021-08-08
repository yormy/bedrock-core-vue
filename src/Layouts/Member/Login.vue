<template>
  <div>
    <div class="container-scroller" style="min-height: unset">
      <div class="container-fluid full-page-wrapper">
        <div class="content-wrapper auth p-0 theme-two">
          <div class="row mx-0 my-0 d-flex align-items-stretch">
            <div
              class="col-md-8 px-0 py-0 banner-section align-items-stretch justify-content-center"
            >
              <!-- eslint-disable-->
              <div
                ref="background"
                :style="`background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('${background.login}') no-repeat top fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;`"
                class="
                  landing-half-wrapper-image
                  d-flex
                  no-block
                  justify-content-center
                  align-items-center
                "
              >
                <!--                <div class="main-view d-flex flex-column">-->
                <!--    <div style="height: 60%;" class="d-flex align-items-center">-->
                <!--    <div class="container h-100 d-flex justify-content-center">-->
                <!--                      <div class="my-auto text-center"-->
                <!--                           style="-->
                <!--      /*background: linear-gradient(rgba(255, 255, 255, 0.6),
                rgba(255, 255, 255, 0.6));*/-->
                <!--                                            ">-->
                <!--                        <div-->
                <!--  style="font-size:3.5em;color:rgba(255,255,255,0.8);font-weight:bold">-->
                <!--                          Learn the true secrets-->
                <!--                        </div>-->
                <!--                      </div>-->
                <!--                    </div>-->
                <!--                  </div>-->

                <!--                  <div style="height: 40%;" >-->
                <!--                    <div class="container h-100 d-flex
                justify-content-center">-->
                <!--                      <div class="jumbotron my-auto"-->
                <!--   style="background: linear-gradient(rgba(255, 255, 255, 0.3),
                 rgba(255, 255, 255, 0.8))">-->
                <!--                        <p> testimonial </p>-->
                <!--                      </div>-->
                <!--                    </div>-->
                <!--                  </div>-->

                <!--                </div>-->
              </div>
            </div>

            <div class="col-12 col-md-4 h-100 px-0 py-0 bg-white">
              <div style="margin-top: 5px; position: absolute; right: 0px; z-index: 99">
                <div class="d-flex">
                  <div v-if="registration.enabled" class="d-flex">
                    <div style="margin-top: 5px">
                      {{ $t('bedrock-users.login.no_account_signup.title') }}
                    </div>
                    <div>
                      <Link :href="route('guest.registration.create')">
                        <button class="btn btn-secondary btn-sm mx-3">
                          {{ $t('bedrock-users.login.no_account_signup.buttontext') }}
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div class="mx-3">
                    <locale-switcher></locale-switcher>
                  </div>
                </div>
              </div>

              <div
                class="
                  auto-form-wrapper
                  d-flex
                  align-items-center
                  justify-content-center
                  flex-column
                "
              >
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
</template>

<script>
import LocaleSwitcher from '../../Misc/LocaleSwitcher.vue';

export default {
  components: {
    LocaleSwitcher,
  },

  data() {
    return {
      background: this.$page.props.images.background,
      logo: this.$page.props.images.logo,
      config: this.$page.props.config,
      registration: this.$page.props.registration,
    };
  },
};
</script>
