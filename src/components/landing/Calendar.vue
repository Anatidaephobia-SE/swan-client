<template>
  <div class="text-center main-layout">
    <v-row class="content">
      <v-col md="5" cols="12">
        <v-card elevation="5">
          <v-card-title class="info--text justify-center">
            Get your personalized calendar
          </v-card-title>
          <v-card-text>
            You will have a completely personalized calendar for you and your
            teammates. It contains your published posts, scheduled posts and
            other events.
          </v-card-text>
        </v-card>
      </v-col>
      <v-col md="7" cols="12">
        <v-img
          max-height="500"
          :src="require('@/assets/graphics/calendar.svg')"
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
  height: 100vh;
  padding-top: 2rem;
  background-color: #eeeeee;
  .content {
    padding: 4rem;
    align-items: center;
    height: 100%;
  }
}
</style>