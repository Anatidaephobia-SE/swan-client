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
  mounted() {
    // This checks if token expired, and
    axios.interceptors.response.use(undefined, function (err) {
      return new Promise( () => {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          console.log('hello')
          this.$store.dispatch('logout');
          this.$router.push('/login');
        }
        throw err;
      });
    });
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
