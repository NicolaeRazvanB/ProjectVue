import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddWinery from "../views/AddWinery.vue";
import EditWinery from "../views/EditWinery.vue";
import Wines from "../views/Wines.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/addWinery",
      name: "AddWinery",
      component: AddWinery,
    },
    {
      path: "/editWinery",
      name: "EditWinery",
      component: EditWinery,
    },
    {
      path: "/wines",
      name: "Wines",
      component: Wines,
    },
  ],
});

export default router;
