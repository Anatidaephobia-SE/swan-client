<template>
  <div class="text-center main-layout">
    <v-row class="content pa-md-16 pa-6">
      <v-col md="7" cols="12">
        <v-img
          max-height="500"
          :src="require('@/assets/graphics/ideas.svg')"
          contain
        />
      </v-col>
      <v-col md="5" cols="12">
        <v-card elevation="5" data-aos="fade-left">
          <v-card-title class="accent--text justify-center">
            Track your tasks and projects
          </v-card-title>
          <v-card-text>
            Create new tasks and ideas, assign it to the people around. By
            different lists in your board, track how things are going. It will
            give you an organized view of process. For example: You want a to
            compose a new posts for off season, go ahead and create a card in
            the `todo` list. When you're ready to do it, just drag it and drop
            it in the `in progress` list. And when you're done, just simply take
            it to the `done` section. And your teammates will be informed about
            the task.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main-layout {
  height: calc(100vh);
  padding-top: 2rem;
  background-color: #f5f5f5;
  .content {
    align-items: center;
    height: 100%;
  }
}
</style>