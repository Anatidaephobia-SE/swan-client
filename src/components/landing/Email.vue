<template>
  <div class="text-center main-layout">
    <v-row class="content">
      <v-col md="7" cols="12">
        <v-img
          max-height="500"
          :src="require('@/assets/graphics/email.svg')"
          contain
        />
      </v-col>
      <v-col md="5" cols="12">
        <v-card elevation="5">
          <v-card-title class="orange--text justify-center">
              We notify your users
          </v-card-title>
          <v-card-text>
              Create email templates and schedule emails.
              We reach you for target users, and send them the suitable notification.
              Templates are really cool things. You should try them.
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.main-layout {
  height: 100vh;
  padding-top: 2rem;
  background-color: #e0e0e0;
  .content {
    padding: 4rem;
    align-items: center;
    height: 100%;
  }
}
</style>