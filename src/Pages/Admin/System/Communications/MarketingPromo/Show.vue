<template>
  <div class="container mw-100">
    <div class="card">
      <div class="card-body">
        <marketing-promo-show :model="marketingPromo"></marketing-promo-show>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    marketingPromo: Object,
    options: Object,
  },
};
</script>
