<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-1">mdi-account-multiple</v-icon>
      People
    </v-card-title>

    <v-list rounded>
      <v-list-item two-line v-for="(m, i) in people" :key="i">
        <v-list-item-avatar>
          <UserAvatar :image="m.profile_picture"
                      :alt="m.first_name"
                      :size="30"
                      />
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>{{m.first_name}} {{m.last_name}}
          <v-chip v-if="m.is_head" color="accent" class="ml-1" x-small>
          <v-icon x-small>mdi-star</v-icon>
          </v-chip>
        </v-list-item-title>
        <v-list-item-subtitle>{{m.email}}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>

          <v-btn icon @click="showRemoveDialog = true" v-if="!m.is_head && canEdit">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>

        <Dialog text="Are you sure you want to remove this user?"
                header="Remove a user" :show="showRemoveDialog" @close-dialog="removeUser(m.email, $event)"/>
      </v-list-item>
    </v-list>


    <v-form @submit.prevent="addMember" class="add-form mt-4" ref="addForm" v-if="canEdit">
      <p>You can add new people to your team. Enter their email and click on ADD button.</p>
      <v-text-field filled
                    v-model="newEmail"
                    label="Email"
                    :rules="emailRule"
                    placeholder="john-doe@example.com"
                    append-icon="mdi-account-plus">

      </v-text-field>
      <v-btn depressed color="primary" type="submit">ADD</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "axios";
import Dialog from "@/components/shared/Dialog";
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "SettingsMember",
  components: {UserAvatar, Dialog},
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
      newEmail: '',
      showRemoveDialog: false,
      canEdit: false
    }
  },
  mounted() {
    this.getWorkspaceMembers();
  },
  computed: {
    getWorkspaceId: function (){
      return this.$route.params.workspace
    }
  },
  methods: {
    removeUser: function (email, resp) {
      this.showRemoveDialog = false
      console.log(resp)
      if (!resp) {
        return;
      }
      const data = {
        team_id: this.getWorkspaceId,
        email
      }
      this.$store.dispatch('removeUser', data).then(() => {
        const message = "User removed";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.getWorkspaceMembers();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      });
    },
    addMember: function () {
      const body = {
        username: this.newEmail,
        team_id: this.getWorkspaceId
      }
      this.$store.dispatch('addUserToWorkspace', body).then(() => {
        const message = "User invited";
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.getWorkspaceMembers();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      }).finally(() => this.$refs.addForm.reset());
    },
    getWorkspaceMembers: function () {
      this.$store.dispatch('getWorkspaceMembers', this.getWorkspaceId).then(resp => {
        this.people = resp.data.members
        this.canEdit = resp.data.can_edit
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