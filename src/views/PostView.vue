<template>
  <v-container>
    <Post :dialog="dialog" :key="key" @close="close" :edit-mode="true"/>
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
  mounted() {
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