<template>
  <v-card class="pa-2">
    <v-card-text>
      Your workspace has been created, now enter your teammates' email and click on the icon in the right side.
    </v-card-text>

    <v-container class="users">
      <v-form ref="userForm" @submit.prevent="addUser">
        <v-text-field
            v-model="newUser"
            append-icon="mdi-account-plus"
            label="teammate"
            :rules="email"
            placeholder="john-doe@example.com"
            @click:append.prevent="addUser()"
            filled>
        </v-text-field>
      </v-form>
      <span v-show="addedUser.length">Invited users:</span>
    <v-list dense flat>
      <v-list-item v-for="(u, i) in addedUser" :key="i">
        <v-list-item-avatar>
          <UserAvatar :image="u.profile_picture" :alt="u.first_name" :size="30"/>
        </v-list-item-avatar>
        {{u.email}}
      </v-list-item>
    </v-list>

    </v-container>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="$emit('next')" type="submit">Next</v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
import axios from "axios";
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "AddMember",
  components: {UserAvatar},
  props: {
    id: String
  },
  data() {
    return {
      newUser: '',
      addedUser: [],
      email: [
        (value) => !!value || "Email is required for inviting",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email";
        },
      ],
    }
  },
  methods: {
    addUser: function () {
      const body = {
        username: this.newUser,
        team_id: this.id
      }
      this.$store.dispatch('addUserToWorkspace', body).then((res) => {
        console.log(res.data)
        const message = `${this.newUser} invited!`;
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.addedUser.push(res.data);
        this.$refs.userForm.reset();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      });
    },
    getImgUrl: function (image) {
      return axios.defaults.baseURL + image
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.users {
  margin: auto;
  max-width: 350px;
}
</style>