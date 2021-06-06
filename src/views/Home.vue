<template>
  <div>
    <NavBar v-if="loaded"/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NewWorkspace from "@/components/new-workspace/NewWorkspace";
import UserAvatar from "@/components/shared/UserAvatar";
import NavBar from "@/components/homepage/NavBar";
import Workspaces from "@/views/Workspaces";

export default {
  name: "Home",
  components: {Workspaces, NavBar, UserAvatar, NewWorkspace},
  data() {
    return {
      loaded: false
    }
  },
  async created() {
    this.pathName = this.$route.name
    // this.getUserInfo();
    this.getUserInfo()
  },
  methods: {
    getUserInfo: function () {
      this.$store.dispatch('auth/getUserInfo').then(() => {
        this.loaded = true
      })
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
