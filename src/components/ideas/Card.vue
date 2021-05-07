<template>
  <v-card elevation="1" class="ma-1">
    <v-card-title>{{card.title}}</v-card-title>
    <v-card-subtitle>{{card.writer.email}}</v-card-subtitle>
    <v-card-text>
      {{card.context}}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object
  }
}
</script>

<style scoped>

</style>