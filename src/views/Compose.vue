<template>
  <v-container>
    <PostData />
    <v-divider></v-divider>
    <PostVisualizer />
    <PostActions />
  </v-container>
</template>

<script>
import Post from "@/components/post/Post";
import PostData from "@/components/post/PostData";
import PostVisualizer from "@/components/post/PostVisualizer";
import PostActions from "@/components/post/PostActions";
export default {
  name: "Compose",
  components: {PostActions, PostVisualizer, PostData, Post},
  data() {
    return {
      dialog: false,
      key: Math.random()
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>

</style>