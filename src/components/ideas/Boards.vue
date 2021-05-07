<template>
  <v-container>
    <v-card outlined>
      <v-toolbar
          color="accent"
          dark
          dense
          elevation="1">
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer/>
        <v-btn icon small>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
      <draggable
          v-bind="dragOptions"
          class="list-group pa-2"
          tag="ul"
          @end="drag = false"
          :emptyInsertThreshold="100"
          @start="drag = true">
        <transition-group :name="!drag ? 'flip-list' : null"
                          style="height: 100px;background-color: pink"
                          type="transition">
          <Card
              v-for="(c, i) in boards[boardName]"
              :key="i"
              :card="c"
              class="list-group-item">
          </Card>
        </transition-group>
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
  data() {
    return {
      drag: false
    }
  },
  mounted() {
  },
  computed: {
    ...mapState({
      boards: state => state.ideas
    }),
    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
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
  min-height: 200px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
</style>