<template>
  <v-container>
    <div v-if="user">
      <v-row>
        <v-col cols="12" md="3">

          <v-menu v-model="imageMenu"
                  :disabled="!editMode"
                  transition="slide-y-transition"
                  offset-y
                  :rounded="'b-xl'"
                  bottom>
            <template v-slot:activator="{on, attrs}">
              <v-avatar rounded v-bind="attrs" v-on="on" class="user-avatar" size="200">
                <v-icon v-show="editMode && !user.profile_picture" size="50">mdi-camera-plus</v-icon>
                <v-icon v-show="!editMode && !user.profile_picture" size="50">mdi-account</v-icon>
                <v-img v-if="user.profile_picture" :src="getImgUrl"></v-img>
              </v-avatar>
            </template>

            <v-file-input
                accept="image/*"
                ref="imageInput"
                v-show="false"
                v-model="user.profile_picture">
            </v-file-input>

            <v-list>
              <v-list-item @click="user.profile_picture = ''" v-if="user.profile_picture">
                <v-list-item-title>Remove image</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$refs.imageInput.$refs.input.click()">
                <v-list-item-title>Update image</v-list-item-title>
              </v-list-item>


            </v-list>

          </v-menu>
        </v-col>
        <v-col cols="12" md="4" class="pt-md-10 pb-0">
          <v-text-field
              v-model="user.email"
              label="Email"
              disabled
              filled>
          </v-text-field>
          <v-text-field
              :disabled="!editMode"
              v-model="user.first_name"
              filled label="First Name"
              placeholder="John">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4" class="pt-md-10 pt-0">
          <v-text-field
              :disabled="!editMode"
              v-model="user.last_name"
              filled label="Last Name"
              placeholder="Doe">
          </v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer>
        </v-spacer>
        <v-btn ref="editBtn" v-if="!editMode" @click="editMode = true" depressed color="primary">Edit</v-btn>
        <v-btn ref="discardBtn" outlined @click="discardChanges" v-if="editMode" color="error">Discard</v-btn>
        <v-btn ref="saveBtn" depressed @click="saveChanges" :loading="loading" v-if="editMode" color="primary">Save</v-btn>
      </v-card-actions>
    </div>
    <div v-else>
      <UserInfoLoader/>
    </div>
  </v-container>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";
import UserInfoLoader from "@/components/profile/UserInfoLoader";

export default {
  name: "UserInfo",
  components: {UserInfoLoader},
  data() {
    return {
      editMode: false,
      imageMenu: false,
      loading: false,
    }
  },
  mounted() {
  },
  methods: {
    discardChanges: function () {
      this.editMode = false;
      this.$store.dispatch('auth/getUserInfo')
    },
    saveChanges: function () {
      this.loading = true;
      const body = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
      }
      if (this.user.profile_picture !== null) {
        let image = this.user.profile_picture
        if (typeof image === 'object' || image === '') {
          body.profile_picture = image
        }
      }
      this.$store.dispatch('auth/updateUserInfo', body).then(() => {
        const message = `Profile updated!`;
        this.$store.dispatch('showMessage', {message, color: 'success'});
        this.editMode = false;
        this.$store.dispatch('auth/getUserInfo').then();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message, color: 'error'});
      }).finally(() => this.loading = false);
    },
  },
  computed: {
    ...mapState('auth', ['user']),
    getImgUrl: function () {
      if (typeof (this.user.profile_picture) === 'string') {
        return axios.defaults.baseURL + this.user.profile_picture;
      } else if (typeof (this.user.profile_picture) === 'object') {
        return URL.createObjectURL(this.user.profile_picture)
      }
      return ''
    }
  },
}
</script>

<style lang="scss" scoped>
.user-avatar {
  border: 1px solid #424242;
}

.user-avatar:hover {
  cursor: pointer;
  transition: .3s;
  background: #dddddd;
}
</style>