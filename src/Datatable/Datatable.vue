<script>
export default {
  props: {
    title: {
      type: String,
    },

    datatableValues: {
      type: Array,
    },

    caseSensitive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      table: {
        searchInput: null,
        showFilters: false,
        headers: [],
        values: this.datatableValues,
        backup: null,
        searchEnabled: true,
      },

      headers: [],
      searchInput: null,

      valueOnClipboard: null,
    };
  },

  computed: {
    searchData() {
      if (!this.table.searchEnabled) {
        return '';
      }

      if (this.table.searchInput === '' || !this.table.searchInput) {
        return '@';
      }
      return this.table.searchInput;
    },
  },

  methods: {
    makeSearchable() {
      // add dummy column to be able to additional default filtering on status
      // remember to hide columns with css
      this.table.headers.push(
        {
          text: 'd',
          value: 'dummy',
          width: '1px'
        }
      );
    },

    copyClipboard(value) {
      const self = this;
      navigator.clipboard.writeText(value).then(function () {
        self.valueOnClipboard = value;
      }, function (err) {
        console.error('Could not copy text: ', err);
      });
    },

    addItemToTable(values, item) {
      this.table.backup = JSON.parse(JSON.stringify(values));
      values.push(item);
      return values;
    },

    updateItemInTable(values, item, findOn) {
      // NOTE: replacing the item in the array does not trigger a refresh of the table
      this.table.backup = JSON.parse(JSON.stringify(values));
      const withoutItem = this.deleteItemFromTable(values, item, findOn);
      return this.addItemToTable(withoutItem, item);
    },

    deleteItemFromTable(values, item, findOn) {
      this.copyTableTo(values, this.table.backup)
      const foundIndex = this.findIndex(values, item, findOn);

      const copy = JSON.parse(JSON.stringify(values));
      copy.splice(foundIndex, 1);
      return copy;
    },

    copyTableTo(fromValues, toValues) {
      toValues = JSON.parse(JSON.stringify(fromValues));
    },

    restoreTable() {
      return this.table.backup;
    },

    checkFilters(item) {
      if (!this.hasFilter()) {
        return true;
      }
      return this.applyFilters(item);
    },

    searchCase(value, search) {
      if (this.caseSensitive) {
        return this.searchCaseSensitive(value, search);
      }
      return this.searchCaseInsensitive(value, search);
    },

    searchCaseInsensitive(value, search) {
      return value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1;
    },

    searchCaseSensitive(value, search) {
      return value.indexOf(search) !== -1;
    },

    filter(value, search, item) {
      if (!this.hasFilter) {
        return (
          value !== null &&
          search !== null &&
          typeof value === 'string' &&
          this.searchCase(value, search)
        );
      }

      if (search === null || search === '') {
        return value !== null && typeof value === 'string' && this.checkFilters(item);
      }

      return (
        value !== null &&
        search !== null &&
        typeof value === 'string' &&
        this.checkFilters(item) &&
        this.searchCase(value, search)
      );
    },

    findIndex(datatable, item, findOn) {
      if (findOn === undefined) {
        /*eslint-disable */
        console.error('no search key specified');
        /* eslint-enable */
      }

      let foundIndex = -1;
      datatable.forEach((value, index) => {
        if (value[findOn] === item[findOn]) {
          foundIndex = index;
        }
      });
      return foundIndex;
    },

    clearformResult() {
      this.form.messages.success = '';
      this.form.messages.error = '';
      this.form.messages.wearning = '';
    },
  },
};
</script>

<!--<style scoped>-->
<!--/*!* Hard hide the column of the DUMMY data *!*/-->
<!--/*::v-deep .v-data-table__wrapper thead tr th:nth-of-type(7) {*/-->
<!--/*    display:none;*/-->
<!--/*}*/-->
<!--/*::v-deep .v-data-table__wrapper tr td:nth-of-type(7) {*/-->
<!--/*    display:none;*/-->
<!--/*}*/-->

<!--::v-deep .v-data-table__wrapper thead tr th.hidden {-->
<!--  display: none;-->
<!--}-->

<!--::v-deep .v-card__title.danger {-->
<!--  background-color: red;-->
<!--}-->

<!--::v-deep tr.v-data-table__selected {-->
<!--  background: #7d92f5 !important;-->
<!--}-->

<!--::v-deep tr.v-data-table__expanded__content {-->
<!--  background: #c2c0c2 !important;-->
<!--  border: none !important;-->
<!--  box-shadow: none !important;-->
<!--}-->

<!--::v-deep .v-data-table-header {-->
<!--  background-color:green;-->
<!--}-->
<!--</style>-->

<!--Hide row on mobile only-->
<!--::v-deep .v-data-table__wrapper tr.v-data-table__mobile-table-row td:nth-of-type(5) {-->
<!--display:none-->
<!--}-->
