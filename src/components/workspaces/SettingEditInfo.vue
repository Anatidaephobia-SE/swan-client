<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-information</v-icon>
      Info</v-card-title>
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
                <v-icon v-show="editMode && !info.logo" size="50">mdi-camera-plus</v-icon>
                <v-icon v-show="!editMode && !info.logo" size="50">mdi-account</v-icon>
                <v-img v-if="info.logo" :src="getImgUrl"></v-img>
              </v-avatar>
            </template>

            <v-file-input ref="imageInput" v-show="false" v-model="info.logo" accpet="image/*"></v-file-input>

            <v-list>
              <v-list-item @click="info.logo = ''" v-if="info.logo">
                <v-list-item-title>Remove image</v-list-item-title>
              </v-list-item>
              <v-list-item @click="$refs.imageInput.$refs.input.click()">
                <v-list-item-title>Update image</v-list-item-title>
              </v-list-item>


            </v-list>

          </v-menu>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
              v-model="info.name"
              label="Workspace Name"
              :disabled="!editMode"
              filled>
          </v-text-field>
          <v-text-field
              :disabled="!editMode"
              v-model="info.url"
              filled label="Workspace URL">
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
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "SettingEditInfo",
  data() {
    return {
      info: {},
      editMode: false,
      imageMenu: false,
      loading: false
    }
  },
  computed: {
    getWorkspaceId: function () {
      return this.$route.params.workspace
    },
    getImgUrl: function () {
      if (typeof(this.info.logo) === 'string') {
        return axios.defaults.baseURL + this.info.logo;
      } else if (typeof(this.info.logo) === 'object') {
        return URL.createObjectURL(this.info.logo)
      }
      return ''
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo: function () {
      this.$store.dispatch('getWorkspaceInfo', this.getWorkspaceId).then(resp => {
        this.info = resp.data.team;
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message , color: 'error'});
      });
    },
    discardChanges: function () {
      this.getInfo();
      this.editMode = false;
    },
    saveChanges: function () {
      this.loading = true;
      const body = new FormData()
      body.append('name', this.info.name)
      body.append('team_id', this.getWorkspaceId)
      body.append('url', this.info.url)
      if (typeof this.info.logo === 'object' || this.info.logo === '') {
        body.append('logo', this.info.logo)
      }
      this.$store.dispatch('editWorkspaceInfo', body).then(() => {
        const message = `Workspace info updated!`;
        this.$store.dispatch('showMessage', {message , color: 'success'});
        this.editMode = false;
        this.$router.replace({params: {url: this.info.url}});
        this.getInfo();
      }).catch(err => {
        const message = err.response.data.error;
        this.$store.dispatch('showMessage', {message , color: 'error'});
      }).finally(() => this.loading = false);
    },
  }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  border: 1px solid #424242;
}
</style>