<template>
  <v-container>
    <SettingEditInfo />
    <v-divider></v-divider>
    <SettingsMember />
    <v-divider></v-divider>
    <SettingsSocial />
  </v-container>
</template>

<script>
import SettingsMember from "@/components/workspaces/SettingMembers";
import SettingsSocial from "@/components/workspaces/SettingsSocial";
import SettingEditInfo from "@/components/workspaces/SettingEditInfo";
export default {
name: "Settings",
  components: {SettingEditInfo, SettingsSocial, SettingsMember}
}
</script>

<style scoped>

</style>