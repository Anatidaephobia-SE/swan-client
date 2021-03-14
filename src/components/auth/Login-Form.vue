<template>
  <div class="login-form">
    <v-form v-model="valid" @submit.prevent="login">
      <v-container>
        <p style="font-size: 14px">
          Welcome back! Please login to your account.
        </p>

        <v-text-field
          label="email"
          filled
          :rules="emailRule"
          type="email"
          placeholder="john-doe@example.com"
        ></v-text-field>
        <v-text-field
          :rules="passwordRule"
          label="password"
          filled
          type="password"
        ></v-text-field>
        <div class="mb-2 text-right">
          <router-link style="font-size: 14px" to="#"
            >Forget password?</router-link
          >
        </div>
        <v-btn
          :loading="loading"
          :disabled="loading || !valid"
          color="primary"
          class="ma-1"
          depressed
          type="submit"
          >Login</v-btn
        >
        <v-btn color="primary" to="/sign-up" class="ma-1" outlined
          >Sign Up</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      emailRule: [
        (value) => !!value || "Please enter your email",
        (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid email";
        },
      ],
      passwordRule: [
        (value) => !!value || "Please enter your password",
        (value) => (value || "").length >= 6 || "The password is too short",
      ],
      loading: false,
    };
  },
  methods: {
    login: function () {
      this.loading = true;
    },
  },
};
</script>

<style>
</style>