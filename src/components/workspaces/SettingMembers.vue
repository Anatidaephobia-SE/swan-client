<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-1">mdi-account-multiple</v-icon>
      People
    </v-card-title>

    <v-list rounded>
      <v-list-item two-line v-for="(m, i) in people" :key="i">
        <v-list-item-avatar>
          <v-img :src="getImageUrl(m.profile_picture)"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>{{m.first_name}} {{m.last_name}}<v-chip color="accent" class="ml-1" x-small>
          <v-icon x-small>mdi-star</v-icon>
        </v-chip></v-list-item-title>
        <v-list-item-subtitle>{{m.email}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="removeUser(m.email)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider class="my-4"></v-divider>

    <v-form @submit.prevent="addMember" class="add-form" ref="addForm">
      <p>You can add new people to your team. Enter their email and click on ADD button.</p>
      <v-text-field filled
                    v-model="newEmail"
                    label="Email"
                    :rules="emailRule"
                    @keyup.enter="addMember"
                    placeholder="john-doe@example.com"
                    append-icon="mdi-account-plus">

      </v-text-field>
      <v-btn depressed color="primary" type="submit">ADD</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "SettingsMember",
  data() {
    return {
      people: [],
      emailRule: [
          v => !!v || 'Email is required',
          v => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || "Invalid email";
          }
      ],
      newEmail: ''
    }
  },
  mounted() {
    this.getWorkspaceMembers();
  },
  computed: {
  },
  methods: {
    removeUser: function (email) {
      console.log(email)
    },
    addMember: function () {
      const body = {
        username: this.newEmail,
        team_url: 'twitter'
      }
      this.$store.dispatch('addUserToWorkspace', body).then(() => {
        const message = "User invited";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.getWorkspaceMembers();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      });
    },
    getWorkspaceMembers: function () {
      this.$store.dispatch('getWorkspaceMembers', 'twitter').then(resp => {
        this.people = resp.data.members
      }).catch();
    },
    getImageUrl: function (img) {
      return img ? axios.defaults.baseURL + img: '';
    }
  },
}
</script>

<style lang="scss" scoped>
.add-form {
  width: max-content;
}
</style>