<template>
  <v-container >
    <v-card-title>
      <v-icon class="mr-2">mdi-pencil</v-icon>
      Text And Multimedia
    </v-card-title>
    <v-card-text>
    <v-form v-model="valid" >
      <p>This field is only for you, to find your posts quickly.</p>
      <v-text-field filled
                    :rules="nameRule"
                    label="Name"
                    placeholder="My First Post">
      </v-text-field>

      <p>Please enter the caption you want to post, then click on the "next" button.</p>
      <v-textarea :rules="rule" label="Your tweet" auto-grow filled v-model="caption" counter >
      </v-textarea>
    </v-form>
    </v-card-text>
  </v-container>
</template>

<script>
export default {
  name: "PostData",
  data() {
    return {
      valid: false,
      name: '',
      caption: '',
      rule: [
          v => !!v || 'This field is required',
          v => (v || '').length >= 250 || 'Maximum length is over !'
      ],
      nameRule: [
          v => !!v || 'This field is required',
          v => (v || '').length >= 4 || 'Name must be at least 4 character'
      ]
    }
  }
}
</script>

<style scoped>

</style>