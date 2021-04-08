<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar
            color="primary"
            flat
            dark>

          <v-toolbar-title>New Post</v-toolbar-title>
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
        <PostActions />
      </v-card>
    </v-dialog>
</template>

<script>
import PostData from "@/components/post/PostData";
import PostVisualizer from "@/components/post/PostVisualizer";
import PostActions from "@/components/post/PostActions";
export default {
  name: "Post",
  components: {PostActions, PostVisualizer, PostData},
  props: {
    dialog: Boolean
  }
}
</script>

<style scoped>

</style>