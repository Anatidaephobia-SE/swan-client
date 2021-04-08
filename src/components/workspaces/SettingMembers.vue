<template>
  <v-container>
    <v-card-title>
      <v-icon class="mr-1">mdi-account-multiple</v-icon>
      People
    </v-card-title>

    <v-list>
      <v-list-item two-line>
        <v-list-item-avatar>
          <v-img src="https://i.pravatar.cc/100"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
        <v-list-item-title>Amir Esmaeili <v-chip color="accent" x-small>
          <v-icon x-small>mdi-star</v-icon>
        </v-chip></v-list-item-title>
        <v-list-item-subtitle>amiresm17@gmail.com</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-divider class="my-4"></v-divider>
    <v-form @submit.prevent="addMember" class="add-form">
      <p>You can add new people to your team. Enter their email and click on ADD button.</p>
      <v-text-field filled
                    label="Email"
                    :rules="emailRule"
                    @keyup.enter="addMember"
                    placeholder="john-doe@example.com"
                    append-icon="mdi-account-plus">

      </v-text-field>
      <v-card-actions>
        <v-btn depressed color="primary">ADD</v-btn>
      </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "SettingsMember",
  data() {
    return {
      people: [],
      emailRule: [
          v => !!v || 'Email is required',
          v => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(v) || "Invalid email";
          }
      ]
    }
  },
  methods: {
    addMember: function () {}
  }
}
</script>

<style lang="scss" scoped>
.add-form {
  width: max-content;
}
</style>