<template>
  <v-dialog v-model="dialog" max-width="500">
    <v-card>
      <v-progress-linear
          v-if="loading"
          color="primary"
          indeterminate
      ></v-progress-linear>
      <v-card-title>
        Photo Gallery
      </v-card-title>
      <v-card-text class="photo-container">
        <v-row>
          <v-col v-for="(photo, i) in photos" :key="i" class="photo" md="4">
            <v-img
                :src="photo"
                @click="convertToFile(photo)">
            </v-img>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-img contain max-height="200" :src="require('@/assets/graphics/empty.svg')" />
            <span>There is no image yet!</span>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn
            color="primary"
            outlined
            @click="$emit('close-dialog')">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

import axios from "axios";

export default {
  name: "PhotoPicker",
  props: {
    dialog: Boolean
  },
  data() {
    return {
      photos: [],
      loading: false
    }
  },
  mounted() {
    this.getPhotos()
  },
  methods: {
    getPhotos: function () {
      const id = this.$route.params.workspace
      axios.get(`/api/v1/filestorage/all_media/?team_id=${id}`).then((res) => {
        this.photos = res.data
      })
    },
    convertToFile: async function (img) {
      this.loading = true
      const url = img.replace('http://localhost:9090', '')
      const response = await fetch(url)
      const contentType = response.headers.get('content-type')
      const blob = await response.blob()
      const file = new File([blob], `${Math.random()}.png`, {contentType})
      this.addToImages(file)
      this.loading = false
    },
    addToImages: function (file) {
      this.$store.commit('post/ADD_IMAGE', file)
      const message = "Image added successfully"
      this.$store.dispatch('showMessage', {message, color: 'success'})
    }
  }
}
</script>

<style lang="scss" scoped>
.photo-container {
  max-height: 400px;
  overflow-y: auto;
}

.photo {
  position: relative;
}

.progress-bar {
  position: absolute;
  top: 40%;
  right: 40%;
}
</style>