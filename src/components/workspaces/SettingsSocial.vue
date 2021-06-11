<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-connection</v-icon>
      Social Media
    </v-card-title>
    <v-container v-if="!loading">
      <v-list>
        <v-list-item three-line v-for="(s, i) in socialMedia" :key="i">
          <v-list-item-avatar>
            <v-icon :color="s.color" large>{{ s.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ s.name }}</v-list-item-title>
            <v-list-item-subtitle v-if="twitterInfo">
              @{{ twitterInfo.screen_name }} | {{ twitterInfo.name }}
            </v-list-item-subtitle>
            <v-list-item-subtitle v-if="twitterInfo">
              <v-chip color="accent" x-small>Connected</v-chip>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{on, attrs}">
                <v-btn ref="requestConnection" v-on="on" v-bind="attrs" icon @click="connect(s.name)">
                  <v-icon>mdi-repeat</v-icon>
                </v-btn>
              </template>
              <span>Update or Connect</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-container>
    <v-container v-else>
      <SettingsSocialLoader/>
    </v-container>
  </v-container>
</template>

<script>
import SettingsSocialLoader from "@/components/workspaces/SettingsSocialLoader";

export default {
  name: "SettingsSocial",
  components: {SettingsSocialLoader},
  data() {
    return {
      socialMedia: [
        {name: 'Twitter', icon: 'mdi-twitter', color: 'blue'}
      ],
      twitterInfo: '',
      loading: false
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
        this.$store.dispatch('showMessage', {message, color: 'info'});
        setTimeout(() => window.location = resp.data.address, 1000);
      }).catch(err => {
        const message = err.response.data.error | 'Something\'s wrong, try again please';
        this.$store.dispatch('showMessage', {message, color: 'error'});
      });
    },
    getTwitter: function () {
      this.loading = true
      this.$store.dispatch('getTwitterAccount', this.getWorkspaceId).then(resp => {
        this.twitterInfo = resp.data
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      }).finally(() => this.loading = false)
    },
    getAccessTwitter: function () {
      const body = {
        team_id: this.getWorkspaceId,
        oauth_token: this.$route.query.oauth_token,
        oauth_verifier: this.$route.query.oauth_verifier
      }
      this.$store.dispatch('sendTokensTwitter', body).then(() => {
        this.twitter = true;
        const message = "Twitter is connected!";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.getTwitter()
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      })
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
    } else {
      this.getTwitter()
    }
  }
}
</script>

<style scoped>

</style>