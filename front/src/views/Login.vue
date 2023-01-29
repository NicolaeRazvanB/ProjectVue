<template>
  <div>
    <br />
    <h1>Log In</h1>
    <form @submit.prevent="login()">
      <div>
        <label>Email</label>
        <div>
          <input v-model="email" type="email" />
        </div>
      </div>
      <div>
        <label>Password</label>
        <div>
          <input v-model="password" type="password" />
        </div>
      </div>
      <button type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      let data = {
        email: this.email,
        password: this.password,
      };
      let requestParams = { ...requestOptions };
      requestParams.method = "POST";
      requestParams.body = JSON.stringify(data);
      fetch(base_url + "login", requestParams).then((res) => {
        res.json().then((res) => {
          if (res.token) {
            localStorage.setItem("JWTtoken", res.token);
            this.$store.dispatch("login", true);
          }
          this.$router.push("/");
        });
      });
    },
  },
};
</script>

<style></style>
