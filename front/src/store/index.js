import { createStore } from "vuex";

export default createStore({
  state: {
    wineries: [],
    isAuth: localStorage.getItem("JWTtoken") ? true : false,
  },
  getters: {
    wineries: (state) => {
      return state.wineries;
    },
  },
  mutations: {
    SET_AUTH: (state, status) => {
      state.isAuthenticated = status;
    },
    SET_WINERIES: (state, wineries) => {
      state.wineries = wineries;
    },
    ADD_WINERY: (state, winery) => {
      state.wineries.push(winery);
    },
    DELETE_WINERY: (state, winery) => {
      state.wineries.splice(state.wineries.indexOf(winery), 1);
    },
  },
  actions: {
    login: ({ commit }, payload) => {
      commit("SET_AUTH", payload);
    },
    fetchWineries: ({ commit }, payload) => {
      commit("SET_WINERIES", payload);
    },
    addWinery: ({ commit }, payload) => {
      commit("ADD_WINERY", payload);
    },
    deleteWinery: ({ commit }, payload) => {
      commit("DELETE_WINERY", payload);
    },
  },
  modules: {},
});
