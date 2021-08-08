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
export default {
  props: {
    marketingSnippit: Object,
    options: Object,
  },
};
</script>
