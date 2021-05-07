<template>
  <v-container>
    <v-card outlined>
      <v-toolbar
          color="accent"
          dark
          dense
          elevation="1">
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <draggable :list="boards[boardName]" class="card-gp pa-2" group="idea">
        <Card
            v-for="(c, i) in boards[boardName]"
            :key="i" :card="c"/>
      </draggable>
    </v-card>
  </v-container>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Card from "@/components/ideas/Card";
import draggable from "vuedraggable"

export default {
  name: "Boards",
  components: {Card, draggable},
  props: {
    title: String,
    boardName: String,
  },
  mounted() {
  },
  computed: {
    ...mapState({
      boards: state => state.ideas
    }),
  },
  methods: {
    ...mapMutations({
      addCard: 'ideas/ADD_CARD'
    })
  }
}
</script>

<style lang="scss" scoped>
.card-gp {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>