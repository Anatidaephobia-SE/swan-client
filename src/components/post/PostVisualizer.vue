<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-2">mdi-eye</v-icon>
      How people will see
    </v-card-title>
    <v-card
        class="mx-auto ma-4 pa-4"
        max-width="700">
          <v-row>
            <v-col cols="1">
            <v-avatar
                class="profile"
                color="grey"
                size="50">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
            </v-col>
            <v-col cols="11">
              <v-card-title class="mt-0 pt-0">Amir Esmaeili</v-card-title>
              <v-card-subtitle>@amiresm17</v-card-subtitle>
            </v-col>
          </v-row>
      <div class="pa-2">
          <p>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
          </p>
      </div>
      <div class="d-flex justify-lg-space-around pa-2">
        <v-icon>mdi-comment-outline</v-icon>
        <v-icon>mdi-repeat</v-icon>
        <v-icon>mdi-heart-outline</v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "PostVisualizer"
}
</script>

<style scoped>

</style>