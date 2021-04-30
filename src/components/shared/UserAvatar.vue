<template>
  <v-avatar
      @click="$emit('clicked')"
      v-if="alt || image" :color="color" :class="otherCls" :size="size">
    <v-img v-if="hasImg" :src="imageUrl" v-on:error="onImgError"></v-img>
    <span :class="substitutionCharClasses" :style="getCharStyle()" v-else>{{alt.slice(0, 1).toUpperCase()}}</span>
  </v-avatar>
</template>

<script>
import axios from "axios";

export default {
  name: "UserAvatar",
  data() {
    return {
      hasImg: true
    }
  },
  props: {
    image: String,
    alt: String,
    size: Number,
    otherCls: String,
    substitutionCharSize: {
      type: Number,
      default: function() {
        return this.size / 3
      }
    },
    substitutionCharClasses: {
      type: String,
      default: "mr-auto ml-auto"
    }
  },
  computed: {
    imageUrl: function () {
      if ((this.image !== null) && (this.image !== undefined))
      {
        this.hasImg = true
      } 
      else 
      {
        return
      }
      return axios.defaults.baseURL + this.image
    },
    color: function () {
      return '#'+((Math.random() * 0xffffff + 0x1) <<0).toString(16);
    }
  },
  mounted() {
    console.log(this.image)
    console.log(this.alt)
  },
  methods: {
    onImgError() {
      this.hasImg = false
    },
    getCharStyle() {
      return {
        "font-size":`${this.substitutionCharSize}px`
      }
    }
  }
}
</script>

<style scoped>

</style>