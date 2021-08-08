<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-snippit-index :datatable-values="marketingSnippits"></marketing-snippit-index>
      </div>
    </div>
  </div>
</template>

<script>
import MarketingSnippitIndex
  from "../../../../../System/Communications/MarketingSnippit/MarketingSnippitIndex";

export default {
  components: {
    MarketingSnippitIndex
  },
  props: {
    marketingSnippits: Array,
  },
};
</script>
