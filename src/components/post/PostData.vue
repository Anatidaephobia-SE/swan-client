<template>
  <v-container class="pa-md4" v-if="!loading">
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text style="max-width: 720px; margin: auto">
      <p>This field is only for you, to find your posts quickly.</p>
      <v-text-field filled
                    v-model="name"
                    :rules="nameRule"
                    label="Name"
                    @input="setPostData"
                    placeholder="My First Post">
      </v-text-field>

      <p>Please enter the caption you want to post, then click on the "next" button.</p>
      <v-textarea
          :rules="rule"
          label="Your tweet"
          auto-grow filled
          v-model="caption"
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

export default {
  name: "PostData",
  data() {
    return {
      loading: false,
      valid: false,
      name: '',
      created_at: '',
      author: {},
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
    this.getPostAuthor();
    this.getPostData()
  },
  methods: {
    setPostData: function () {
      const newPost = {
        name: this.name,
        caption: this.caption,
        team: this.teamId
      }
      this.$store.dispatch('setPost', newPost);
    },
    getPostAuthor: function () {
      const author = this.$store.getters.getPostAuthor;
      if (author) {
        this.author = author
      }
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'SET_AUTHOR') {
          const author = state.post.author;
          if (author) {
            this.author = author
            this.created_at = state.post.newPost.created_at
          }
        }
      })
    },
    getPostData: function () {
      const data = this.$store.getters.getNewPost;
      this.name = data.name;
      this.caption = data.caption;
      this.created_at = data.created_at

      this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'SET_POST') {
          const post = state.post.newPost;
          this.name = post.name;
          this.caption = post.caption;
          this.created_at = post.created_at
        }
      })
    }
  },
  computed: {
    teamId: function () {
      return this.$store.getters.getTeamId
    },
    imageUrl: function () {
      return axios.defaults.baseURL + this.author.profile_picture;
    },
    date: function () {
      return new Date(this.created_at).toLocaleString('en-En')
    }
  }
}
</script>

<style scoped>

</style>