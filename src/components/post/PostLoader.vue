<template>
  <v-skeleton-loader
      v-bind="attrs"
      type="card-heading, list-item-three-line, list-item-avatar-two-line"
  ></v-skeleton-loader>
</template>

<script>
export default {
  name: "PostLoader",
  data: () => ({
    attrs: {
      class: 'mb-6',
      elevation: 2,
    },
  }),
}
</script>

<style scoped>

</style>