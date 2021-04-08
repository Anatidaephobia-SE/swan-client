<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-checkbox-marked-outline</v-icon>
      Actions
    </v-card-title>
    <v-card-text>
    <p>Now you're done with creating your content, select the action you want to do with it.</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn depressed color="primary">Publish</v-btn>
      <v-btn depressed color="accent">schedule</v-btn>
      <v-btn depressed color="info">draft</v-btn>
      <v-btn depressed color="error">Remove</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-container>
</template>

<script>
export default {
  name: "PostActions"
}
</script>

<style scoped>

</style>