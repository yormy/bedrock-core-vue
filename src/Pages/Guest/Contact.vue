<template>
  <div class="container">
    <div class="d-flex-column">
      <div class="text-center">
        <h1>CONTACT US</h1>
      </div>
      <div class="">
        <div class="card">
          <div class="card-body">
            {{ title }}
            {{ description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Login from '../../Shared/Layouts/Member/Login.vue';

export default {
  //layout: Login,

  props: {
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
};
</script>
