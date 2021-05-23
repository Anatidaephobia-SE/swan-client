<template>
  <div class="login-page">
    <div class="left pa-4 ml-4">
      <div>
        <h1 style="font-size: xxx-large" class="primary--text mb-4">Swan</h1>
        <h2 style="font-size: x-large" class="primary--text">
          Automated flow for your digital marketing strategy
        </h2>
      </div>
      <LoginForm class="mt-4" />
    </div>
    <div class="right pa-4" v-show="!$vuetify.breakpoint.mobile">
      <Intro />
    </div>
  </div>
</template>

<script>
import LoginForm from "../components/auth/Login-Form";
import Intro from "../components/auth/Intro";
export default {
  name: "Login",
  components: { LoginForm, Intro },
  mounted() {
    localStorage.removeItem('token')
    this.$store.commit('logout')
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  display: flex;
  height: 100%;
  .right {
    flex: 4;
    background: #e5e5e5;
  }
  .left {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
}
</style>
