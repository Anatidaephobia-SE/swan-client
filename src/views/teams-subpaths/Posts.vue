<template>
  <v-container>
    <v-row>
      <v-col v-for="p in posts" :key="p.id" cols="12" lg="3" md="4" sm="6" xl="3">
        <Post @clickedOn="goToPost(p.id)" :post="p"/>

      </v-col>
    </v-row>

    <PostDialog @close="closeDialog" :dialog="dialog" :edit-mode="true" :key="key" :id="selectedPostId" />
  </v-container>
</template>

<script>
import Post from "@/components/workspaces/team/Post"
import PostDialog from '@/components/post/Post'

export default {
  name: "Posts",
  components: {
    Post,
    PostDialog
  },
  data() {
    return {
      posts: [],
      selectedPostId: 0,
      dialog: false,
      key: Math.random()
    }
  },
  created() {
    this.getAllPosts()
  },
  methods: {
    getAllPosts: function () {
      setTimeout(() => {
        const teamID = this.$store.getters.getTeamId
        this.$store.dispatch('getAllPosts',teamID).then(resp => {
          this.posts = resp.data
        }).catch()
      }, 1000);
    },
    goToPost: function (id) {
      this.selectedPostId = id
      this.dialog = true
      this.routeToSelectedPostId()
    },
    closeDialog: function () {
      this.$store.dispatch('reset')
      this.selectedPostId = ''
      this.dialog = false
      setTimeout(() => this.key = Math.random(), 300)
    },
    routeToSelectedPostId() {
      this.$router.push(`${this.$route.path}/${this.selectedPostId}`)
    }
  }
}
</script>

<style>

</style>