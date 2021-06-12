<template>
  <div v-if="message">
    <alert :message="message" type="warning"></alert>
  </div>
</template>

<script>
import Alert from './Alert.vue';

export default {
  components: {
    Alert,
  },

  props: {
    message: '',
  },
}
</script>
