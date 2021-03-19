<template>
  <v-card class="text-capitalize pa-4 ma-2 v-card--hover" outlined width="250">
    <v-avatar rounded size="80px">
      <img v-show="workspace.logo" :src="workspace.logo"
           class="logo">
      <span v-show="!workspace.logo">{{ shortName }}</span>
    </v-avatar>
    <v-card-title>{{ workspace.name }}</v-card-title>
    <v-card-subtitle>
      <v-icon>mdi-account-group</v-icon>
      <span class="ml-1">{{ workspace.members }}</span>
    </v-card-subtitle>

    <v-card-actions v-show="!invite">
      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn v-bind="attrs" v-on="on" :to="'workspace/' + workspace.id" icon>
            <v-icon>mdi-cog</v-icon>
          </v-btn>
        </template>
        <span>Dashboard</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn @click="leave" color="error" v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-account-remove</v-icon>
          </v-btn>
        </template>
        <span>Leave</span>
      </v-tooltip>

      <Dialog header="Leave workspace ?"
              text="By clicking on yes, you will no longer be a part of this workspace."
              :show="dialog" @close-dialog="closeDialog" />

    </v-card-actions>

    <v-card-actions v-show="invite">
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn color="success" v-bind="attrs" v-on="on" icon @click="accept">
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>Accept</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{on, attrs}">
          <v-btn color="error" v-bind="attrs" v-on="on" icon @click="reject">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>Reject</span>
      </v-tooltip>
    </v-card-actions>
  </v-card>
</template>

<script>
import Dialog from "@/components/shared/Dialog";
export default {
  name: "Workspace",
  components: {Dialog},
  props: {
    // workspace: Object,
    invite: Boolean
  },
  data() {
    return {
      dialog: false,
      workspace: {
        id: 1431,
        name: 'Swan Team',
        members: 10,
        logo: 'https://www.codeapi.io/app?' + Math.random()
      },
    }
  },
  methods: {
    leave: function () {
      this.dialog = true
    },
    accept: function () {
    },
    reject: function () {
    },
    closeDialog: function (value) {
      this.dialog = false;
      console.log(value);
    }
  },
  computed: {
    shortName: function () {
      let tokens = this.workspace.name.split(' ');
      let shortname;
      if (tokens.length >= 2) {
        tokens = tokens.slice(0, 2);
        shortname = tokens[0][0] + tokens[1][0]
      } else {
        shortname = tokens[0][0]
      }
      return shortname
    }
  }
}
</script>

<style lang="scss" scoped>
.logo {
  //border: 1px solid #dddddd;
}
</style>