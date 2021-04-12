<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-comment-outline</v-icon>
      Comments
    </v-card-title>
    <v-card-text>
      <p>You can share your ideas around this post with your teammates.</p>
      <v-form v-model="valid"
              ref="commentForm"
              @submit.prevent="addComment"
              style="max-width: 750px; margin: auto"
              class="py-4">
        <div class="ma-2">
          <v-avatar size="40" class="mr-2">
            <v-img :src="imageUrl" v-if="user.profile_picture"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <span>{{user.first_name}} {{user.last_name}}:</span>
        </div>
      <v-textarea label="New Comment"
                  clearable
                  rows="2"
                  filled
                  auto-grow
                  v-model="context"
                  counter
                  :rules="rule"></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn type="submit" :disabled="!valid" depressed color="primary">Send</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text >
    <PostComment
        @changed="getAllComments"
        v-for="c in comments" :key="c.id" :comment="c"/>
  </v-container>
</template>

<script>
import PostComment from "@/components/post/PostComment";
import axios from "axios";
export default {
  name: "PostComments",
  components: {PostComment},
  data() {
    return {
      valid: false,
      context: '',
      rule: [
          v => !!v || 'This field is required',
          v => (v || '').length <= 250 || 'You passed the maximum characters'
      ],
      user: {},
      comments: []
    }
  },
  mounted() {
    this.getUserInfo()
    this.getAllComments()
  },
  methods: {
    getUserInfo: function () {
      this.user = this.$store.getters.userInfo
    },
    addComment: function () {
      this.$store.dispatch('addComment', {context: this.context})
      .then(() => {
        const message = "New comment is added!"
        this.$store.dispatch('showMessage', {message, color: 'success'})
        this.getAllComments()
        this.$refs.commentForm.reset()
      }).catch(err => {
        const message = err.response.data.error
        this.$store.dispatch('showMessage', {message, color: 'error'})
      });
    },
    getAllComments: function () {
      this.$store.dispatch('getComments').then(resp => {
        this.comments = resp.data.reverse()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    imageUrl: function () {
      return axios.defaults.baseURL + this.user.profile_picture
    }
  }
}
</script>

<style scoped>

</style>