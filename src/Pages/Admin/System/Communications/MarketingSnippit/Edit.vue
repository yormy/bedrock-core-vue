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
export default {
  props: {
    marketingSnippit: Object,
    options: Object,
  },
};
</script>
