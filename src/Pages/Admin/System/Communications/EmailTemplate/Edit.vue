<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <email-template-edit :model="emailTemplate" :options="options"></email-template-edit>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    emailTemplate: Object,
    options: Object,
  },
};
</script>
