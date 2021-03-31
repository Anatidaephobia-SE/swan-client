<template>
  <v-dialog
      transition="dialog-bottom-transition"
      v-model="dialog"
      max-width="750">
    <v-card>
      <v-card-title>
        Create a new workspace!
      </v-card-title>
    <v-stepper class="elevation-0" v-model="step">
      <v-stepper-header>
        <v-stepper-step
            :complete="step > 1"
            step="1">
          Workspace Info
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step
            :complete="step > 2"
            step="2">
          Members
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step step="3">
          Connect Social Media
        </v-stepper-step>
      </v-stepper-header>


      <v-stepper-items>
        <v-stepper-content step="1">
          <BasicInfo @next="nextStep" @discard="$emit('close-dialog')"/>
        </v-stepper-content>

        <v-stepper-content step="2">
          <AddMember @next="step++" :url="url"/>
        </v-stepper-content>

        <v-stepper-content step="3">
          <ConnectToSocialMedia @done="$emit('close-dialog')" :url="url"/>
        </v-stepper-content>

      </v-stepper-items>
    </v-stepper>
    </v-card>
  </v-dialog>
</template>

<script>
import BasicInfo from "@/components/workspaces/BasicInfo";
import AddMember from "@/components/workspaces/AddMember";
import ConnectToSocialMedia from "@/components/workspaces/ConnectToSocialMedia";
export default {
  name: "NewWorkspace",
  props: {
    dialog: Boolean
  },
  components: {
    ConnectToSocialMedia,
    AddMember,
    BasicInfo

  },
  data() {
    return {
      step: 1,
      url: ''
    }
  },
  methods: {
    nextStep: function (url) {
      this.url = url;
      this.step++;
    },
  }
}
</script>

<style scoped>

</style>