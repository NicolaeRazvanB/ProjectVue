import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import AddWinery from "../views/AddWinery.vue";
import AddWine from "../views/AddWine.vue";
import EditWinery from "../views/EditWinery.vue";
import EditWine from "../views/EditWine.vue";
import Wines from "../views/Wines.vue";
import store from "../store";
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
      path: "/addWine",
      name: "AddWine",
      component: AddWine,
    },
    {
      path: "/addWinery",
      name: "AddWinery",
      component: AddWinery,
    },
    {
      path: "/editWine",
      name: "EditWine",
      component: EditWine,
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

router.beforeEach((to, from, next) => {
  console.log(store);
  if (to.name === "Home" || to.name === "Login" || to.name === "Register") {
    next();
  } else if (to.name !== "Login" && !store.state.isAuthenticated) {
    next({ name: "Login" });
  } else {
    next();
  }
});
export default router;
