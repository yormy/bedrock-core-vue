<template>
  <div>
    <vue-dropzone
      id="dropzone"
      ref="myVueDropzone"
      :options="dropzoneOptions"
      :useCustomSlot="true"
      v-on:vdropzone-success="uploadSuccess"
      v-on:vdropzone-error="uploadError"
      v-on:vdropzone-removed-file="fileRemoved"
      v-on:vdropzone-file-added="fileAdded"
    >
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>

    <alert :message="apiError.message" type="success"></alert>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';


export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  props: {
    associatedXid: {
      type: String,
      required: true,
    },

    allowedMimeTypes: {
      type: Array,
      default: null,
    },

    uploadRoute: {
      type: String,
      required: true,
      default: '',
    },

    additionalData: null,
  },

  computed: {
    acceptedFiles() {
      if (this.allowedMimeTypes || this.allowedMimeTypes.length === 0) {
        return null
      }
      return this.allowedMimeTypes.toString();
    },

    dropzoneOptions() {
      const options = {
        url: this.route(this.uploadRoute, {'item_xid': this.associatedXid}),
        thumbnailWidth: 150,
        maxFilesize: 6000,
        // params : {
        //   'data' : this.additionalData,
        // },
        // headers: { 'My-Awesome-Header': 'header value' },
        //
        headers: {
          'X-CSRF-TOKEN': document.head.querySelector('[name=csrf-token]').content,
        },
        // addRemoveLinks: true,
        // maxFiles: 1,
      }

      if (this.acceptedFiles) {
        options.acceptedFiles = this.acceptedFiles;
      }

      return options;
    }
  },

  data() {
    return {
      apiError: {
        message: null,
      },
      fileName: '',
    };
  },
  methods: {
    uploadSuccess(file, response) {
      this.$emit('uploadSuccess', response);
      this.fileName = response.file;
    },

    uploadError(file, message) {

      const filename = file.name;
      const messageText = message.message;

      console.log(messageText);
      this.apiError.message = `${filename} : ${messageText}`;

      this.$emit('uploadError', file, message);
    },

    fileRemoved() {
    },

    fileAdded(file) {
      this.$emit('fileAdded');
      this.setOptions();
    },

    setOptions() {
      this.$refs.myVueDropzone.setOption('params', {
        "data": this.additionalData,
      });
    },

    triggerSend() {
      this.$refs.myVueDropzone.processQueue();
    },

  },
};
</script>
