<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        persistent
        transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar
            color="primary"
            flat
            dark>

          <v-toolbar-title>{{editMode? 'View Post': 'new Post'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                icon
                @click="$emit('close')">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <PostData/>
        <v-divider></v-divider>
        <PostVisualizer/>
        <v-divider></v-divider>
        <PostActions :editMode="editMode"/>
        <v-divider></v-divider>
        <PostComments v-if="editMode"/>
        <br>
        <br>
      </v-card>
    </v-dialog>
</template>

<script>
import PostData from "@/components/post/PostData";
import PostVisualizer from "@/components/post/PostVisualizer";
import PostActions from "@/components/post/PostActions";
import PostComments from "@/components/post/PostComments";
export default {
  name: "Post",
  components: {PostComments, PostActions, PostVisualizer, PostData},
  props: {
    dialog: Boolean,
    editMode: Boolean
  },
  mounted() {
    if (this.editMode) {
      this.getPostById()
    }
  },
  methods: {
    getPostById: function () {
      this.$store.dispatch('getPostById', '9').then().catch()
    }
  }
}
</script>

<style scoped>

</style>