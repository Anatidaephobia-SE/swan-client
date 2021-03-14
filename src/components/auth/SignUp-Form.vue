<template>
  <div class="signup-form">
    <v-form v-model="valid" @submit.prevent="signUp">
      <v-container>
        <p>Create a new account now! and gather your team around.</p>
        <v-text-field
          v-model="email"
          :rules="rules.email"
          filled
          label="email"
          type="text"
          placeholder="john-doe@exapmle.com"
        >
        </v-text-field>
        <v-text-field
          v-model="firstname"
          :rules="rules.name"
          filled
          label="first name"
          type="text"
          placeholder="John"
        >
        </v-text-field>
        <v-text-field
          v-model="lastname"
          :rules="rules.name"
          filled
          label="last name"
          type="text"
          placeholder="Doe"
        >
        </v-text-field>
        <v-text-field
          v-model="password"
          :rules="rules.password"
          filled
          label="password"
          type="password"
        >
        </v-text-field>
        <v-text-field
          v-model="confirm_password"
          :rules="rules.confirm_password"
          filled
          label="confirm password"
          type="password"
        >
        </v-text-field>

        <v-btn
          type="submit"
          depressed
          color="primary"
          :loading="loading"
          :disabled="loading || !valid"
          >Sign Up</v-btn
        >
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  name: "SignUpForm",
  data() {
    return {
      valid: false,
      email: "",
      firstname: "",
      lastname: "",
      password: "",
      confirm_password: "",
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
        confirm_password: [
          (value) => !!value || "Please enter a matching password",
          (value) => value === this.password || "The passwords does not match",
        ],
      },
    };
  },
  methods: {
    signUp: async function () {
      this.loading = true;
    },
  },
};
</script>

<style>
</style>