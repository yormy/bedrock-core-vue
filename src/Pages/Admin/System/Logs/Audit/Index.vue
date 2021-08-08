<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <log-activity-audit :datatable-values="audits"></log-activity-audit>
      </div>
    </div>
  </div>
</template>

<script>
import LogActivityAudit from '../../../../../Logs/LogActivityAudit';

export default {
  components: {
    LogActivityAudit,
  },
  props: {
    audits: Array,
  },
};
</script>
