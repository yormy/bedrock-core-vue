<template>
  <div>
    <v-app>
      <v-dialog v-model="showDetailedHistory" width="auto ">
        <v-card>
          <slot name="modal">
            <v-card-title class="headline"></v-card-title>

            <v-card-text>
              <div v-if="history && historyItem">
                <v-card elevation="2">
                  <div>
                    <strong>Subject</strong>
                  </div>
                  <div v-html="history[historyItem].subject.diff"></div>
                </v-card>

                <v-card class="mt-3" elevation="2">
                  <div>
                    <strong>HTML</strong>
                  </div>
                  <div v-html="history[historyItem].html_template.diff"></div>
                </v-card>

                <v-card class="mt-3" elevation="2">
                  <div>
                    <strong>TEXT</strong>
                  </div>
                  <div v-html="history[historyItem].text_template.diff"></div>
                </v-card>
              </div>
            </v-card-text>
          </slot>
        </v-card>
      </v-dialog>

      <div v-if="isLoading">
        <v-chip class="ma-2" color="primary" outlined pill> loading ...</v-chip>
      </div>

      <div v-else>
        <div v-if="!history || !history.length">No item found</div>
        <div v-for="(item, index) in history" :key="item.id">
          <a href="#"><span class="fal fa-eye" @click="historyDetail(index)"></span></a>
          <span v-html="item.subject.diff"></span>

          <!--          <div class="d-flex flex-column">-->
          <!--            <div class="text-right text-muted">-->
          <!--              <small>By {{ item.user_name }}</small>-->
          <!--            </div>-->

          <!--            <div class="d-flex flex-row justify-content-between">-->
          <!--              <div class="text-muted">-->
          <!--                <small>{{ item.date }}</small>-->
          <!--              </div>-->
          <!--              <div class="d-flex text-muted">-->
          <!--                <div :style="`color:${$t(reviewStatus(item) + '.color')}`">-->
          <!--                  <span :class="$t(reviewStatus(item) + '.fa_icon')"></span>-->
          <!--                </div>-->
          <!--                <small>{{ $t(reviewStatus(item) + '.text') }}</small>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->

          <div class="d-flex flex-column">
            <div class="text-right text-muted">
              <small>By {{ item.user_name }}</small>
            </div>

            <div class="d-flex flex-row justify-content-between">
              <div class="text-muted">
                <small>{{ item.date }}</small>
              </div>
              <div class="d-flex text-muted">
                <!--                <div :style="`color:${$t(reviewStatus(item) + '.color')}`">-->
                <!--                  <span :class="$t(reviewStatus(item) + '.fa_icon')"></span>-->
                <!--                </div>-->

                <div
                  :style="`color:${
                    $config.multilingual.reviewstatus.status[item.review_status].color
                  }`"
                >
                  <span
                    :class="$config.multilingual.reviewstatus.status[item.review_status].fa_icon"
                  ></span>
                  &nbsp;
                </div>

                <small>{{
                    $t(`multilingual-admin.reviewstatus.status.${item.review_status}.text`)
                  }}</small>
              </div>
            </div>
          </div>

          <hr/>
        </div>
      </div>
    </v-app>
  </div>
</template>

<script>
import BaseHistory from '@components/vendor/mexion/multilingual-admin/base/BaseHistory.vue';

export default {
  extends: BaseHistory,

  data() {
    return {
      historyItem: null,
      showDetailedHistory: false,
    };
  },

  methods: {
    historyDetail(index) {
      this.showDetailedHistory = true;
      this.historyItem = index;
    },
  },
};
</script>
