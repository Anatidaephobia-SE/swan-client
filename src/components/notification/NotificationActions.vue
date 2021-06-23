<template>
  <v-container class="pa-md-4">

    <Scheduling :dialog="dialog" @close-dialog="addScheduling"/>
    <v-card-title>
      <v-icon class="mr-2">mdi-checkbox-marked-outline</v-icon>
      Actions
    </v-card-title>
    <v-card-subtitle v-if="notification.status">
      Current State:
      <v-chip :color="statusType.color" x-small>
        {{ statusType.label.toUpperCase() }}
        <span v-if="notification.status === 'Schedule'">
          - {{ new Date(notification.schedule_time).toLocaleString() }}
        </span>
      </v-chip>
    </v-card-subtitle>
    <v-card-text>
      <p>Now you're done with creating your notification, select the action you want to do with it.</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-for="(b, i) in buttons"
             :key="i"
             :color="b.color"
             :disabled="b.type === 'Delete' ? false: !canEdit"
             :loading="loading[b.type]"
             :x-small="$vuetify.breakpoint.smAndDown"
             depressed
             ref="btn"
             @click="b.action(b.type)">{{ b.label }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <Dialog
        header="Delete Notification?"
        :show="deleteConfirmation"
        text="Are you sure you want to delete this notification?"
        @close-dialog="deleteNotification"
    />
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import Scheduling from "@/components/post/Scheduling";
import Dialog from "@/components/shared/Dialog";

export default {
  name: "PostActions",
  components: {Dialog, Scheduling},
  data() {
    return {
      buttons: [
        {label: 'Send', color: 'primary', type: 'Send', action: this.action},
        {
          label: 'Schedule', color: 'accent', type: 'Schedule', action: () => {
            this.dialog = true
          }
        },
        {label: 'Draft', color: 'info', type: 'Draft', action: this.action},
        {label: 'Remove', color: 'error', type: 'Delete', action: () => this.deleteConfirmation = true}
      ],
      dialog: false,
      deleteConfirmation: false,
      loading: {
        Send: false,
        Schedule: false,
        Drafts: false,
        Delete: false
      }
    }
  },
  methods: {
    action: async function (status) {
      this.loading[status] = true
      this.$store.commit('notification/SET_STATUS', status)
      if (this.update) {
        await this.updateNotification()
      } else {
        await this.createNotification()
      }
    },
    createNotification: async function () {
      const status = this.notification.status
      this.$store.dispatch('notification/createNewNotification').then((resp) => {
        const message = "new notification created successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        const notificationID = resp.data.id
        this.$router.push({name: 'NotificationCompleteView', query: {nID: notificationID}})
      }).catch(err => {
        console.log(err.response)
        let message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
        this.$store.commit('notification/SET_STATUS', '')
      }).finally(() => {
        this.loading[status] = false
      })
    },
    updateNotification: function () {
      const status = this.notification.status
      this.$store.dispatch('notification/updateNotification').then(() => {
        const message = "Notification updated successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        console.log(err.response.data)
        let message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
        this.$store.commit('notification/SET_STATUS', '')
      }).finally(() => this.loading[status] = false)
    },
    addScheduling: function (result) {
      this.dialog = false
      console.log(result)
      if (result) {
        this.notification.schedule_time = result
        this.action('Schedule')
      }
    },
    deleteNotification: function (response) {
      this.deleteConfirmation = false
      this.loading.Delete = true
      if (response) {
        this.$store.dispatch('notification/deleteNotification').then(() => {
          const message = "Notification deleted successfully";
          this.$store.dispatch('showMessage', {message, color: 'success'});
          this.$router.push({name: 'Notification'})
        }).catch(err => {
          const message = err.response.data.message
          this.$store.dispatch('showMessage', {message, color: 'error'})
        }).finally(() => this.loading.Delete = false)
      }
    }
  },
  computed: {
    statusType: function () {
      return this.buttons.filter(b => b.type === this.notification.status)[0]
    },
    ...mapState('notification', ['notification', 'update', 'canEdit'])
  }
}
</script>

<style scoped>
</style>