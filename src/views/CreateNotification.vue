<template>
  <v-container v-if="!loading">
      <NotificationParams />
      <v-divider></v-divider>
      <NotificationActions />
  </v-container>
  <v-container v-else>
    <PostViewLoader />
  </v-container>
</template>

<script>

import NotificationActions from "@/components/notification/NotificationActions";
import NotificationParams from "@/components/notification/NotificationParams";

export default {
  name: "CreateNotification",
  components: {NotificationActions, NotificationParams},
  data() {
    return {
      loading: false
    }
  },
  methods: {
  },
  mounted() {

  },
  computed: {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped>

</style>