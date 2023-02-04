import { createStore } from "vuex";

export default createStore({
  state: {
    isAuthenticated: localStorage.getItem("JWTtoken") ? true : false,
  },
  getters: {},
  mutations: {
    SET_AUTH: (state, status) => {
      state.isAuthenticated = status;
    },
  },
  actions: {
    login: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
  },
  modules: {},
});
