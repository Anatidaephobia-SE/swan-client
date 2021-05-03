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
      <v-menu v-model="menu" bottom offset-y>
        <template v-slot:activator="{on, attrs}">
          <v-btn
              icon
              @click.stop="menu = true">
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </template>

        <v-list dense outlined>
          <v-list-item :to="workspaceUrl + 'settings'">
            <v-list-item-title>
              Preferences
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="dialog = true">
            <v-list-item-title>
              Leave
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

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
      menu: false
    };
  },
  methods: {
    leave: function () {
      this.$store
          .dispatch("leaveWorkspace", this.workspace.id)
          .then(() => {
            const message = "You left the workspace";
            this.$store.dispatch("showMessage", {message, color: "info"});
          })
          .catch((err) => {
            const message = err.response.data.error;
            this.$store.dispatch("showMessage", {message, color: "error"});
          });
    },
    closeDialog: function (value) {
      this.dialog = false;
      if (value) {
        this.leave();
      }
    },
    goToWorkspace: function () {
      this.$router.push(`/workspace/${this.workspace.id}/`)
    }
  },
  computed: {
    workspaceUrl: function () {
      return '/workspace/' + this.workspace.id + '/';
    },
  }
}
</script>

<style lang="scss" scoped>
.logo {
  //border: 1px solid #dddddd;
}
</style>