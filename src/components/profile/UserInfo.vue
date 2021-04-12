<template>
  <div>
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
              <v-icon v-show="editMode && !user.profileImg" size="50">mdi-camera-plus</v-icon>
              <v-icon v-show="!editMode && !user.profileImg" size="50">mdi-account</v-icon>
              <v-img v-if="user.profileImg" :src="getImgUrl"></v-img>
            </v-avatar>
          </template>

          <v-file-input ref="imageInput" v-show="false" v-model="user.profileImg" accpet="image/*"></v-file-input>

          <v-list>
            <v-list-item @click="user.profileImg = ''" v-if="user.profileImg">
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
            label="email"
            disabled
            filled>
        </v-text-field>
        <v-text-field
            :disabled="!editMode"
            v-model="user.firstname"
            filled label="First Name"
            placeholder="John">
        </v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="pt-md-10 pt-0">
        <v-text-field
            :disabled="!editMode"
            v-model="user.lastname"
            filled label="First Name"
            placeholder="John">
        </v-text-field>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer>
      </v-spacer>
      <v-btn v-show="!editMode" @click="editMode = true" depressed color="primary">Edit</v-btn>
      <v-btn outlined @click="discardChanges" v-show="editMode" color="error">Discard</v-btn>
      <v-btn depressed @click="saveChanges" :loading="loading" v-show="editMode" color="primary">Save</v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserInfo",
  data() {
    return {
      user: '',
      editMode: false,
      imageMenu: false,
      loading: false
    }
  },
  methods: {
    discardChanges: function () {
      this.getUserInfo();
      this.editMode = false;
    },
    saveChanges: function () {
      this.loading = true;
      const body = {
        firstname: this.user.firstname,
        lastname: this.user.lastname,
      }
      if (typeof this.user.profileImg === 'object' || this.user.profileImg === '') {
        body.profileImg = this.user.profileImg
      }
      this.$store.dispatch('updateUserInfo', body).then(() => {
        const message = `Profile updated!`;
        this.$store.dispatch('showMessage', {message , color: 'success'});
        this.editMode = false;
        this.$store.dispatch('getUserInfo').then();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message , color: 'error'});
      }).finally(() => this.loading = false);
    },
    getUserInfo: function () {
      const user = this.$store.getters.userInfo;
      this.user = {
        email: user.email,
        firstname: user.first_name,
        lastname: user.last_name,
        profileImg: user.profile_picture
      };
    }
  },
  computed: {
    getImgUrl: function () {
      if (typeof(this.user.profileImg) === 'string') {
        return axios.defaults.baseURL + this.user.profileImg;
      } else if (typeof(this.user.profileImg) === 'object') {
        return URL.createObjectURL(this.user.profileImg)
      }
      return ''
    }
  },
  mounted() {
    this.getUserInfo();
  },
  watch: {
    '$store.getters.userInfo': function () {
      this.getUserInfo();
    }
  }
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