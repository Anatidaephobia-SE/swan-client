<template>
  <v-container>
    <v-row>
      <Workspace v-for="(w, i) in invites" :key="i" :workspace="w" :invite="true"/>
    </v-row>
  </v-container>
</template>

<script>
import Workspace from "@/components/workspaces/Workspace";

export default {
  name: "Invites",
  components: {Workspace},
  data() {
    return {
      invites: []
    }
  },
  methods: {
    getInvites: function () {
      this.$store.dispatch('getInvites')
          .then(res => {
            this.invites = res.data
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          });
    }
  },
  created() {
    this.getInvites();
  },
  watch: {
    '$store.getters.isInvitesUpdated': function () {
      const value = this.$store.getters.isInvitesUpdated
      if (!value) {
        this.getInvites();
      }
    }
  }
}
</script>

<style scoped>

</style>