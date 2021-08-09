<template>
  <div>
    <p v-if="member" class="text-success"><strong>MEMBER</strong></p>
    <p v-else class="text-danger"><strong>MEMBER</strong></p>

    <p v-if="admin" class="text-success"><strong>ADMIN</strong></p>
    <p v-else class="text-danger"><strong>ADMIN</strong></p>
  </div>
</template>

<script>
export default {
  components: {},

  data() {
    return {
      admin: this.$page.props.shared.admin,
      member: this.$page.props.shared.member,
    };
  },
};
</script>
