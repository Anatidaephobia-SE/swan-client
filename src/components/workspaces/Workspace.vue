<template>
  <v-card class="text-capitalize pa-4 ma-2 v-card--hover" outlined width="250">
    <v-container class="d-flex">
      <UserAvatar
          :image="workspace.logo"
          :alt="workspace.name"
          other-cls="rounded"
          :size="60"/>
      <div class="ml-3">
        <div class="text-sm-h6">{{ workspace.name }}</div>
        <div class="text-subtitle-1">
          <v-icon>mdi-account-group</v-icon>
          <span class="ml-1">{{ workspace.members || 10 }}</span>
        </div>
      </div>
    </v-container>


    <v-card-actions>
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on" :to="workspaceUrl()" icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Dashboard</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="dialog = true"
            color="error"
            v-bind="attrs"
            v-on="on"
            icon
          >
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
        </template>
        <span>Leave</span>
      </v-tooltip>

      <Dialog
        header="Leave workspace ?"
        text="By clicking on yes, you will no longer be a part of this workspace."
        :show="dialog"
        @close-dialog="closeDialog"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import Dialog from "@/components/shared/Dialog";
import axios from "axios";
import UserAvatar from "@/components/shared/UserAvatar";
export default {
  name: "Workspace",
  components: {UserAvatar, Dialog },
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
          this.$store.dispatch("showMessage", { message, color: "info" });
        })
        .catch((err) => console.log(err));
    },
    closeDialog: function (value) {
      this.dialog = false;
      if (value) {
        this.leave();
      }
    },
    workspaceUrl: function () {
      return '/workspaces/' + this.workspace.url + '/';
    },
  },
  computed: {
    shortName: function () {
      let tokens = this.workspace.name.split(" ");
      let shortname;
      if (tokens.length >= 2) {
        tokens = tokens.slice(0, 2);
        shortname = tokens[0][0] + tokens[1][0];
      } else {
        shortname = tokens[0][0];
      }
      return shortname;
    },
    logoUrl: function () {
      return axios.defaults.baseURL + this.workspace.logo
    },
    getColor: function () {
      return '#'+((Math.random() * 0xffffff + 0x1) <<0).toString(16);
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  //border: 1px solid #dddddd;
}
</style>