<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink v-if="!isAuthenticated" to="/login">Login</RouterLink>
    <RouterLink v-if="!isAuthenticated" to="/register">Register</RouterLink>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink v-if="isAuthenticated" to="/addWinery">Add Winery</RouterLink>
    <button v-if="isAuthenticated" @click="logout()" id="logoutBtn">
      Logout
    </button>
  </nav>

  <RouterView />
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.state.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.commit("SET_AUTH", false);
      window.localStorage.removeItem("JWTtoken");
      this.$router.push("/");
    },
  },
};
</script>
<style>
nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 30px;
  background-color: salmon;
}
</style>
