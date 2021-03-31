<template>
  <v-card class="pa-2">
    <v-card-text>
      Hey. Your teammates are added, COOL! Now you can connect your social medias. Select the one you want.
      And click on the "DONE" button, when finished.
    </v-card-text>
    <v-card-text class="d-flex justify-space-around">
      <v-btn icon x-large><v-icon>mdi-twitter</v-icon></v-btn>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary" @click="$emit('done')" type="submit">Done</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ConnectToSocialMedia",
  props: {
    url: String
  }
}
</script>

<style scoped>

</style>