<template>
  <div>
    <NavBar :user="user"/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import NewWorkspace from "@/components/new-workspace/NewWorkspace";
import UserAvatar from "@/components/shared/UserAvatar";
import NavBar from "@/components/homepage/NavBar";
import Workspaces from "@/views/Workspaces";

export default {
  name: "Home",
  components: {Workspaces, NavBar, UserAvatar, NewWorkspace},
  data() {
    return {
      user: {}
    }
  },
  created() {
    this.pathName = this.$route.name
    this.getUserInfo();
  },
  methods: {
    getUserInfo: function () {
      this.$store.dispatch('getUserInfo').then(
          () => {
            this.user = this.$store.getters.userInfo
          }
      );
    }
  },
  watch: {
    '$store.getters.userInfo': function (newVal) {
      this.user = newVal
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
