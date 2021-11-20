<template>
  <div>
    <v-dialog v-if="content" v-model="infoDialog" width="500">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2"> {{ title }}</v-card-title>

        <v-card-text>
          <div v-if="contentHtml" v-html="contentHtml"></div>
          <div v-if="contentText">{{ contentText }}</div>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="primary" text @click="infoDialog = false">{{ $t('bedrock-core.general.close') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
    },

    title: {
      type: String,
    },

    contentHtml: {
      type: String,
    },

    contentText: {
      type: String,
    },
  },

  watch: {
    show() {
      this.infoDialog = this.show;
    }
  },

  data() {
    return {
      infoDialog: this.show,

    };
  },

};
</script>

