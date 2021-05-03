<template>
  <v-app-bar
      fixed
      color="primary"
      dark
      flat
      app>
    <v-card-title style="cursor: pointer" @click="$router.push('/')">Swan</v-card-title>

    <v-spacer></v-spacer>

    <v-menu
        :close-on-content-click="false"
        bottom
        offset-y min-width="300" >
      <template v-slot:activator="{on, attrs}">
        <v-badge
            offset-y="20"
            offset-x="25"
            color="error"
            overlap
            :value="invitees.length > 0"
            :content="invitees.length">
          <v-btn
              v-bind="attrs"
              v-on="on"
              icon>
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </v-badge>
      </template>

      <Invitations />
    </v-menu>

    <v-menu bottom offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-btn
            :ripple="false"
            v-bind="attrs"
            v-on="on"
            class="mx-2"
            icon>
          <UserAvatar
              other-cls="rounded"
              :alt="user.first_name"
              :image="user.profile_picture"
              :size="35"></UserAvatar>
        </v-btn>
      </template>

      <v-list dense>
        <v-list-item v-for="(m, i) in menuItems" :key="i" :to="m.link">
          <v-list-item-icon>
            <v-icon>
              {{ m.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ m.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";
import Invitations from "@/components/homepage/Invitations";

export default {
  name: "NavBar",
  components: {Invitations, UserAvatar},
  props: {
    user: Object
  },
  data() {
    return {
      invitees: []
    }
  },
  mounted() {
    this.getInvitees()
  },
  computed: {
    menuItems: function () {
      return [
        {label: 'Profile', link: '/profile', icon: 'mdi-account'},
        {label: 'Logout', link: '/logout', icon: 'mdi-logout'}
      ]
    }
  },
  methods: {
    getInvitees: function () {
      this.$store.dispatch('getInvites')
          .then(res => {
            this.invitees = res.data
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          });
    }
  },
  watch: {
    '$store.getters.isInvitesUpdated': function () {
      const value = this.$store.getters.isInvitesUpdated
      if (!value) {
        this.getInvitees()
      }
    }
  }
}
</script>

<style scoped>

</style>