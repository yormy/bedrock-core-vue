<template>
  <div class="container mw-100">
    <div class="d-flex flex-column">
      <div class="my-3">
        <Link :href="route('admin.developer.serverlogs.error')">
          <button class="btn btn-primary float-right">
            {{ $t('bedrock-core.server_log.error.title') }}
          </button>
        </Link>
      </div>
      <server-log-access :datatable-values="accessLogs"></server-log-access>
    </div>
  </div>
</template>

<script>
import ServerLogAccess from '../../../../Logs/ServerLogAccess.vue';

export default {
  components: {
    ServerLogAccess
  },
  props: {
    accessLogs: Array,
  },
};
</script>
