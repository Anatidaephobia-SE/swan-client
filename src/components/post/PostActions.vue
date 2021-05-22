<template>
  <v-container class="pa-md-4">
    
    <Scheduling :showScheduling="this.showScheduling"/>
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
             :x-small="$vuetify.breakpoint.mobile"
             depressed
             @click="action(b.type)">{{ b.label }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-container>
</template>

<script>
import {mapState} from "vuex";
import Scheduling from "@/components/post/Scheduling"

export default {
  name: "PostActions",
  components: {Scheduling},
  data() {
    return {
      buttons: [
        {label: 'publish', color: 'primary', type: 'Published'},
        {label: 'schedule', color: 'accent', type: 'Schedule'},
        {label: 'draft', color: 'info', type: 'Drafts'},
        // {label: 'remove', color: 'error'}
      ]
    }
  },
  mounted() {
  },
  methods: {
    action: function (status) {
      this.$store.commit('post/SET_STATUS', status)
      if (this.update) {
        this.updatePost()
      } else {
        this.createPost()
      }
    },
    createPost: function () {
      this.$store.dispatch('post/createNewPost').then(() => {
        const message = "new post created successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      }).finally(() => {
      })
    },
    updatePost: function () {
      this.$store.dispatch('post/updatePost').then(() => {
        const message = "Post updated successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      })
    },
  },
  computed: {
    statusType: function () {
      return this.buttons.filter(b => b.type === this.post.status)[0]
    },
    ...mapState('post', ['post', 'update', 'canEdit', 'showScheduling', 'schedule_time'])
  }
}
</script>

<style scoped>

</style>