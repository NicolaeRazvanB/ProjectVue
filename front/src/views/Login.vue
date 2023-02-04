<template>
  <div class="containerLogin">
    <div class="secondaryContainer">
      <h1>Log In</h1>
      <form @submit.prevent="login()">
        <label>Email</label>
        <input v-model="email" type="email" />
        <label>Password</label>
        <input v-model="password" type="password" />
        <button type="submit" class="activeButtons">Sign in</button>
      </form>
    </div>
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

<style>
.containerLogin {
  display: flex;
  justify-content: center;
}
.secondaryContainer {
  display: flex;
  flex-direction: column;
}
</style>
