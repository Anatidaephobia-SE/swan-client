<template>
  <v-dialog
      v-model="show"
      max-width="350"
      persistent
      transition="dialog-bottom-transition"
  >
    <v-card>
      <v-card-title class="headline">
        {{ header }}
      </v-card-title>

      <v-card-text>
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
            color="error"
            outlined
            @click="$emit('close-dialog', true)"
        >
          Yes
        </v-btn>

        <v-btn
            color="primary"
            depressed
            @click="$emit('close-dialog', false)"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    show: Boolean,
    header: String,
    text: String
  }
}
</script>

<style scoped>

</style>