<script>
export default {
  props: {
    model: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      form: {
        data: {
          position: this.model.position,
          title: this.model.title,
          subtitle: this.model.subtitle,
          content: this.model.content,
          active_at: this.model.active_at,
          expires_at: this.model.expires_at,
        },

        state: {
          isSubmitting: false,
        },
      },
    };
  },

  methods: {
    getQueryParameters() {
      const urlParams = new URLSearchParams(window.location.search);
      return Object.fromEntries(urlParams.entries());
    },

    back() {
      const params = this.getQueryParameters();
      if ("new" in params) {
        window.close();
      }

      window.history.back();
    },
  },
};
</script>
