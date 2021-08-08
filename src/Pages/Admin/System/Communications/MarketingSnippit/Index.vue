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
export default {
  props: {
    marketingSnippits: Array,
  },
};
</script>
