<template>
  <v-container>
    <Post :dialog="dialog" :key="key" @close="close" />
    <v-btn @click="dialog = !dialog">Click</v-btn>
  </v-container>
</template>

<script>
import Post from "@/components/post/Post";
export default {
  name: "PostView",
  components: {Post},
  data() {
    return {
      dialog: false,
      key: Math.random()
    }
  },
  methods: {
    close: function () {
      this.dialog = false;
      setTimeout(() => this.key = Math.random(), 500);
    }
  }
}
</script>

<style scoped>

</style>