<template>
  <v-card class="pa-2">
    <v-form class="text-center form" @submit.prevent="createWorkspace">
      <v-avatar @click="$refs.imageInput.$refs.input.click()" class="workspace-image mb-8" size="150" >
        <v-icon v-if="!logo">
          mdi-camera-plus
        </v-icon>
        <v-img v-if="logo" :src="getImage">

        </v-img>
      </v-avatar>
      <v-text-field
          class="field"
          v-model="name"
          label="Workspace Name"
          placeholder="My New Workspace"
          :rules="nameRule"
          filled>
      </v-text-field>

      <v-text-field
          class="field"
          v-model="url"
          label="Workspace url"
          placeholder="my_workspace"
          :rules="urlRule"
          filled>
      </v-text-field>
      <v-file-input v-show="false" ref="imageInput" v-model="logo">
      </v-file-input>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined type="button" @click="$emit('discard')" color="error">Discard</v-btn>
        <v-btn depressed color="primary" type="submit">Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>

export default {
  name: "BasicInfo",
  data() {
    return {
      nameRule: [
          v => !!v || 'A name is required',
          v => (v || '').length >= 4 || 'Name must be at least 4 character'
      ],
      urlRule: [
          v => !!v || 'A URL is required',
          v => v.indexOf(' ') < 0 || 'Space is not allowed in url'
      ],
      name: '',
      logo: '',
      url: '',
    }
  },
  methods: {
    createWorkspace: function () {
      const body = new FormData();
      body.append('name', this.name);
      body.append('logo', this.logo);
      body.append('url', this.url);
      this.$store.dispatch('createWorkspace', body).then(() => {
        const message = `${this.name} created. Add your teammates now!`
        this.$store.dispatch('showMessage', {message, color: 'success'})
        this.$emit('next', this.url);
      }).catch(err => {
        const message = err.response.data.message
        this.$store.dispatch('showMessage', {message, color: 'error'})
      });
    },
  },
  computed: {
    getImage: function () {
      return this.logo? URL.createObjectURL(this.logo): undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.form {
  .field {
    margin: auto;
    max-width: 350px;
  }
}
.workspace-image {
  border: 1px solid black;
  cursor: pointer;
}
</style>