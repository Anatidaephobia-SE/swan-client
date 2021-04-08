<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-connection</v-icon>
      Social Media</v-card-title>
    <v-container>
      <v-list>
        <v-list-item @click="connect(s.name)" two-line v-for="(s, i) in socialMedia" :key="i">
          <v-list-item-avatar>
            <v-icon :color="s.color" large>{{s.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{s.name}}</v-list-item-title>
            <v-list-item-subtitle>
              <v-chip color="accent" x-small>Connected</v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "SettingsSocial",
  data() {
    return {
      socialMedia: [
        {name: 'Twitter', icon: 'mdi-twitter', color: 'blue'}
      ]
    }
  },
  methods: {
    connect: function (media) {
      if (media === 'Twitter') {
        this.connectToTwitter();
      }
    },
    connectToTwitter: function () {
      const body = {
        team_url: this.getWorkspaceName
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
  computed: {
    getWorkspaceName: function () {
      return this.$route.params.url
    }
  },
  mounted() {
    if (this.$route.query.oauth_token) {
      this.team_url = this.$route.query.team_url
      const body = {
        team_url: this.getWorkspaceName,
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