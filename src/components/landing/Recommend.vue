<template>
  <div class="text-center main-layout">
    <div class="overlay">
      <h1 class="text-h3 primary--text">Hear from our customers</h1>
      <v-row class="cards">
        <v-col md="4" cols="12" v-for="(r, i) in recommedations" :key="i">
          <v-card>
            <div class="pa-4">
              <v-avatar class="justify-center" size="100">
                <v-img :src="r.profile" />
              </v-avatar>
            </div>
            <v-card-subtitle class="primary--text">
              {{ r.name }}
            </v-card-subtitle>
            <v-card-text>
              {{ r.text }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  data() {
    return {
      recommedations: [
        {
          name: "John",
          profile: "https://i.pravatar.cc/100?t=1",
          text: `We had struggle through managing posts in
                     different time zones. After gathering our team here, we are able to
                      publish ads and notifications without any trouble`,
        },
        {
          name: "Jane",
          profile: "https://i.pravatar.cc/100?t=2",
          text: `We had struggle through managing posts in
                     different time zones. After gathering our team here, we are able to
                      publish ads and notifications without any trouble`,
        },
        {
          name: "Ross",
          profile: "https://i.pravatar.cc/100?t=3",
          text: `We had struggle through managing posts in
                     different time zones. After gathering our team here, we are able to
                      publish ads and notifications without any trouble`,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  background-image: url("../../assets/images/customers.jpg");
  background-size: cover;
  position: relative;
  .overlay {
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
}
</style>