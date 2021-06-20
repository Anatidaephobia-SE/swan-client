<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-1">mdi-account-multiple</v-icon>
      People
    </v-card-title>
    <div v-if="!loading">
      <v-list rounded>
        <v-list-item v-for="(m, i) in people" :key="i" two-line>
          <v-list-item-avatar>
            <UserAvatar :alt="m.first_name"
                        :image="m.profile_picture"
                        :size="30"
            />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ m.first_name }} {{ m.last_name }}
              <v-chip v-if="m.is_head" class="ml-1" color="accent" x-small>
                <v-icon x-small>mdi-star</v-icon>
              </v-chip>
            </v-list-item-title>
            <v-list-item-subtitle>{{ m.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>

            <v-btn
                ref="remove"
                v-if="!m.is_head && canEdit"
                icon
                @click="askRemoval(m.email)">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <Dialog :show="showRemoveDialog"
              ref="confirm"
              header="Remove a user" text="Are you sure you want to remove this user?"
              @close-dialog="removeUser($event)"/>

      <v-expansion-panels
          flat>
        <v-expansion-panel>
          <v-expansion-panel-header>
          <span>
            <v-icon class="mr-2">mdi-account-plus</v-icon>
            Invite teammates
          </span>
          </v-expansion-panel-header>
          <v-expansion-panel-content ref="expansion">
            <v-row>
              <v-col cols="12">
                <v-form v-if="canEdit" ref="addForm" class="add-form mt-4" @submit.prevent="addMember">
                  <v-text-field v-model="newEmail"
                                :rules="emailRule"
                                append-icon="mdi-account-plus"
                                filled
                                label="Email"
                                placeholder="john-doe@example.com">

                  </v-text-field>
                  <v-btn color="primary" depressed type="submit">ADD</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>

    <div v-else>
      <SettingMembersLoader/>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import Dialog from "@/components/shared/Dialog";
import UserAvatar from "@/components/shared/UserAvatar";
import SettingMembersLoader from "@/components/workspaces/SettingMembersLoader";

export default {
  name: "SettingsMember",
  components: {SettingMembersLoader, UserAvatar, Dialog},
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
      canEdit: false,
      selectedUser: '',
      loading: false
    }
  },
  mounted() {
    this.getWorkspaceMembers();
  },
  computed: {
    getWorkspaceId: function () {
      return this.$route.params.workspace
    }
  },
  methods: {
    askRemoval: function (email) {
      this.selectedUser = email
      this.showRemoveDialog = true
    },
    removeUser: function (resp) {
      this.showRemoveDialog = false
      if (!resp) {
        return;
      }
      const data = {
        team_id: this.getWorkspaceId,
        email: this.selectedUser
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
      this.loading = true
      this.$store.dispatch('getWorkspaceMembers', this.getWorkspaceId).then(resp => {
        this.people = resp.data.members
        this.canEdit = resp.data.can_edit
        this.loading = false
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      });
    },
    getImageUrl: function (img) {
      return img ? axios.defaults.baseURL + img : '';
    }
  },
}
</script>

<style lang="scss" scoped>
.add-form {
  //width: min-content;
  max-width: 400px;
}
</style>