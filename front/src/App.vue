<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <nav>
    <div id="linkContainer">
      <RouterLink v-if="!isAuthenticated" to="/login" class="link"
        >Login</RouterLink
      >
      <RouterLink v-if="!isAuthenticated" to="/register" class="link"
        >Register</RouterLink
      >
      <RouterLink to="/" class="link">Home</RouterLink>
      <RouterLink v-if="isAuthenticated" to="/addWinery" class="link"
        >Add Winery</RouterLink
      >
    </div>
  </nav>
  <button v-if="isAuthenticated" @click="logout()" id="logoutBtn">
    Logout
  </button>
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
  height: 40px;
  background-color: rgb(82, 16, 9);
  border-radius: 5px;
}

.link {
  width: max-content;
  text-decoration: none;
  color: whitesmoke;
  margin: 2px;
  padding: 5px;
  border: 2px solid rgb(172, 75, 65);
  border-radius: 5px;
  text-align: center;
}
#logoutBtn {
  background-color: rgb(172, 75, 65);
  color: whitesmoke;
  border-radius: 5px;
  border-color: rgb(82, 16, 9);
  height: 30px;
  margin-top: 10px;
}

#linkContainer {
  display: flex;
  flex-direction: row;
  justify-items: center;
}
</style>
