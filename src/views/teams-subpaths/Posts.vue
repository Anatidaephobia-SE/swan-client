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
                  placeholder="e.g. My Favorite Post"
                  rounded
                  @input="searchPost">
              </v-text-field>
            </v-col>
            <v-col class="justify-start" md="4">
              <v-select
                  v-model="searchTag"
                  :items="tags"
                  chips
                  deletable-chips
                  filled
                  label="Tag"
                  multiple
                  rounded
                  small-chips
                  @input="searchPost">

              </v-select>
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
                  @input="searchPost">

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
      <v-col v-for="p in filteredPosts" :key="p.id" cols="12" lg="3" md="4" sm="6" xl="3">
        <Post :post="p" @clickedOn="goToPost(p.id)"/>
      </v-col>
      <v-col
          class="text-center"
          cols="12"
          v-if="posts.length === 0">
        <v-img
            max-height="400"
            contain
            :src="require('@/assets/graphics/blank.svg')"/>
        <span>It's empty here, add a post now!</span>
      </v-col>
      <v-col
          class="text-center"
          cols="12"
          v-else-if="filteredPosts.length === 0">
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
import Post from "@/components/workspaces/team/Post"
import PostDialog from '@/components/post/Post'
import PostLoader from "@/components/post/PostLoader";

export default {
  name: "Posts",
  components: {
    PostLoader,
    Post,
    PostDialog
  },
  data() {
    return {
      posts: [],
      filteredPosts: [],
      selectedPostId: 0,
      dialog: false,
      key: Math.random(),
      searchKey: '',
      searchTag: [],
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
      this.$store.dispatch('post/getAllPosts', teamID).then(resp => {
        this.posts = resp.data
        this.filteredPosts = this.posts
        this.loading = false
      }).catch()
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
      this.$router.push({path: 'post', query: {pID: this.selectedPostId}})
    },
    searchPost: function () {
      const keyword = this.searchKey.toLowerCase()
      this.filteredPosts = this.posts.filter(p => p.name.toLowerCase().includes(keyword))
      if (this.searchTag.length > 0) {
        const tags = this.searchTag
        this.filteredPosts = this.filteredPosts.filter(p => tags.includes(p.tag))
      }
      if (this.searchStatus.length > 0) {
        const status = this.searchStatus
        this.filteredPosts = this.filteredPosts.filter(p => status.includes(p.status))
      }
    }
  },
  computed: {
    tags: function () {
      return ['Sales', 'Ads', 'Branding', 'News', 'Quote', 'Celebration']
    },
    status: function () {
      return ['Drafts', 'Published', 'Scheduled']
    }
  }
}
</script>

<style>

</style>