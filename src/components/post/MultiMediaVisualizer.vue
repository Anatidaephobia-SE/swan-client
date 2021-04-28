<template>
  <v-row class="justify-end my-2 rounded pa-2">
    <v-col
        v-for="(img, i) in post.multimedia"
        :key="i"
        :cols="getColumnNumber"
        class="pa-0 ma-0">
      <v-img
          :height="height"
          :src="getImageUrl(img)"
          alt="img"
          class="float-right"></v-img>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import {mapState} from 'vuex'

export default {
  name: "MultiMediaVisualizer",
  methods: {
    getImageUrl: function (img) {
      if (img.hasOwnProperty('media')) {
        return axios.defaults.baseURL + img.media
      }
      return URL.createObjectURL(img)
    }
  },
  computed: {
    getColumnNumber: function () {
      return this.post.multimedia.length === 1 ? 12 : 6
    },
    height: function () {
      const sizes = {
        1: '',
        2: '300',
        3: '200',
        4: '200'
      }
      return sizes[this.post.multimedia.length]
    },
    ...mapState('post', ['post'])
  }
}
</script>

<style scoped>

</style>