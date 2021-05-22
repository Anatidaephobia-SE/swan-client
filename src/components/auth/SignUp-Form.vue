<template>
  <div class="signup-form">
    <v-stepper v-model="step" class="elevation-0" vertical>
      <v-stepper-step :complete="step > 2" step="1">
        Basic Info
        <small>email and password</small>
      </v-stepper-step>

      <v-stepper-content step="1">
        <v-form ref="register" v-model="valid" @submit.prevent="signUp">
          <v-container>
            <p>Create a new account now! and gather your team around.</p>
            <v-text-field
                v-model="email"
                :rules="rules.email"
                filled
                label="Email"
                placeholder="john-doe@exapmle.com"
                type="text"
            >
            </v-text-field>
            <v-text-field
                v-model="password"
                :rules="rules.password"
                filled
                label="Password"
                type="password"
            >
            </v-text-field>
            <v-text-field
                v-model="confirmPassword"
                :rules="rules.confirmPassword"
                filled
                label="Confirm Password"
                type="password"
            >
            </v-text-field>

            <v-btn
                ref="signupBtn"
                :disabled="loading || !valid"
                :loading="loading"
                color="primary"
                depressed
                type="submit"
            >Sign Up
            </v-btn>
          </v-container>
        </v-form>
      </v-stepper-content>

      <v-stepper-step :complete="step > 2" step="2">
        Your additional info
      </v-stepper-step>

      <v-stepper-content step="2">
        <v-form ref="updateProfile" v-model="valid" @submit.prevent="updateAddInfo">
          <v-container>
            <v-file-input v-model="profileImg" filled label="profile picture">
            </v-file-input>
            <v-text-field
                v-model="firstname"
                :rules="rules.name"
                filled
                label="First Name"
                placeholder="John"
                type="text"
            >
            </v-text-field>
            <v-text-field
                v-model="lastname"
                :rules="rules.name"
                filled
                label="Last Name"
                placeholder="Doe"
                type="text"
            >
            </v-text-field>
            <v-btn
                :disabled="loading || !valid"
                :loading="loading"
                color="primary"
                depressed
                type="submit"
            >Update
            </v-btn
            >
          </v-container>
        </v-form>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignUpForm",
  data() {
    return {
      step: 1,
      token: "",
      valid: false,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirmPassword: "",
      profileImg: undefined,
      loading: false,
      rules: {
        email: [
          (value) => !!value || "Please enter your email",
          (value) => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return pattern.test(value) || "Invalid email";
          },
        ],
        name: [(value) => !!value || "Please enter your name"],
        password: [
          (value) => !!value || "Please enter your password",
          (value) =>
              (value || "").length >= 6 ||
              "Password must be at least 6 characters",
        ],
        confirmPassword: [
          (value) => !!value || "Please enter a matching password",
          (value) => value === this.password || "The passwords does not match",
        ],
      },
    };
  },
  methods: {
    signUp: function () {
      this.loading = true;
      const data = {
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword
      };
      this.$store.dispatch('register', data)
          .then(() => {
            const message = "Verification email is sent";
            this.$store.dispatch('showMessage', {message, color: 'success'})
          })
          .catch(err => {
            const message = err.response.data.message
            this.$store.dispatch('showMessage', {message, color: 'error'})
          })
          .finally(() => this.loading = false);
    },
    updateAddInfo: function () {
      this.loading = true;
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        profileImg: this.profileImg
      };
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token
      this.$store.dispatch('updateUserInfo', data)
          .then(() => {
            const message = `You have registered successfully`;
            this.$store.dispatch('showMessage', {message, color: 'success'});
            this.$router.push('/login').then();
          })
          .catch(err => {
            const message = err.response.data.error;
            this.$store.dispatch('showMessage', {message, color: 'error'});
          })
          .finally(() => this.loading = false)

    },
  },
  mounted: function () {
    this.token = this.$route.query.token;
    if (this.token) {
      // User came by email
      this.step = 2;
    }
  },
};
</script>

<style>
</style>