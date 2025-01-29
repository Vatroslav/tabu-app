import { createStore } from 'vuex';

export default createStore({
  state: {
    userDetails: null
  },
  mutations: {
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    }
  },
  actions: {
    setUserDetails({ commit }, userDetails) {
      commit('setUserDetails', userDetails);
    }
  },
  modules: {
  }
});
