<template>
  <div class="login-form">
    <v-form v-model="valid" @submit.prevent="login">
      <v-container>
        <p style="font-size: 14px">
          Welcome back! Please login to your account.
        </p>

        <v-text-field
            v-model="email"
            :rules="emailRule"
            filled
            label="email"
            placeholder="john-doe@example.com"
            type="email"
        ></v-text-field>
        <v-text-field
            v-model="password"
            :rules="passwordRule"
            filled
            label="password"
            type="password"
        ></v-text-field>
        <div class="mb-2 text-right">
          <router-link style="font-size: 14px" to="#"
          >Forget password?
          </router-link
          >
        </div>
        <v-btn
            :disabled="loading || !valid"
            :loading="loading"
            class="ma-1"
            color="primary"
            depressed
            type="submit"
        >Login
        </v-btn
        >
        <v-btn class="ma-1" color="primary" outlined to="/sign-up"
        >Sign Up
        </v-btn
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
      const email = this.email;
      const password = this.password;
      this.$store.dispatch('login', {email, password})
          .then(() => {
            const message = "Logged in successfully, redirecting ..."
            this.$store.dispatch('showMessage', {message, color: 'success'})
            this.$router.push('/')
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          })
          .finally(() => this.loading = false);
    },
  },
};
</script>

<style>
</style>