<template>
  <v-card class="pa-2">
    <v-card-text>
      Hey. Your teammates are invited! Now you can connect your social medias. Select the one you want.
      And click on the "DONE" button, when finished.
    </v-card-text>
    <v-card-text class="d-flex justify-space-around">
      <v-btn @click="connectTwitter" :color="twitter? 'green': ''" icon x-large><v-icon>mdi-twitter</v-icon></v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" :loading="loading.twitter" @click="$emit('done')" type="submit">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConnectToSocialMedia",
  props: {
    url: String
  },
  data() {
    return {
      twitter: false,
      team_url: '',
      loading: {
        twitter: false
      }
    }
  },
  methods: {
    connectTwitter: function () {
      if (this.twitter) {
        // It is connected
        return;
      }
      this.loading.twitter = true;
      const body = {
        team_url: this.url
      };
      this.$store.dispatch('requestConnectionTwitter', body).then(resp => {
        const message = "Redirecting to twitter.com. Authorize this app";
        this.$store.dispatch('showMessage', {message , color: 'info'});
        setTimeout(() => window.location = resp.data.address, 1000);
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message , color: 'error'});
      });
    }
  },
  mounted() {
    if (this.$route.query.team_url) {
      this.team_url = this.$route.query.team_url
      const body = {
        team_url: this.team_url,
        oauth_token: this.$route.query.oauth_token,
        oauth_verifier: this.$route.query.oauth_verifier
      }
      this.$store.dispatch('sendTokensTwitter', body).then(() => {
        this.twitter = true;
        const message = "Twitter is connected!";
        this.$store.dispatch('showMessage', {message , color: 'success'});
        this.$router.push(this.$route.path);
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message , color: 'error'});
      });
    }
  }
}
</script>

<style scoped>

</style>