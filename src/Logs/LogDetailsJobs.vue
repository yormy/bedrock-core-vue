<template>
  <div>
    <v-tabs
      v-model="tab"
      :grow="true"
      :icons-and-text="true"
      background-color="bg-info"
      class="elevation-2"
      dark
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab :href="`#tab-jobs`">
        {{ $t('bedrock-users.jobs.index.title') }}
        <i class="fal fa-hourglass fa-2x"></i>
      </v-tab>

      <v-tab :href="`#tab-failed-jobs`">
        {{ $t('bedrock-users.failed_jobs.index.title') }}
        <i class="fal fa-exclamation-triangle fa-2x"></i>
      </v-tab>

      <v-tab-item :value="'tab-jobs'">
        <system-jobs :datatable-values="jobs"></system-jobs>
      </v-tab-item>

      <v-tab-item :value="'tab-failed-jobs'">
        <system-failed-jobs :datatable-values="failedJobs"></system-failed-jobs>
      </v-tab-item>

    </v-tabs>
  </div>
</template>

<script>
import SystemJobs from './SystemJobs.vue';
import SystemFailedJobs from './SystemFailedJobs.vue';


export default {
  components: {
    SystemJobs,
    SystemFailedJobs,
  },

  props: {
    jobs: {
      type: Array,
    },

    failedJobs: {
      type: Array,
    },

    invites: {
      type: Array,
    },

    terms: {
      type: Array,
    },
  },

  data() {
    return {
      tab: null,
    };
  },
};
</script>
