<template>
  <v-card class="text-capitalize pa-4 ma-2 v-card--hover" outlined width="700">
    <div @click="$emit('clickedOn')">
    <v-card-title>
      {{ post.name }}
    </v-card-title>
    <v-card-subtitle>
      {{ date }}
    </v-card-subtitle>
    <v-card-subtitle>
      <v-chip :color="statusColor" x-small>{{ post.status }}</v-chip>
      <v-chip v-if="post.tag" dark :color="tagColor" x-small class="ml-1">{{ post.tag }}</v-chip>
    </v-card-subtitle>
    </div>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Expand
      </v-btn>

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
            Sender: {{ post.sender }}
          </p>
          <p>
            subject: {{ post.subject }}
          </p>
          <p class="mt-2">
            Body:
          </p>
          <p class="ml-2">
          {{ post.body_text }}
          </p>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

import axios from "axios";

export default {
  name: "Post",
  components: {},
  props: {
    post: Object
  },
  data() {
    return {
      hasImg: false,
      expand: false,
      selectedNotificationId: 0,
    }
  },
  computed: {
    date: function () {
      return new Date(this.post.created_at).toLocaleString('en-En',
          {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric'})
    },
    imageUrl: function () {
      return axios.defaults.baseURL + this.post.owner.profile_picture
    },
    statusColor: function () {
      const colors = {
        'Drafts': 'info',
        'Published': 'primary'
      }
      return colors[this.post.status]
    },
    tagColor: function () {
      const colors = {
        'Sales': '#D32F2F',
        'Ads': '#C2185B',
        'Branding': '#7B1FA2',
        'News': '#512DA8',
        'Quote': '#303F9F',
        'Celebration': '#1976D2'
      }
      return colors[this.post.tag]
    }

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
.postText {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>