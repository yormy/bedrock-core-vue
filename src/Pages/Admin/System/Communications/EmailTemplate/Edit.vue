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
import EmailTemplateEdit
  from "../../../../../System/Communications/EmailTemplates/EmailTemplateEdit";

export default {
  components: {
    EmailTemplateEdit
  },

  props: {
    emailTemplate: Object,
    options: Object,
  },
};
</script>
