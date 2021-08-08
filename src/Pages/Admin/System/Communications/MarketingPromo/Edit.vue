<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-promo-edit :model="marketingPromo" :options="options"></marketing-promo-edit>
      </div>
    </div>
  </div>
</template>

<script>
import MarketingPromoEdit
  from "../../../../../System/Communications/MarketingPromo/MarketingPromoEdit";

export default {
  components: {
    MarketingPromoEdit
  },

  props: {
    marketingPromo: Object,
    options: Object,
  },
};
</script>
