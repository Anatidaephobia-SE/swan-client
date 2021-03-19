<template>
  <v-card class="home">
    <v-navigation-drawer
        app class="rounded-0"
        dark enable-resize-watcher expand-on-hover mini-variant
        permanent
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="baseUrl + user.profile_picture"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ user.first_name }} {{ user.last_name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item v-for="(item, index) in drawer" :key="index" link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.label}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
        flat
        class="toolbar rounded-0"
        :clipped-left="false" app dense>

      <v-toolbar-title>Swan | {{ pathName }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-tooltip bottom>
        <template v-slot:activator="{on, attr}">
          <v-btn
              v-bind="attr"
              v-on="on"
              icon
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>


    </v-app-bar>
    <v-card-text>
        <router-view></router-view>
    </v-card-text>
  </v-card>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      baseUrl: axios.defaults.baseURL,
      user: {},
      drawer: [
        {label: 'My Workspaces', link: 'workspaces', icon: 'mdi-account-group'},
        {label: 'Workspace Invites', link: 'invites', icon: 'mdi-account-clock'},
        {label: 'Calendar', link: 'calendar', icon: 'mdi-calendar'},
      ],
      pathName: ''
    }
  },
  created() {
    this.pathName = this.$route.name
    this.$store.dispatch('getUserInfo').then(
        () => this.user = this.$store.getters.userInfo
    );

  },
  watch: {
    $route:  function(newVal){
      this.pathName = newVal.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  //display: flex;
  //flex-direction: row-reverse;

  .toolbar {
    border-bottom: 1px solid #dddd;
  }
}
</style>
