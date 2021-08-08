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
export default {
  props: {
    marketingPromo: Object,
    options: Object,
  },
};
</script>
