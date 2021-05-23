<template>
  <v-dialog
      v-model="dialog"
      max-width="1000"
      @click:outside="close(false)"
      transition="dialog-bottom-transition">
    <v-card>
      <v-card-title>
        Select A Time To Schedule
      </v-card-title>
      <v-divider></v-divider>
      <v-container class="pa-md-4">
        <v-row>
          <v-col>
            <v-card-title>
              <v-icon style="margin-right: 8px">mdi-calendar</v-icon>
              Select Date:
            </v-card-title>
            <v-date-picker
                v-model="selected_date"
                full-width
                color="primary">
            </v-date-picker>
          </v-col>

          <v-col>
            <v-card-title>
              <v-icon style="margin-right: 8px">mdi-clock</v-icon>
              Select Time:
            </v-card-title>
            <v-time-picker
                full-width
                v-model="selected_time"
                color="primary"
                format="24hr">
            </v-time-picker>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer />
          <v-btn
              color="accent"
              depressed
              @click="closeDialog(true)">
            Schedule
          </v-btn>
        </v-card-actions>
      </v-container>

    </v-card>

  </v-dialog>
</template>

<script>

export default {
  name: "Scheduling",
  props: {
    dialog: Boolean
  },
  data() {
    return {
      selected_time: null,
      selected_date: new Date().toISOString().substr(0, 10),
      now: Date.now(),
    }
  },

  methods: {
    addSchedule: function () {
      console.log(this.selected_time)
      console.log(this.selected_date)
    },
    closeDialog: function (job) {
      console.log(job)
      if (job) {
        this.$emit('close-dialog', `${this.selected_date} ${this.selected_time}`)
      } else {
        this.$emit('close-dialog', null)
      }
    }
  },
}
</script>

<style scoped>
</style>