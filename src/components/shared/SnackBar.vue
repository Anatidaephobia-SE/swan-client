<template>
  <v-snackbar
      :color="color"
      v-model="show">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn
          v-bind="attrs"
          text
          @click="show = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data() {
    return {
      message: '',
      color: '',
      show: false
    }
  },
  mounted() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'newMessage') {
        this.message = state.snackbar.message
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>

</style>