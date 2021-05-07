<template>
  <v-container>
    <PostData/>
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

export default {
  name: "PostView",
  components: {PostComments, PostActions, PostVisualizer, PostData, Post},
  methods: {
    getPostData: function (id) {
      this.$store.dispatch('post/getPostById', id)
    }
  },
  mounted() {
    const id = this.$route.query.pID
    this.getPostData(id)
  },
  computed: {
  }
}
</script>

<style scoped>

</style>