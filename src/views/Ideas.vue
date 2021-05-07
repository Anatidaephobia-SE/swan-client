<template>
  <v-row>
    <v-col md="4">
      <Boards title="ToDo" board-name="todo"/>
    </v-col>
    <v-col md="4">
      <Boards title="In Progress" board-name="inProgress"/>

    </v-col>
    <v-col md="4">
      <Boards title="Done" board-name="done"/>

    </v-col>
  </v-row>
</template>

<script>
import Boards from "@/components/ideas/Boards";

export default {
  name: "Ideas",
  components: {Boards}
}
</script>

<style scoped>

</style>