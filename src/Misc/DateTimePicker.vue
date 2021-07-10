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
          :label="label"
          prepend-icon="fal fa-calendar-day"
          readonly
        ></v-text-field>
      </template>

      <div class="v-date-time-widget-container">
        <div class="d-flex justify-content-center mb-0">
          <h3>{{ modalTitle }}</h3>
        </div>
        <div class="d-flex justify-content-center mb-5">
          {{ description }}
        </div>

        <v-layout row wrap>
          <v-flex sm6 xs12>
            <v-date-picker
              v-model="dateModel"
              width="240"
              color="primary"
            >
            </v-date-picker>
          </v-flex>

          <v-flex sm6 xs12>
            <v-time-picker
              :allowed-minutes="allowedStep"
              format="24hr"
              v-if="dropdownOpen"
              v-model="timeModel"
              :no-title="true"
              color="primary"
              width="280">
            </v-time-picker>
            <div class="text-center"><strong>{{ currentSelection }}</strong></div>
          </v-flex>

        </v-layout>

        <div class="d-flex justify-content-end mx-3 mb-3">
          <button class="btn text-link" @click="dropdownOpen = false">{{ $t('bedrock-core.action.cancel') }}</button>
          <button class="btn btn-primary" @click="confirm()">{{ $t('bedrock-core.action.select') }}</button>
        </div>

      </div>

    </v-menu>
  </div>
</template>

<script>
export default {
  props: {

    label: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    current: {
      type: String,
      required: false,
    }

  },

  data() {
    return {
      dropdownOpen: false,
      displayDate: '',
      dateModel: '',
      timeModel: '',
      monthNames: []
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

    modalTitle() {
      if (!this.title) {
        return this.label;
      }
      return this.title;
    },

    currentSelection() {
      return this.formatDate(this.dateModel) + ' ' + this.timeModel;
    }
  },

  created() {
    this.monthNames.push(
      this.$t('bedrock-core.general.month_abbrev.jan'),
      this.$t('bedrock-core.general.month_abbrev.feb'),
      this.$t('bedrock-core.general.month_abbrev.mar'),
      this.$t('bedrock-core.general.month_abbrev.apr'),
      this.$t('bedrock-core.general.month_abbrev.may'),
      this.$t('bedrock-core.general.month_abbrev.jun'),
      this.$t('bedrock-core.general.month_abbrev.jul'),
      this.$t('bedrock-core.general.month_abbrev.aug'),
      this.$t('bedrock-core.general.month_abbrev.sep'),
      this.$t('bedrock-core.general.month_abbrev.okt'),
      this.$t('bedrock-core.general.month_abbrev.nov'),
      this.$t('bedrock-core.general.month_abbrev.dec')
    );

    this.setInitialDateTime(this.current);
  },
}
,

methods: {
  allowedStep: m => m % 15 === 0,

    setInitialDateTime(dateTime)
  {
    const [date, time] = dateTime.split(' ')

    // set the internal value to the parsed value without seconds
    // this way when posting unchanged values and changed values never have seconds
    // and the backend can validate on not having seconds
    this.$emit('input', date + " " + this.formatTime(time));

    const dateTimeFormatted = this.formatDate(date) + " " + this.formatTime(time);
    this.displayDate = dateTimeFormatted;
  }
,

  formatDate(date)
  {
    if (!date) return '';

    const [year, month, day] = date.split('-')
    let monthName = this.monthNames[parseInt(month) - 1]
    return `${monthName} ${day}, ${year}`;
  }
,

  formatTime(time)
  {
    const [hours, minutes, seconds] = time.split(':')
    return `${hours}:${minutes}`;
  }
,

  // Confirm the datetime selection and close the popover
  confirm()
  {
    this.onUpdateDate();
    this.dropdownOpen = false
  }
,

  // Format the date and trigger the input event
  onUpdateDate()
  {
    if (!this.dateModel || !this.timeModel) return false;

      let selectedTime = this.timeModel
      this.displayDate = this.formatDate(this.dateModel) + ' ' + selectedTime
      this.$emit('input', this.dateModel + ' ' + selectedTime);
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
  }
};
</script>
<style scoped>
.v-date-time-widget-container {
  background: white;
  padding: 15px
}

.v-date-picker-table {
  height: auto;
}
</style>
