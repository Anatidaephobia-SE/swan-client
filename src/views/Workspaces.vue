<template>
  <v-container>
    <v-row>
      <Workspace v-for="i in 8" :key="i"/>
    </v-row>
  </v-container>
</template>

<script>
import Workspace from "@/components/workspaces/Workspace";

export default {
  name: "Workspaces",
  components: {Workspace}
}
</script>

<style scoped>

</style>