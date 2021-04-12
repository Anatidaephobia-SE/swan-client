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

          <v-toolbar-title>{{isEditMode? 'View Post': 'New Post'}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                icon
                @click="closeDialog()">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>

        <PostData/>
        <v-divider></v-divider>
        <PostVisualizer/>
        <v-divider></v-divider>
        <PostActions :editMode="isEditMode"/>
        <v-divider></v-divider>
        <PostComments v-if="isEditMode"/>
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
  data() {
    return {
      postSubmitted: false
    }
  },
  mounted() {
    if (this.editMode) {
      this.getPostById()
    }
    this.$store.subscribe((mutation) =>  {
      if (mutation.type === 'SET_ID') {
        this.postSubmitted = true
      }
    })
  },
  methods: {
    getPostById: function () {
      this.$store.dispatch('getPostById', '15').then().catch()
    },
    closeDialog: function () {
      this.$store.dispatch('reset')
      this.$emit('close')
    }
  },
  computed: {
    isEditMode: function () {
      return this.editMode || this.postSubmitted
    }
  }
}
</script>

<style scoped>

</style>