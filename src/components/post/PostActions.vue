
<template>
  <v-container class="pa-md-4">

    <Scheduling :dialog="dialog" :time="post.schedule_time" @close-dialog="addScheduling"/>
    <v-card-title>
      <v-icon class="mr-2">mdi-checkbox-marked-outline</v-icon>
      Actions
    </v-card-title>
    <v-card-subtitle v-if="post.status">
      Current State:
      <v-chip :color="statusType.color" x-small>{{ statusType.label.toUpperCase() }}</v-chip>
    </v-card-subtitle>
    <v-card-text>
      <p>Now you're done with creating your content, select the action you want to do with it.</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn v-for="(b, i) in buttons"
             :key="i"
             :color="b.color"
             :disabled="!canEdit"
             :loading="loading[b.type]"
             :x-small="$vuetify.breakpoint.mobile"
             depressed
             ref="btn"
             @click="b.action(b.type)">{{ b.label }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import Scheduling from "@/components/post/Scheduling";

export default {
  name: "PostActions",
  components: {Scheduling},
  data() {
    return {
      buttons: [
        {label: 'publish', color: 'primary', type: 'Published', action: this.action},
        {
          label: 'schedule', color: 'accent', type: 'Schedule', action: () => {
            this.dialog = true
          }
        },
        {label: 'draft', color: 'info', type: 'Drafts', action: this.action},
        {label: 'remove', color: 'error', type: 'Delete', action: this.deletePost}
      ],
      dialog: false,
      loading: {
        Published: false,
        Schedule: false,
        Drafts: false,
        Delete: false
      }
    }
  },
  mounted() {
  },
  methods: {
    action: async function (status) {
      this.loading[status] = true
      this.$store.commit('post/SET_STATUS', status)
      if (this.update) {
        await this.updatePost()
      } else {
        await this.createPost()
      }
    },
    createPost: async function () {
      const status = this.post.status
      this.$store.dispatch('post/createNewPost').then((resp) => {
        const message = "new post created successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        const postID = resp.data.id
        this.$router.push({name: 'PostView', query: {pID: postID}})
      }).catch(err => {
        let message = err.response.data.error;
        if (!message) {
          const errCode = err.response.status
          if (errCode === 400) {
            message = "Please check your post again, it has some problems"
          }
        }
        this.$store.dispatch('showMessage', {message, color: 'error'});
        this.$store.commit('post/SET_STATUS', '')
      }).finally(() => {
        this.loading[status] = false
      })
    },
    updatePost: function () {
      const status = this.post.status
      this.$store.dispatch('post/updatePost').then(() => {
        const message = "Post updated successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        let message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
        this.$store.commit('post/SET_STATUS', '')
      }).finally(() => this.loading[status] = false)
    },
    addScheduling: function (result) {
      this.dialog = false
      console.log(result)
      if (result) {
        this.post.schedule_time = result
        this.action('Schedule')
      }
    },
    deletePost: function () {
      this.loading.Delete = true
      this.$store.dispatch('post/deletePost').then(() => {
        const message = "Post deleted successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.$router.push({name: 'Posts'})
      }).catch(err => {
        const message = err.response.data.message
        this.$store.dispatch('showMessage', {message, color: 'error'})
      }).finally(() => this.loading.Delete = false)
    }
  },
  computed: {
    statusType: function () {
      return this.buttons.filter(b => b.type === this.post.status)[0]
    },
    ...mapState('post', ['post', 'update', 'canEdit'])
  }
}
</script>

<style scoped>
</style>