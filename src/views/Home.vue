<template>
  <div>
    <NavBar v-if="loaded"/>
    <router-view></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/homepage/NavBar";

export default {
  name: "Home",
  components: {NavBar},
  data() {
    return {
      loaded: false
    }
  },
  async created() {
    this.pathName = this.$route.name
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
