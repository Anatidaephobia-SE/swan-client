<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <SnackBar></SnackBar>
    </v-main>
  </v-app>
</template>

<script>
import SnackBar from "@/components/shared/SnackBar";

export default {
  name: "App",

  components: {SnackBar},
  beforeMount() {
    // This checks if token expired, and
    // axios.interceptors.response.use(undefined, (err) => {
    //   if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
    //     this.$store.dispatch('logout');
    //   }
    //   return Promise.reject(err)
    // });

    if (!this.$route.meta.hasOwnProperty('dontUpdate')) {
      this.$store.dispatch('auth/getUserInfo')
    }
  },
  computed: {
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Varela+Round");

#app {
  font-family: "Varela Round", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
