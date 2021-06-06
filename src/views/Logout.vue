<template>
  <v-container>
    <p>Logging you out. redirecting ...</p>
  </v-container>
</template>

<script>
export default {
  name: "Logout",
  mounted() {
    this.$store.dispatch('auth/logout').then(() => {
      const message = `Logged out successfully, Bye!`;
      this.$store.dispatch('showMessage', {message , color: 'success'});
      this.$router.push('/login').then()
    });
  }
}
</script>

<style scoped>

</style>