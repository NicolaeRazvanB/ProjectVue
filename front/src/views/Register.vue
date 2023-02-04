<template>
  <div>
    <br />
    <h1>Register</h1>
    <form @submit.prevent="register()">
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
      <button type="submit" class="activeButtons">Register</button>
    </form>
    <h3>{{ registerResponse }}</h3>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      registerResponse: "",
    };
  },
  methods: {
    register() {
      let data = {
        email: this.email,
        password: this.password,
      };
      let requestParams = { ...requestOptions };
      requestParams.method = "POST";
      requestParams.body = JSON.stringify(data);
      fetch(base_url + "register", requestParams).then((res) => {
        res.text().then((res) => (this.registerResponse = res));
        this.email = "";
        this.password = "";
      });
    },
  },
};
</script>

<style></style>
