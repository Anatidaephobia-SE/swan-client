<template>
  <v-row>
    <v-col md="4">
      <Boards title="To Do" board-name="todo"/>
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
import {mapActions} from "vuex"
export default {
  name: "Ideas",
  components: {Boards},
  methods: {
    ...mapActions('ideas', ['getCards'])
  },
  created() {
    const teamId = this.$route.params.workspace
    this.getCards(teamId)
  }
}
</script>

<style scoped>

</style>