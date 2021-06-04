<template>
  <div class="main">
      <v-container>
          <v-img 
          max-height="400"
          contain
          :src="require('@/assets/graphics/404.svg')" />
      </v-container>
      <div class="text-center">
          <h4 class="text-h4 ma-2">We think this page doesn't exist :(</h4>
          <v-btn outlined class="ma-2" to="/">
              Go Home
          </v-btn>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.main {
    background-color: #f5f5ff;
    position: relative;
    height: 100%;
}
</style>