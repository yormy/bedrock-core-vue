<template>
  <div class="container mw-100">
    <performance-page
      :exclude="exclude"
      :from="from"
      :page-avg-response="pageAvgResponse"
      :page-graph-labels="pageGraphLabels"
      :page-graph-values="pageGraphValues"
      :page-slow="pageSlow"
      :page-usage="pageUsage"
      :page-weighted-avg="pageWeightedAvg"
      :sql-avg-response="sqlAvgResponse"
      :sql-graph-labels="sqlGraphLabels"
      :sql-graph-values="sqlGraphValues"
      :sql-slow="sqlSlow"
      :sql-usage="sqlUsage"
      :sql-weighted-avg="sqlWeightedAvg"
      :until="until"
    >
    </performance-page>
  </div>
</template>

<script>
import PerformancePage from '../../../../PageDesign/PerformancePage';

export default {
  components: {
    PerformancePage,
  },

  props: {
    exclude: Boolean,
    from: String,
    pageAvgResponse: String,
    pageGraphLabels: Array,
    pageGraphValues: Array,
    pageSlow: Array,
    pageUsage: Array,
    pageWeightedAvg: Array,
    sqlAvgResponse: String,
    sqlGraphLabels: Array,
    sqlGraphValues: Array,
    sqlSlow: Array,
    sqlUsage: Array,
    sqlWeightedAvg: Array,
    until: String,
  },
};
</script>
