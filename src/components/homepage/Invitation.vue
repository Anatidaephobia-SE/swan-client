<template>
  <v-card elevation="0" outlined>
    <v-row class="pa-2">
      <v-col cols="3">
        <UserAvatar :alt="workspace.name" :image="workspace.logo" :size="40"/>
      </v-col>
      <v-col cols="9">
        <span>{{ workspace.name }}</span>
        <br>
        <span style="font-size: x-small">{{ workspace.head_name }} invited you!</span>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="reject" x-small outlined>Reject</v-btn>
      <v-btn color="primary" @click="accept" x-small depressed>Accept</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import UserAvatar from "@/components/shared/UserAvatar";

export default {
  name: "Invitation",
  components: {UserAvatar},
  props: {
    workspace: Object
  },
  methods: {
    accept: function () {
      this.$store
          .dispatch("acceptInvite", this.workspace.url)
          .then(() => {
            const message = `You joined ${this.workspace.name}, Hurray!`;
            this.$store.dispatch("showMessage", { message, color: "success" });
            this.$emit('update')
          })
          .catch((err) => {
            const message = err.response.data.message;
            this.$store.dispatch("showMessage", { message, color: "error" });
          });
    },
    reject: function () {
      this.$store
          .dispatch("rejectInvite", this.workspace.url)
          .then(() => {
            const message = `Rejected ${this.workspace.name} invitation!`;
            this.$store.dispatch("showMessage", { message, color: "info" });
            this.$emit('update')
          })
          .catch((err) => {
            const message = err.response.data.message;
            this.$store.dispatch("showMessage", { message, color: "error" });
          });
    },
  }
}
</script>

<style scoped>

</style>