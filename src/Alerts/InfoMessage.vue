<template>
  <div v-if="message">
    <alert :message="message" type="info"></alert>
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
