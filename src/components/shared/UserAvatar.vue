<template>
  <v-avatar
      @click="$emit('clicked')"
      v-if="alt || image" :color="color" :class="otherCls" :size="size">
    <v-img v-if="image" :src="imageUrl"></v-img>
    <span class="headline" v-else>{{alt.slice(0, 1)}}</span>
  </v-avatar>
</template>

<script>
import axios from "axios";

export default {
  name: "UserAvatar",
  props: {
    image: String,
    alt: String,
    size: Number,
    otherCls: String
  },
  computed: {
    imageUrl: function () {
      return axios.defaults.baseURL + this.image
    },
    color: function () {
      return '#'+((Math.random() * 0xffffff + 0x1) <<0).toString(16);
    }
  }
}
</script>

<style scoped>

</style>