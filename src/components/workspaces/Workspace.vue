<template>
  <v-card class="text-capitalize pa-0 ma-2 v-card--hover"
          outlined @click="goToWorkspace">
    <UserAvatar
        :alt="workspace.name"
        :image="workspace.logo"
        :size="250"
        other-cls="rounded"/>

    <v-card-title class="pb-0">
      <v-badge
          left
          :content="workspace.members"
          color="accent"
          offset-x="10"
          offset-y="10">
        <v-icon class="mr-2">mdi-account-group</v-icon>
      </v-badge>
      {{ workspace.name }}
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
          color="error"
          outlined
          small
          @click.stop="dialog = true">
        Leave
      </v-btn>

      <Dialog
          :show="dialog"
          header="Leave workspace ?"
          text="By clicking on yes, you will no longer be a part of this workspace."
          @close-dialog="closeDialog"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import Dialog from "@/components/shared/Dialog";
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "Workspace",
  components: {UserAvatar, Dialog},
  props: {
    workspace: Object,
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    leave: function () {
      this.$store
          .dispatch("leaveWorkspace", this.workspace.url)
          .then(() => {
            const message = "You left the workspace";
            this.$store.dispatch("showMessage", {message, color: "info"});
          })
          .catch((err) => console.log(err));
    },
    closeDialog: function (value) {
      this.dialog = false;
      if (value) {
        this.leave();
      }
    },
    goToWorkspace: function () {
      this.$router.push(`/workspace/${this.workspace.url}/`)
    }
  },
  computed: {
    workspaceUrl: function () {
      return '/workspaces/' + this.workspace.url + '/';
    },
  }
}
</script>

<style lang="scss" scoped>
.logo {
  //border: 1px solid #dddddd;
}
</style>