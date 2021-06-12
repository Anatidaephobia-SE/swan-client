<template>
  <div class="loader">
      <v-skeleton-loader
          class="text-center d-flex justify-center"
          type="heading"
      ></v-skeleton-loader>
    <v-skeleton-loader
        class="justify-center"
        type="list-item-two-line"
    ></v-skeleton-loader>
    <v-skeleton-loader
        class="justify-center"
        type="paragraph"
    ></v-skeleton-loader>
    </div>
</template>

<script>
export default {
  name: "PostViewLoader"
}
</script>

<style lang="scss" scoped>
.loader {
  max-width: 600px;
  margin: auto;
}
</style>