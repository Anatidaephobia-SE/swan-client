
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
import {mapMutations, mapState} from "vuex";
import PostViewLoader from "@/components/post/PostViewLoader";
import NotificationActions from "@/components/notification/NotificationActions";
import NotificationParams from "@/components/notification/NotificationParams";

export default {
  name: "NotificationCompleteView",
  components: {PostViewLoader, NotificationActions, NotificationParams},
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations('notification', ['RESET']),
    getNotificationData: function (id) {
      this.loading = true
      this.$store.dispatch('notification/getnotificationById', id).then(() => this.loading = false)
    }
  },
  mounted() {
    const id = this.$route.query.nID
    this.getNotificationData(id)
  },
  computed: {
    ...mapState('notification', ['notification'])
  },
  beforeDestroy() {
    this.RESET()
  }
}
</script>

<style scoped>

</style>