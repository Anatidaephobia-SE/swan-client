<template>
  <v-container class="pa-md-4">
    <v-card-title>
      <v-icon class="mr-2">mdi-eye</v-icon>
      How people will see
    </v-card-title>
    <v-card
        outlined
        class="mx-auto ma-4 pa-4"
        max-width="700">
      <v-row>
        <v-col cols="2" md="1">
          <v-avatar
              class="profile"
              color="grey"
              size="50">
            <v-img :src="twitter.profile_image"></v-img>
          </v-avatar>
        </v-col>
        <v-col cols="10" md="11">
          <v-card-title class="mt-0 pt-0">{{ twitter.name }}</v-card-title>
          <v-card-subtitle>@{{ twitter.screen_name }}</v-card-subtitle>
        </v-col>
      </v-row>
      <div class="pa-2 ml-16">
        <p ref="caption">
          {{ this.post.caption }}
        </p>
        <MultiMediaVisualizer/>
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
import {mapState} from 'vuex'
import MultiMediaVisualizer from "@/components/post/MultiMediaVisualizer";

export default {
  name: "PostVisualizer",
  components: {MultiMediaVisualizer},
  data() {
    return {
      postSub: '',
      twitter: {
        name: '',
        profile_image: '',
        screen_name: ''
      }
    }
  },
  mounted() {
    this.getTwitter()
  },
  methods: {
    getTwitter: function () {
      this.$store.dispatch('getTwitterAccount', this.workspaceId).then(resp => {
        const data = resp.data
        this.twitter = {
          name: data.name,
          profile_image: data.profile_image,
          screen_name: data.screen_name
        }
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapState('post', ['post']),
    workspaceId: function () {
      return this.$route.params.workspace
    }
  },
  watch: {}
}
</script>

<style scoped>

</style>