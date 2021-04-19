<template>
  <v-container>
    Redirecting ...
  </v-container>
</template>

<script>
export default {
  name: "Dispatch",
  mounted() {
    const query = this.$route.query;
    if (query.modify === "1") {
      const url = `/workspaces/${query.team_url}/settings?oauth_token=${query.oauth_token}&oauth_verifier=${query.oauth_verifier}`
      this.$router.push(url)
    } else {
      const url = `/workspaces?team_url=${query.team_url}&oauth_token=${query.oauth_token}&oauth_verifier=${query.oauth_verifier}`
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>

</style>