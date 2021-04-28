<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-connection</v-icon>
      Social Media</v-card-title>
    <v-container>
      <v-list>
        <v-list-item three-line v-for="(s, i) in socialMedia" :key="i">
          <v-list-item-avatar>
            <v-icon :color="s.color" large>{{s.icon}}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{s.name}}</v-list-item-title>
            <v-list-item-subtitle v-if="twitterInfo">
              @{{twitterInfo.screen_name}} | {{twitterInfo.name}}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="twitterInfo">
              <v-chip color="accent" x-small>Connected</v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <v-btn v-on="on" v-bind="attrs" icon @click="connect(s.name)">
                  <v-icon>mdi-repeat</v-icon>
                </v-btn>
              </template>
              <span>Update or Connect</span>
            </v-tooltip>
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
      ],
      twitterInfo: ''
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
        team_id: this.getWorkspaceId,
        modify: 1
      };
      this.$store.dispatch('requestConnectionTwitter', body).then(resp => {
        const message = "Redirecting to twitter.com. Authorize this app";
        this.$store.dispatch('showMessage', {message , color: 'info'});
        setTimeout(() => window.location = resp.data.address, 1000);
      }).catch(err => {
        const message = err.response.data.error | 'Something\'s wrong, try again please';
        this.$store.dispatch('showMessage', {message , color: 'error'});
      });
    },
    getTwitter: function () {
      this.$store.dispatch('getTwitterAccount', this.getWorkspaceId)
          .then(resp => {
            this.twitterInfo = resp.data
            console.log(this.twitterInfo)
          }).catch(() => {
        console.log()
      })
    },
    getAccessTwitter: function () {
      this.team_url = this.$route.query.team_url
      const body = {
        team_id: this.getWorkspaceId,
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
      }).finally(() => this.getTwitter());
    }
  },
  computed: {
    getWorkspaceId: function () {
      return this.$route.params.workspace
    }
  },
  mounted() {
    if (this.$route.query.oauth_token) {
      this.getAccessTwitter()
    }
    this.getTwitter()
  }
}
</script>

<style scoped>

</style>