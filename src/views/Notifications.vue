<template>
  <v-container>
    <v-expansion-panels flat>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon class="mr-2">mdi-magnify</v-icon>
            Advanced Search
          </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                  v-model="searchKey"
                  filled
                  label="Search"
                  placeholder="e.g. My Favorite Notification"
                  rounded
                  @input="searchNotifications">
              </v-text-field>
            </v-col>

            <v-col class="justify-start" md="4">
              <v-select
                  v-model="searchStatus"
                  :items="status"
                  chips
                  deletable-chips
                  filled
                  label="Status"
                  multiple
                  rounded
                  small-chips
                  @input="searchNotifications">

              </v-select>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-row v-if="loading">
      <v-col v-for="p in 3" :key="p" cols="12" lg="3" md="4" sm="6" xl="3">
        <PostLoader/>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col v-for="n in filteredNotifications" :key="n.id" cols="12" lg="6" md="4" sm="6" xl="3">
        <Notification :notification="n" @clickedOn="goToNotification(n.id)"/>
      </v-col>
      <v-col
          class="text-center"
          cols="12"
          v-if="notifications.length === 0">
        <v-img
            max-height="400"
            contain
            :src="require('@/assets/graphics/blank.svg')"/>
        <span>It's empty here, add a notification now!</span>
      </v-col>
      <v-col
          class="text-center"
          cols="12"
          v-else-if="filteredNotifications.length === 0">
        <v-img
            max-height="400"
            contain
            :src="require('@/assets/graphics/empty.svg')"/>
        <span>Not a single one!</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Notification from "@/components/notification/Notification";
import PostLoader from "@/components/post/PostLoader";

export default {
  name: "Notifications",
  components: {
    PostLoader,
    Notification
  },
  data() {
    return {
      notifications: [],
      filteredNotifications: [],
      selectedNotificationId: 0,
      key: Math.random(),
      searchKey: '',
      searchStatus: [],
      loading: false
    }
  },
  mounted() {
    this.getAllPosts()
  },
  methods: {
    getAllPosts: function () {
      this.loading = true
      const teamID = this.$route.params.workspace
      this.$store.dispatch('notification/getAllNotifications', teamID).then(resp => {
        console.log(resp.data)
        this.notifications = resp.data
        this.filteredNotifications = this.notifications
        this.loading = false
      }).catch()
    },
    goToNotification: function (id) {
      this.selectedNotificationId = id
      this.routeToSelectedNotificationsId()
    },
    routeToSelectedNotificationsId() {
      this.$router.push({path: 'notification', query: {nID: this.selectedNotificationId}})
    },
    searchNotifications: function () {
      const keyword = this.searchKey.toLowerCase()
      this.filteredNotifications = this.notifications.filter(p => p.name.toLowerCase().includes(keyword))
      if (this.searchStatus.length > 0) {
        const status = this.searchStatus
        this.filteredNotifications = this.filteredNotifications.filter(p => status.includes(p.status))
      }
    }
  },
  computed: {
    status: function () {
      return ['Drafts', 'Send', 'Schedule']
    }
  }
}
</script>

<style>

</style>