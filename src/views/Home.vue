<template>
  <div >
    <NavBar :user="user"/>
    <v-sheet
    >
      Hello

    </v-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import NewWorkspace from "@/components/workspaces/NewWorkspace";
import UserAvatar from "@/components/shared/UserAvatar";
import NavBar from "@/components/homepage/NavBar";

export default {
  name: "Home",
  components: {NavBar, UserAvatar, NewWorkspace},
  data() {
    return {
      baseUrl: axios.defaults.baseURL,
      user: {},
      drawer: [
        {label: 'My Workspaces', link: 'workspaces', icon: 'mdi-account-group'},
        {label: 'Workspace Invites', link: 'invites', icon: 'mdi-account-clock'},
      ],
      pathName: '',
      newWorkspace: false,
      key: Math.random()
    }
  },
  methods: {
    closeDialog: function () {
      this.newWorkspace = false;
      setTimeout(() => this.key = Math.random(), 1000)

    }
  },
  created() {
    this.pathName = this.$route.name
    this.$store.dispatch('getUserInfo').then(
        () => this.user = this.$store.getters.userInfo
    );
    if (this.$route.query.team_url) {
      this.newWorkspace = true
    }

  },
  watch: {
    $route:  function(newVal){
      this.pathName = newVal.name;
    },
    '$store.getters.userInfo': function (newVal) {
      this.user = newVal
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
