<template>
  <v-container>
    <v-row>
      <Workspace v-for="(w, i) in invites" :key="i" :workspace="w" :invite="true"/>
    </v-row>
  </v-container>
</template>

<script>
import Workspace from "@/components/workspaces/Workspace";

export default {
  name: "Invites",
  components: {Workspace},
  data() {
    return {
      invites: []
    }
  },
  methods: {

  },
  created() {
  },
  watch: {
  }
}
</script>

<style scoped>

</style>