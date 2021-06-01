<template>
  <div class="banner">
    <div class="overlay">
      <v-container class="content text-center" fluid>
        <h1 class="primary--text my-4" data-aos="zoom-in">Swan</h1>
        <h2 class="white--text" data-aos="zoom-in-up" data-aos-delay="300">
          Automated flow for your digital marketing strategy
        </h2>
        <div class="actions mt-10" data-aos="zoom-in-up" data-aos-delay="400">
          <v-btn depressed to="/signup" x-large class="mr-4" color="primary">
            Sign up Now!
          </v-btn>
          <v-btn outlined to="/login" x-large color="primary"> Login </v-btn>
        </div>
      </v-container>

      <div 
      v-if="$vuetify.breakpoint.mdAndUp"
      class="d-flex justify-center links">
        <a
          class="mx-4"
          v-for="(link, i) in links"
          :key="i"
          @click="scrollTo(link.id)"
          >{{ link.label }}</a
        >
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Introduction",
  methods: {
    scrollTo: function (id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth",
      });
    },
  },
  computed: {
    links: function () {
      return [
        { id: "network", label: "Social Networks" },
        { id: "ideas", label: "Future Ideas" },
        { id: "calendar", label: "Personalized Calendar" },
        { id: "email", label: "Scheduled Emails" },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.banner {
  background-image: url("../../assets/images/top.jpeg");
  background-size: cover;
  height: calc(100vh);
  width: 100%;
  .overlay {
    position: relative;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    .links {
      position: absolute;
      top: 2rem;
      width: 100%;
      padding: 5px;
    }
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