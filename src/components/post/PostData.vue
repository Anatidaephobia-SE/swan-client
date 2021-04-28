<template>
  <v-container class="pa-md4" v-if="!loading">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
      <p>This field is only for you, to find your posts quickly.</p>
      <v-text-field filled
                    :disabled="!canEdit"
                    v-model="post.name"
                    :rules="nameRule"
                    label="Name"
                    @input="setPostData"
                    placeholder="My First Post">
      </v-text-field>

      <p>Set a tag for your post, it makes them organized and easy to find.</p>
      <v-select
        :items="tags"
        :disabled="!canEdit"
        filled
        label="Tag"
        v-model="post.tag"
        @input="setPostData"
        ></v-select>

      <p>Please enter the caption you want to post, then click on the "next" button.</p>
      <v-textarea
          :rules="rule"
          label="Your tweet"
          :disabled="!canEdit"
          auto-grow filled
          v-model="post.caption"
          @input="setPostData"
          counter >
      </v-textarea>

      <div v-if="author.email">
        <span>Created By:</span>
        <div class="ma-4 d-flex align-center">
          <v-avatar class="ma-2" size="40px">
            <v-img v-if="author.profile_picture" :src="imageUrl"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <div>
            <span>{{author.first_name}} {{author.last_name}}</span>
            <br>
            <span style="font-size: x-small">{{date}}</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
  name: "PostData",
  data() {
    return {
      loading: false,
      valid: false,
      rule: [
          v => !!v || 'This field is required',
          v => (v || '').length <= 250 || 'Maximum length is over !'
      ],
      nameRule: [
          v => !!v || 'This field is required',
          v => (v || '').length >= 4 || 'Name must be at least 4 character'
      ]
    }
  },
  created() {
  },
  methods: {
    setPostData: function () {
      const post = {
        name: this.post.name,
        caption: this.post.caption,
        tag: this.post.tag,
        team: this.$route.params.workspace
      }
      this.$store.commit('post/SET_POST_DATA', post);
    },
  },
  computed: {
    teamId: function () {
      return this.$store.getters.getTeamId
    },
    imageUrl: function () {
      return axios.defaults.baseURL + this.author.profile_picture;
    },
    date: function () {
      return new Date(this.post.created_at).toLocaleString('en-En')
    },
    tags: function () {
      return ['-', 'Holiday', 'Sales', 'Ad']
    },
    ...mapState('post', ['author', 'post', 'canEdit'])
  }
}
</script>

<style scoped>

</style>