<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-snippit-show :model="marketingSnippit"></marketing-snippit-show>
      </div>
    </div>
  </div>
</template>

<script>
import MarketingSnippitShow
  from "../../../../../System/Communications/MarketingSnippit/MarketingSnippitShow";

export default {
  components: {
    MarketingSnippitShow
  },

  props: {
    marketingSnippit: Object,
    options: Object,
  },
};
</script>
