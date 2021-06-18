<template>
  <v-container class="mt-md-8 mt-2" @scroll="hideAdd">
    <v-card-title>
      <v-icon class="mr-2">mdi-account-multiple</v-icon>
      Your Workspaces
    </v-card-title>
    <v-card-text v-if="!loading" class="d-flex flex-wrap justify-center">
      <Workspace v-for="(w, i) in workspaces" :key="i" :workspace="w"/>

      <v-container v-if="workspaces.length === 0" class="d-flex flex-column align-center">
        <v-img
            max-width="600" min-width="300"
            :src="require('@/assets/graphics/empty.svg')"></v-img>
        <span>No workspaces yet!</span>
      </v-container>
    </v-card-text>

    <v-card-text v-else class="d-flex flex-wrap justify-center">
      <WorkspaceLoader v-for="i in 3" :key="i"></WorkspaceLoader>
    </v-card-text>

    <v-tooltip top>
      <template v-slot:activator="{on, attrs}">
        <v-btn
            ref="addWorkspace"
            id="btn"
            @click="newWorkspace = true"
            v-on="on"
            v-bind="attrs"
            color="accent"
            class="add-btn"
            :large="$vuetify.breakpoint.mdAndUp"
            fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <span>New Workspace</span>
    </v-tooltip>

    <NewWorkspace :dialog="newWorkspace" @close-dialog="closeDialog" :key="key"/>
  </v-container>
</template>

<script>
import Workspace from "@/components/workspaces/Workspace";
import NewWorkspace from "@/components/new-workspace/NewWorkspace";
import WorkspaceLoader from "@/components/workspaces/WorkspaceLoader";

export default {
  name: "Workspaces",
  components: {WorkspaceLoader, NewWorkspace, Workspace},
  data() {
    return {
      newWorkspace: false,
      workspaces: [],
      key: Math.random(),
      pos: window.pageYOffset,
      loading: false
    }
  },
  methods: {
    getWorkspaces: function () {
      this.$store.dispatch('getWorkspaces')
          .then(res => {
            this.workspaces = res.data
            this.loading = false
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          })
    },
    closeDialog: function () {
      this.newWorkspace = false
      setTimeout(() => this.key = Math.random(), 300)
    },
    hideAdd: function () {
      const currentScrollPos = window.pageYOffset;
      if (this.pos > currentScrollPos) {
        document.getElementById("btn").style.opacity = '1';
      } else {
        document.getElementById("btn").style.opacity = '0';
      }
      this.pos = currentScrollPos;
    }
  },
  created() {
    this.loading = true
    this.getWorkspaces()
    window.addEventListener('scroll', this.hideAdd)
    if (this.$route.query.team_id) {
      this.newWorkspace = true
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.hideAdd)
  },
  watch: {
    '$store.getters.isTeamsUpdated': function () {
      const value = this.$store.getters.isTeamsUpdated
      if (!value) {
        this.getWorkspaces();
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.add-btn {
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  visibility: visible;
  transition: 0.3s ease-in-out;
}

@media screen and (max-width: 576px) {
  .add-btn {
    bottom: 2rem;
    right: 2rem;
  }
}
</style>