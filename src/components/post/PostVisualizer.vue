<template>
  <v-container class="pa-md-4">
    <v-card-title>
      <v-icon class="mr-2">mdi-eye</v-icon>
      How people will see
    </v-card-title>
    <v-card
        class="mx-auto ma-4 pa-4"
        max-width="700">
          <v-row>
            <v-col cols="2" md="1">
            <v-avatar
                class="profile"
                color="grey"
                size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
            </v-col>
            <v-col cols="10" md="11">
              <v-card-title class="mt-0 pt-0">Amir Esmaeili</v-card-title>
              <v-card-subtitle>@amiresm17</v-card-subtitle>
            </v-col>
          </v-row>
      <div class="pa-2">
          <p>
            {{this.post.caption}}
          </p>
      </div>
      <div class="d-flex justify-space-around pa-2">
        <v-icon>mdi-comment-outline</v-icon>
        <v-icon>mdi-repeat</v-icon>
        <v-icon>mdi-heart-outline</v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PostVisualizer",
  data() {
    return {
      post: {
        caption: '',
        media: ''
      }
    }
  },
  mounted() {
    this.post.caption = this.$store.getters.getNewPost.caption
    this.getPostCaption()
  },
  methods: {
    getPostCaption: function () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'SET_POST') {
          console.log("Hello")
          this.post.caption = state.post.newPost.caption
        }
      })
    }
  },
  watch: {
  }
}
</script>

<style scoped>

</style>