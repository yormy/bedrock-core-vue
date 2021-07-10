<template>
  <div>
    <v-menu
      ref="menu"
      v-model="dropdownOpen"
      :close-on-content-click="false"
      :nudge-right="40"
      :return-value.sync="model"
      max-width="560px"
      min-width="560px"
      offset-y
      transition="scale-transition">
      <template v-slot:activator="{ on }">
        <v-text-field
          v-model="displayDate"
          v-on="on"
          label="Date Time"
          prepend-icon="event"
          readonly
        ></v-text-field>
      </template>

      <div class="v-date-time-widget-container">
        <v-layout row wrap>
          <v-flex sm6 xs12>
            <v-date-picker
              v-model="dateModel"
              color="primary"
              width="240"></v-date-picker>

          </v-flex>
          <v-flex sm6 xs12>
            <v-btn :color="getMeridiamButtonColor('AM')"
                   class="btn-am"
                   fab
                   small @click="meridiam='AM'">AM
            </v-btn>

            <v-btn
              :color="getMeridiamButtonColor('PM')"
              class="btn-pm" fab
              small
              @click="meridiam='PM'">PM
            </v-btn>

            <v-time-picker
              v-if="dropdownOpen"
              v-model="timeModel"
              :no-title="true"
              color="primary"
              width="240"></v-time-picker>

            <h3 class="text-xs-center">{{ currentSelection }}</h3>
          </v-flex>

          <v-flex class="text-xs-center" xs12>
            <v-btn small text @click="dropdownOpen = false">Cancel</v-btn>
            <v-btn small text @click="confirm()">Ok</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      meridiam: 'AM',
      displayDate: '',
      dateModel: '',
      timeModel: '',
      monthNames: [
        "Jan", "Feb", "Mar",
        "Apr", "May", "June", "Jul",
        "Aug", "Sept", "Oct",
        "Nov", "Dec"
      ]
    };
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(model) {
      }
    },

    currentSelection() {
      let selectedTime = this.timeModel + ' ' + this.meridiam
      return this.formatDate(this.dateModel) + ' ' + selectedTime;
    }
  },

  methods: {
    formatDate(date) {
      if (!date) return '';

      const [year, month, day] = date.split('-')
      let monthName = this.monthNames[parseInt(month)]
      return `${monthName} ${day}, ${year}`;
    },

    // Confirm the datetime selection and close the popover
    confirm() {
      this.onUpdateDate();
      this.dropdownOpen = false
    },

    // Format the date and trigger the input event
    onUpdateDate() {
      if (!this.dateModel || !this.timeModel) return false;

      let selectedTime = this.timeModel + ' ' + this.meridiam
      this.displayDate = this.formatDate(this.dateModel) + ' ' + selectedTime
      this.$emit('input', this.dateModel + ' ' + selectedTime);
    },

    // Set the active state for the meridiam buttons
    getMeridiamButtonColor(m) {
      if (m === this.meridiam) {
        return 'primary';
      } else {
        return 'darkgray';
      }
    },
  },

  mounted() {
    // Set the current date and time as default value
    var d = new Date();
    var currentHour = d.getHours() % 12; // AM,PM format
    var minutes = (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
    var currentTime = currentHour + ':' + minutes;
    this.timeModel = currentTime;
    this.dateModel = d.toISOString().substr(0, 10);

    if (d.getHours() >= 12) {
      this.meridiam = 'PM';
    }
  }
};
</script>
<style scoped>
.v-date-time-widget-container {
  background: white;
  padding: 15px
}

.v-card {
  box-shadow: none
}

.btn-am {
  float: left;
}

.btn-pm {
  float: right
}

.v-date-picker-table {
  height: auto;
}
</style>
