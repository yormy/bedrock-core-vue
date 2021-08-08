<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-snippit-edit
          :model="marketingSnippit"
          :options="options"
        ></marketing-snippit-edit>
      </div>
    </div>
  </div>
</template>

<script>
import MarketingSnippitEdit
  from "../../../../../System/Communications/MarketingSnippit/MarketingSnippitEdit";

export default {
  components: {
    MarketingSnippitEdit
  },

  props: {
    marketingSnippit: Object,
    options: Object,
  },
};
</script>
