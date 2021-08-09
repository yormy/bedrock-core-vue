<script>
export default {
  metaInfo() {
    let title = '';
    if (this.page && this.page.title) {
      title = this.page.title + ' - ';
    }

    title += this.$page.props.shared.branding.site_title;

    return {
      title: title,
    }
  }
};
</script>
