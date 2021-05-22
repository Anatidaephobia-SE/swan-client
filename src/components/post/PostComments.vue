<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-comment-outline</v-icon>
      Comments
    </v-card-title>
    <v-card-text>
      <p>You can share your ideas around this post with your teammates.</p>
      <v-form
          ref="commentForm"
          v-model="valid"
          class="py-4"
          style="max-width: 750px; margin: auto"
          @submit.prevent="addComment">
        <div class="ma-2">
          <v-avatar class="mr-2" size="40">
            <v-img v-if="user.profile_picture" :src="imageUrl"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
          <span>{{ user.first_name }} {{ user.last_name }}:</span>
        </div>
        <v-textarea v-model="context"
                    :rules="rule"
                    auto-grow
                    clearable
                    counter
                    filled
                    label="New Comment"
                    rows="2"></v-textarea>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" color="primary" depressed type="submit">Send</v-btn>
        </v-card-actions>
      </v-form>
    </v-card-text>
    <PostComment
        v-for="c in comments"
        :key="c.id" :comment="c" @changed="getAllComments"/>
  </v-container>
</template>

<script>
import PostComment from "@/components/post/PostComment";
import axios from "axios";
import {mapState} from "vuex";

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
      comments: []
    }
  },
  created() {
    this.getAllComments()
    console.log(this.user)
  },
  methods: {
    addComment: function () {
      this.$store.dispatch('post/addComment', {context: this.context})
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
      const id = this.$route.query.pID
      this.$store.dispatch('post/getComments', id).then(resp => {
        this.comments = resp.data.reverse()
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    imageUrl: function () {
      return axios.defaults.baseURL + this.user.profile_picture
    },
    ...mapState({user: state => state.auth.user})
  }
}
</script>

<style scoped>

</style>