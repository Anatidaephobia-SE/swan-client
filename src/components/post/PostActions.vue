<template>
  <v-container class="pa-md-4">
    <v-card-title>
      <v-icon class="mr-2">mdi-checkbox-marked-outline</v-icon>
      Actions
    </v-card-title>
    <v-card-subtitle v-if="status">
      Current State: <v-chip x-small :color="statusType.color">{{statusType.label.toUpperCase()}}</v-chip>
    </v-card-subtitle>
    <v-card-text>
    <p>Now you're done with creating your content, select the action you want to do with it.</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed
             v-for="(b, i) in buttons"
             :key="i"
             :small="$vuetify.breakpoint.mobile"
             @click="action(b.type)"
             :color="b.color">{{b.label}}</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-container>
</template>

<script>
export default {
  name: "PostActions",
  props: {
    editMode: Boolean
  },
  data() {
    return {
      status: '',
      buttons: [
        {label: 'publish', color: 'primary', type: 'Pu'},
        {label: 'schedule', color: 'accent'},
        {label: 'draft', color: 'info', type: 'Dr'},
        {label: 'remove', color: 'error'}
      ]
    }
  },
  mounted() {
    this.status = this.$store.getters.getNewPost.status
  },
  methods: {
    action: function (status) {
      this.status = status
      this.$store.dispatch('setStatus', status)
      if (this.editMode) {
        this.updatePost()
      } else {
        this.createPost()
      }
    },
    createPost: function () {
      this.$store.dispatch('createNewPost').then(() => {
        const message = "new post created successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      })
    },
    updatePost: function () {
      this.$store.dispatch('updatePost').then(() => {
        const message = "Post updated successfully";
        this.$store.dispatch('showMessage', {message, color: 'success'});
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      })
    }
  },
  computed: {
    statusType: function () {
      return this.buttons.filter(b => b.type === this.status)[0]
    }
  }
}
</script>

<style scoped>

</style>