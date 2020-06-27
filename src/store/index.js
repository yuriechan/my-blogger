import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isPostSubmitted: false,
    postCount: 0
  },
  mutations: {
    incrementPostCount(state) {
      state.postCount++;
    }
  },
  actions: {},
  modules: {}
});
