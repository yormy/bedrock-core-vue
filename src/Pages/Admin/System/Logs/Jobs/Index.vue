<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <admin-jobs-details :failed-jobs="failedJobs" :jobs="jobs"></admin-jobs-details>
      </div>
    </div>
  </div>
</template>

<script>
import AdminJobsDetails from '../../../../../Logs/AdminJobsDetails.vue';

export default {
  components: {
    AdminJobsDetails,
  },
  props: {
    jobs: Array,
    failedJobs: Array,
  },
};
</script>
