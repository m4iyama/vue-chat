import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import router from './router';

Vue.use(Vuex);

const user = {
  namespaced: true,
  state: {
    userInfo: {},
  },
  actions: {
    fetchUserInfo({ state, rootState }) {
      Firebase.firestore().collection('users').doc(rootState.login.currentUser.uid).get().then(userInfo => {
        state.userInfo = userInfo;
      });
    },
  },
};
const login = {
  namespaced: true,
  state: {
    currentUser: null,
    showLoginForm: true,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    toggleForm(state) {
      state.showLoginForm = !state.showLoginForm;
    },
  },
  actions: {
    register({ commit, dispatch, state }, { username, email, password }) {
      console.log('register');
      Firebase.auth().createUserWithEmailAndPassword(email, password).then(response => {
        commit('setCurrentUser', response.user);

        Firebase.firestore().collection('users').doc(response.user.uid).set({
          username,
          introduction: '',
        }).then(() => {
          dispatch('fetchUserInfo').then(() => {
            router.push('rooms');
          });
        });
      });
    },
    login({ commit, dispatch, state }, { email, password }) {
      Firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
        commit('setCurrentUser', response.user);
        dispatch('user/fetchUserInfo').then(() => {
          router.push('rooms');
        });
      });
    },
  },
};

const store = new Vuex.Store({
  modules: {
    user,
    login,
  },
});

export default store;
