import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    loginState: false,
    user: { userName: null, userId: null }
  },
  mutations: {
    LOGINSTATE(state, loginState) { state.loginState = loginState },
    loginSuccess(state, values) { state.user.userName = values.userName, state.user.userId = values.userId }
  },
  actions: {
    loginState(context, value) { context.commit('LOGINSTATE', value) },
    user ({ commit }, values){
      commit('loginSuccess', {
        userName: values.userName,
        userId: values.userId
      })
    }
  },
  getters: {
    loginState: state => state.loginState,
    userName: state => state.user.userName,
    userId: state => state.user.userId
  }
});