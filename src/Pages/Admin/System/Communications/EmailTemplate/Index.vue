<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <email-template-index :datatable-values="emailTemplates"></email-template-index>
      </div>
    </div>
  </div>
</template>

<script>
import EmailTemplateIndex
  from "../../../../../System/Communications/EmailTemplates/EmailTemplateIndex";

export default {
  components: {
    EmailTemplateIndex
  },

  props: {
    emailTemplates: Array,
  },
};
</script>
