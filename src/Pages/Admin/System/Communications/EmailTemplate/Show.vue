<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <email-template-show> :model="emailTemplate"></email-template-show>
      </div>
    </div>
  </div>
</template>

<script>
import EmailTemplateShow
  from "../../../../../System/Communications/EmailTemplates/EmailTemplateShow";

export default {
  components: {
    EmailTemplateShow
  },
  props: {
    emailTemplate: Object,
    options: Object,
  },
};
</script>
