<template>
  <div class="banner">
    <div class="overlay">
      <v-container class="content text-center" fluid>
        <h1 class="primary--text my-4">Swan</h1>
        <h2 class="white--text">
          Automated flow for your digital marketing strategy
        </h2>
        <div class="actions mt-10">
          <v-btn depressed to="/signup" x-large class="mr-4" color="primary">
            Sign up Now!
          </v-btn>
          <v-btn outlined to="/login" x-large color="primary"> Login </v-btn>
        </div>
      </v-container>
    </div>
  </div>
</template>


<script>
export default {
  name: "Introduction",
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url("../../assets/images/top.jpeg");
  background-size: cover;
  height: calc(100vh);
  width: 100%;
  .overlay {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    .content {
      height: 100%;
      flex-direction: column;
      display: flex;
      justify-content: center;
      align-items: center;
      h1 {
        font-size: 60px;
        font-weight: 200;
        letter-spacing: 4px;
      }
      h2 {
        letter-spacing: 4px;
        font-size: 35px;
        font-weight: 100;
      }
    }
  }
}
@media screen and (max-width: 576px) {
  .banner {
    .overlay {
      .content {
        h1 {
          font-size: xx-large;
        }
        h2 {
          font-size: x-large;
        }
      }
    }
  }
}
</style>