<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <log-activity-activities
          :datatable-values="activities"
          :with-user="true"
        ></log-activity-activities>
      </div>
    </div>
  </div>
</template>

<script>
import LogActivityActivities from '../../../../../Logs/LogActivityActivities';

export default {
  components: {
    LogActivityActivities,
  },
  props: {
    activities: Array,
  },
};
</script>
