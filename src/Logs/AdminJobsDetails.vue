<template>
  <div>
    <v-row>
      <v-col>
        <performance-card
          :clickable="true"
          :color="'bg-info'"
          :subtitle="$t('bedrock-users.system.index.subtitle')"
          :title="$t('bedrock-users.system.index.title')"
          @click="section = 'SYSTEM'"
        >
        </performance-card>
      </v-col>
      <!--      <v-col>-->
      <!--        <performance-card-->
      <!--          :title="'Activity'"-->
      <!--          :subtitle="'Emails'"-->
      <!--          :color="'bg-success'"-->
      <!--          :clickable="true"-->
      <!--          @click="section = 'ACTIVITY'"-->
      <!--        >-->
      <!--        </performance-card>-->
      <!--      </v-col>-->
    </v-row>

    <div v-if="section == 'SYSTEM'">
      <log-details-jobs :failed-jobs="failedJobs" :jobs="jobs">
      </log-details-jobs>
    </div>

    <!--    <div v-if="section == 'ACTIVITY'">-->
    <!--      <log-details-activity :sent-emails="sentEmails"></log-details-activity>-->
    <!--    </div>-->
  </div>
</template>

<script>
import LogDetailsJobs from './LogDetailsJobs.vue';

export default {
  components: {
    LogDetailsJobs,
  },

  props: {
    title: {
      type: String,
    },

    jobs: {
      type: Array,
    },

    failedJobs: {
      type: Array,
    },
  },

  data() {
    return {
      section: 'SYSTEM',
    };
  },

  created() {
  },

  methods: {},
};
</script>
