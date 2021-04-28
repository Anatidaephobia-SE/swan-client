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
    const id = this.$route.params.postId
    this.getPostData(id)
  },
  computed: {
    post: function () {
      const post = {
        name: 'My Post',
        caption: 'Yooooo, SUP!',
        tag: 'Sales',
        team: 1,
        multimedia: '',
        status: 'Published',
        created_at: '2020-04-10 20:31:12',
        owner: {
          email: 'amir-esmaeili@outlook.com',
          first_name: 'Amir',
          last_name: 'Esmaeili',
          profile_picture: 'https://i.pravatar.cc/30'
        },
      }
      return post
    }
  }
}
</script>

<style scoped>

</style>