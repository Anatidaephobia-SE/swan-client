<template>
  <div class="text-center main-layout">
    <div class="overlay">
      <h3 data-aos="fade-up" class="text-h3 white--text">Want to hear more ?</h3>
      <p data-aos="fade-up" data-aos-delay="200" class="white--text ma-2 pa-2">
        In the swan there are many stunning features, that can grow your
        bussiness and make your marketing more organized and scheduled. But
        there is no way better than experiencing, so sign up now and add your
        team here!
      </p>

      <v-btn data-aos="fade-up" data-aos-delay="300" class="mt-4" x-large color="primary" outlined to="/sign-up">
        Sign UP
      </v-btn>
    </div>
    <v-btn icon @click="scrollToTop" x-large id="go-up" color="white">
      <v-icon> mdi-chevron-up </v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  methods: {
    scrollToTop: function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
};
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  background-image: url("../../assets/images/customers.jpg");
  background-size: cover;
  position: relative;
  #go-up {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .overlay {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
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