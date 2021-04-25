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
    >
      <div class="dropzone-custom-content">
        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>
        <div class="subtitle">...or click to select a file from your computer</div>
      </div>
    </vue-dropzone>
  </div>
</template>

<script>
import vue2Dropzone from 'vue2-dropzone';


export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      dropzoneOptions: {
        url: '/fileupload',
        thumbnailWidth: 150,
        maxFilesize: 6000,
        // headers: { 'My-Awesome-Header': 'header value' },
        //
        // headers: {
        //   'X-CSRF-TOKEN': document.head.querySelector('[name=csrf-token]').content,
        // },
        // addRemoveLinks: true,
        // maxFiles: 1,
      },
      fileName: '',
    };
  },
  methods: {
    uploadSuccess(file, response) {
      console.log(`File Successfully Uploaded with file name: ${response.file}`);
      this.fileName = response.file;
    },
    uploadError(file, message) {
      console.log(`An Error Occurred${file}${message}`);
    },
    fileRemoved() {
    },
  },
};
</script>
