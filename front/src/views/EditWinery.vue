<template>
  <div>
    <form @submit.prevent="editWinery()">
      <label> Name </label>
      <input v-model="name" type="text" required />
      <label> Location </label>
      <input v-model="location" type="text" required />
      <label> Founding Year </label>
      <select v-model="foundingYear">
        <option
          v-for="n in Array.from(
            { length: 801 },
            (v, i) => i + (new Date().getFullYear() - 800)
          )"
          :value="n"
        >
          {{ n }}
        </option>
      </select>

      <button type="submit">Save Changes</button>
    </form>
  </div>
</template>

<script>
import { requestOptions, base_url } from "@/requestOptions";

export default {
  data() {
    return {
      name: this.$route.query.name,
      location: this.$route.query.location,
      foundingYear: this.$route.query.foundingYear,
    };
  },

  methods: {
    editWinery() {
      let requestParams = { ...requestOptions };
      requestParams.headers.Authorization =
        "Bearer " + window.localStorage.getItem("JWTtoken");
      requestParams.method = "PUT";
      let data = {
        name: this.name,
        location: this.location,
        foundingYear: this.foundingYear,
      };
      requestParams.body = JSON.stringify(data);
      fetch(base_url + "wineries/" + this.$route.query.id, requestParams)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res === "Decoding failed!" || res === "Expired token") {
            console.log("Authentification Error");
          } else {
            let wineries = fetch(base_url + "wineries", requestOptions);
            this.$store.dispatch("fetchWineries", wineries);
            this.$router.push("/");
          }
        });
    },
  },
};
</script>

<style></style>
