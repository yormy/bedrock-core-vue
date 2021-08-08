<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-promo-index :datatable-values="marketingPromos"></marketing-promo-index>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marketingPromos: Array,
  },
};
</script>
