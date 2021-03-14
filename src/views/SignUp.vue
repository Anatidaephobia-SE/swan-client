<template>
  <div class="signup">
    <div class="left pa-4 ml-4">
      <h1 class="primary--text mb-4">Swan</h1>
      <SignUpForm />
    </div>
    <div class="right pa-4"><Intro /></div>
  </div>
</template>

<script>
import Intro from "../components/auth/Intro";
import SignUpForm from "../components/auth/SignUp-Form";

export default {
  name: "SignUp",
  components: { Intro, SignUpForm },
};
</script>

<style lang="scss" scoped>
.signup {
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