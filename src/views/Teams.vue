<template>
  <v-card class="home">
    <v-navigation-drawer
        app class="rounded-0"
        dark enable-resize-watcher expand-on-hover mini-variant
        permanent
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar class="rounded">
            <v-img
                :src="workspaceLogo"></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="title">
              {{ team.name }}
            </v-list-item-title>
            <v-list-item-subtitle>Admin: {{ team.head_name }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ team.members }} <v-icon>mdi-account-multiple</v-icon></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-divider></v-divider>

      <v-list
          dense
          nav
      >
        <v-list-item v-for="(item, index) in drawer" :key="index" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.label }}</v-list-item-title>
        </v-list-item>

        <Post :dialog="dialog" :edit-mode="false" @close="closeDialog" :key="dialogKey"/>
      </v-list>
    </v-navigation-drawer>


    <v-app-bar
        :clipped-left="false"
        app
        class="toolbar rounded-0" dense flat>

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
import axios from "axios";
import Post from "@/components/post/Post";

export default {
  name: "Teams",
  components: {Post},
  data() {
    return {
      dialog: false,
      baseUrl: axios.defaults.baseURL,
      team: {
        name: "",
        admins: [
          "lolo",
          "lala"
        ]
      },
      pathName: '',
      dialogKey: Math.random()
    }
  },
  methods: {
    closeDialog: function () {
      this.dialog = false;
      this.$router.push('posts')
      setTimeout(() => this.dialogKey = Math.random(), 300)
    },
    getWorkspaceInfo: function () {
      this.$store.dispatch('getWorkspaceInfo', this.workspaceUrl)
          .then(resp => {
            this.team = resp.data.team
          }).catch(err => {

      })
    }
  },
  computed: {
    drawer() {
      return [
        {label: 'Posts', link: `posts`, icon: 'mdi-account-group'},
        {label: 'Create new post', link: `compose`, icon: 'mdi-note-plus'},
        {label: 'Settings', link: `settings`, icon: 'mdi-cog'},
      ]
    },
    workspaceUrl: function () {
      return this.$route.params.workspace
    },
    workspaceLogo: function () {
      return axios.defaults.baseURL + this.team.logo
    }
  },
  created() {
    this.getWorkspaceInfo()
    this.pathName = this.$route.name
  },
  watch: {
    $route() {
      if (this.$route.meta.compose === true) {
        this.dialog = true
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .toolbar {
    border-bottom: 1px solid #dddd;
  }
}
</style>
