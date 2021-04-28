<template>
  <v-card class="pa-4 my-2 ma-auto" max-width="750px" outlined>
    <v-row>
      <v-col cols="2" md="1">
        <v-avatar
            class="profile"
            color="grey"
            size="50">
          <v-img :src="imageUrl"></v-img>
        </v-avatar>
      </v-col>
      <v-col cols="9" md="10">
        <v-card-title class="mt-0 pt-0">{{ comment.author.first_name }} {{ comment.author.last_name }}</v-card-title>
        <v-card-subtitle>{{ date }}</v-card-subtitle>
      </v-col>
      <v-col cols="1" md="1">
        <v-menu bottom offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-btn v-bind="attrs" v-on="on" depressed icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list dense>
            <v-list-item @click="deleteComment">
              <v-list-item-icon>
                <v-icon>mdi-delete</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                Delete comment
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <div class="pa-2">
      <p>
        {{ comment.context }}
      </p>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "PostComment",
  props: {
    comment: Object
  },
  methods: {
    deleteComment: function () {
      this.$store.dispatch('deleteComment', this.comment.id).then(() => {
        const message = "Comment deleted!"
        this.$store.dispatch('showMessage', {message, color: 'success'})
        this.$emit('changed')
      }).catch(err => {
        const message = err.response.data.error
        this.$store.dispatch('showMessage', {message, color: 'error'})
      })
    }
  },
  computed: {
    date: function () {
      return new Date(this.comment.created_at).toLocaleString('en-En')
    },
    imageUrl: function () {
      return axios.defaults.baseURL + this.comment.author.profile_picture
    }
  }
}
</script>

<style scoped>

</style>