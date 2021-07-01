<template>
  <v-container class="base">
    <div class="top-bar text-center">
      <nav>
        <router-link class="link" to="/login">Login</router-link>
        <router-link class="link" to="/sign-up">Sign Up</router-link>
        <router-link class="link" to="/about">About Us</router-link>
      </nav>
    </div>
    <div class="image d-flex justify-center align-center">
      <v-img
        contain
        min-width="650"
        max-width="750"
        :src="require('../../assets/graphics/login.svg')"
      >
      </v-img>
      <div class="text-center">
        <p>Anatidaephobia&copy;2021 - v1.3.0</p>
      </div>
    </div>
  </v-container>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.base {
  height: 100%;
}
.top-bar {
  .link {
    margin: 0 1rem;
    color: primary;
    text-decoration: none;
  }
}
.image {
  text-align: center;
  height: 100%;
  flex-direction: column;
}
</style>