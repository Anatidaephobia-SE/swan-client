<template>
  <v-card class="text-capitalize pa-2 ma-2 v-card--hover" outlined width="300">
    <div @click="$emit('clickedOn')">
    <v-card-title>
      {{ notification.name }}
    </v-card-title>
    <v-card-subtitle>
      <v-chip :color="statusColor" x-small>{{ notification.status }}
        <span v-if="notification.schedule_time">
          -{{date}}
        </span>
      </v-chip>

    </v-card-subtitle>
    </div>

    <v-card-actions>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="expand = !expand"
      >
        <v-icon>{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="expand">
        <v-divider></v-divider>

        <v-card-text>
          <p>
            Sender: {{ notification.sender }}
          </p>
          <p>
            subject: {{ notification.subject }}
          </p>
          <p class="mt-2">
            Body:
          </p>
          <p class="ml-2">
          {{ notification.body_text }}
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "Notification",
  components: {},
  props: {
    notification: Object
  },
  data() {
    return {
      expand: false,
      selectedNotificationId: 0,
    }
  },
  computed: {
    statusColor: function () {
      const colors = {
        'Drafts': 'info',
        'Sent': 'primary'
      }
      return colors[this.notification.status]
    },
    date: function () {
      return new Date(this.notification.schedule_time).
      toLocaleString('en-En', {
        year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false
      })
    },
  },
  methods: {
    goToNotification: function (id) {
      this.selectedNotificationId = id
      this.routeToSelectedNotificationsId()
    },
    routeToSelectedNotificationsId() {
      this.$router.push({path: 'notification', query: {pID: this.selectedNotificationId}})
    },
  }
}
</script>

<style>
.notificationText {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>