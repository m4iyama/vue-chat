import Vue from 'vue';
import Vuex from 'vuex';
import Firebase from 'firebase';
import router from './router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentUser: null,
    userInfo: {},
    registerForm: {
      username: '',
      email: '',
      password: '',
    },
    loginForm: {
      email: '',
      password: '',
    },
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
  },
  actions: {
    fetchUserInfo({ state }) {
      Firebase.firestore().collection('users').doc(state.currentUser.uid).get().then(userInfo => {
        state.userInfo = userInfo;
      });
    },
    register({ commit, dispatch, state }) {
      const { username, email, password } = state.registerForm;
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
    login({ commit, dispatch, state }) {
      const { email, password } = state.loginForm;
      Firebase.auth().signInWithEmailAndPassword(email, password).then(response => {
        commit('setCurrentUser', response.user);
        dispatch('fetchUserInfo').then(() => {
          router.push('rooms');
        });
      });
    },
  },
});


export default store;
