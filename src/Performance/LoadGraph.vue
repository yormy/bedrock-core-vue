<template>
  <v-card>
    <v-card-title>
      <h1>{{ title }}</h1>
    </v-card-title>

    <v-container fluid>
      <v-sparkline
        :auto-line-width="autoLineWidth"
        :fill="fill"
        :gradient="gradient"
        :gradient-direction="gradientDirection"
        :label-size="labelSize"
        :labels="labels"
        :line-width="lineWidth"
        :padding="padding"
        :show-labels="true"
        :smooth="radius || false"
        :stroke-linecap="lineCap"
        :type="type"
        :value="values"
        auto-draw
      ></v-sparkline>
    </v-container>
  </v-card>
</template>

<script>
const gradients = [
  ['#222'],
  ['#42b3f4'],
  ['red', 'orange', 'yellow'],
  ['purple', 'violet'],
  ['#00c6ff', '#F0F', '#FF0'],
  ['#f72047', '#ffd200', '#1feaea'],
];

export default {
  props: {
    title: {
      required: true,
    },

    labels: {
      required: true,
    },

    values: {
      required: true,
    },
  },

  data: () => ({
    lineWidth: 1,
    labelSize: 3,
    radius: 10,
    padding: 8,
    lineCap: 'round',
    gradient: gradients[5],
    gradientDirection: 'top',
    gradients,
    fill: false,
    type: 'trend',
    autoLineWidth: false,
  }),
};
</script>
