<template>
  <div class="text-center main-layout">
    <div class="overlay">
      <h3 class="text-h3 white--text">Want to hear more ?</h3>
      <p class="white--text ma-2 pa-2">
        In the swan there are many stunning features, that can grow your
        bussiness and make your marketing more organized and scheduled. But
        there is no way better than experiencing, so sign up now and add your
        team here!
      </p>

      <v-btn class="mt-4" x-large color="primary" outlined to="/sign-up">
        Sign UP
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  background-image: url("../../assets/images/customers.jpg");
  background-size: cover;
  position: relative;
  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 4rem;
    background-color: rgba($color: #000000, $alpha: 0.8);
  }
  .cards {
    height: 100%;
    align-items: center;
  }
  p {
    width: 60%;
  }
  @media screen and (max-width: 576px) {
    p {
      width: 100%;
    }
  }
}
</style>