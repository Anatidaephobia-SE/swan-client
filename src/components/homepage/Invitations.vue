<template>
  <v-card max-width="600px">
    <v-card-title>Invitees</v-card-title>
    <v-card-text>
      <invitation
          @update="getInvitees"
          class="ma-1"
          v-for="(w, i) in invitees"
          :key="i"
          :workspace="w"></invitation>
      <div v-if="invitees.length === 0" class="d-flex flex-column align-center">
        <v-img contain max-width="200" :src="require('@/assets/graphics/empty.svg')" />
        <span>No new invitation!</span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import Invitation from "@/components/homepage/Invitation";
export default {
  name: "Invitations",
  components: {Invitation},
  data() {
    return {
      invitees: []
    }
  },
  mounted() {
    this.getInvitees()
  },
  methods: {
    getInvitees: function () {
      this.$store.dispatch('getInvites')
          .then(res => {
            this.invitees = res.data
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          });
    }
  }
}
</script>

<style scoped>

</style>