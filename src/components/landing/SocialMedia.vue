<template>
  <div class="text-center main-layout">
    <v-row class="content">
      <v-col md="5" cols="12" class="rounded">
        <v-card elevation="5" class="text-center">
          <v-card-title class="primary--text justify-center"> Integrate your social medias </v-card-title>
          <v-card-text>
            In the swan dashboard, connect your social networks. You can
            simply create posts, publish them or even schedule them, we will
            take care of it.
            Create drafts before publishing and get your teammates opinions.
            Finally see how that post goes by checking the analytics.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="7" cols="12">
        <v-img
          max-height="500"
          :src="require('@/assets/graphics/social.svg')"
          contain
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main-layout {
  padding-top: 2rem;
  height: calc(100vh);
  .content {
    height: 100%;
    align-items: center;
    padding: 4rem;
  }
}
</style>