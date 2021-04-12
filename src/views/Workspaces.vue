<template>
  <v-container>
    <v-row>
      <Workspace v-for="(w, i) in workspaces" :key="i" :workspace="w"/>
    </v-row>
  </v-container>
</template>

<script>
import Workspace from "@/components/workspaces/Workspace";

export default {
  name: "Workspaces",
  components: {Workspace},
  data() {
    return {
      workspaces: []
    }
  },
  methods: {
    getWorkspaces: function () {
      this.$store.dispatch('getWorkspaces')
          .then(res => {
            this.workspaces = res.data
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          })
    }
  },
  created() {
    this.getWorkspaces()
  },
  watch: {
    '$store.getters.isTeamsUpdated': function () {
      const value = this.$store.getters.isTeamsUpdated
      if (!value) {
        this.getWorkspaces();
      }
    }
  }
}
</script>

<style scoped>

</style>