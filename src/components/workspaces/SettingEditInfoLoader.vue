<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-skeleton-loader
          class="mx-auto"
          max-width="200"
          type="image"
      ></v-skeleton-loader>
    </v-col>
    <v-col cols="12" md="4">
      <v-skeleton-loader
          type="list-item">
      </v-skeleton-loader>

      <v-skeleton-loader
          type="list-item">
      </v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SettingEditInfoLoader"
}
</script>

<style scoped>

</style>