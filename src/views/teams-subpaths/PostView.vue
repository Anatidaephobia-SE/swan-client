<template>
  <v-container v-if="loading">
    <PostData/>
    <v-divider></v-divider>
    <TweetInfo v-if="post.status !== 'Drafts'"/>
    <v-divider></v-divider>
    <PostVisualizer/>
    <v-divider></v-divider>
    <PostActions/>
    <v-divider></v-divider>
    <PostComments/>
  </v-container>
</template>

<script>
import PostActions from "@/components/post/PostActions";
import PostVisualizer from "@/components/post/PostVisualizer";
import PostData from "@/components/post/PostData";
import Post from "@/components/post/Post";
import PostComments from "@/components/post/PostComments";
import TweetInfo from "@/components/post/TweetInfo";
import {mapMutations, mapState} from "vuex";

export default {
  name: "PostView",
  components: {TweetInfo, PostComments, PostActions, PostVisualizer, PostData, Post},
  data() {
    return {
      loading: false
    }
  },
  methods: {
    ...mapMutations('post', ['RESET']),
    getPostData: function (id) {
      this.$store.dispatch('post/getPostById', id).then(() => this.loading = true)
    }
  },
  mounted() {
    const id = this.$route.query.pID
    this.getPostData(id)
  },
  computed: {
    ...mapState('post', ['post'])
  },
  beforeDestroy() {
    this.RESET()
  }
}
</script>

<style scoped>

</style>