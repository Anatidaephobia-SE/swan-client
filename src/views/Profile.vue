<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-account</v-icon>
      Profile
    </v-card-title>
    <v-card-text>
      <UserInfo/>
    </v-card-text>
  </v-container>
</template>

<script>
import UserInfo from "@/components/profile/UserInfo";
export default {
name: "Profile",
  components: {UserInfo}
}
</script>

<style scoped>

</style>