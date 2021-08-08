<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <div class="d-flex flex-column">
          <div class="my-3">
            <Link :href="route('admin.developer.serverlogs.access')">
              <button class="btn btn-primary float-right">
                {{ $t('bedrock-core.server_log.access.title') }}
              </button>
            </Link>
          </div>
          <server-log-errors
            :datatable-values="errorLogs"
            :filter-severities="severities"
          ></server-log-errors>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ServerLogErrors from '../../../../Logs/ServerLogErrors.vue';

export default {
  components: {
    ServerLogErrors
  },

  props: {
    errorLogs: Array,
    severities: Array,
  },
};
</script>
