<template>
  <v-app>
    <v-main>
      <router-view></router-view>
      <SnackBar></SnackBar>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import SnackBar from "@/components/shared/SnackBar";
export default {
  name: "App",

  components: {SnackBar},

  data: () => ({
  }),
  created() {
    // This checks if token expired, and
    axios.interceptors.response.use(undefined, (err) => {
      if (err.response.status === 403 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch('logout');
      }
      return Promise.reject(err)
    });

    this.$store.dispatch('getUserInfo').then(
        () => this.user = this.$store.getters.userInfo
    );
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
