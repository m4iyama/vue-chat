import Vue from 'vue';
import Firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const config = {
  apiKey: 'AIzaSyAooohZ5ToV0KNPxpMfjAmOw4UX19M9Tg4',
  authDomain: 'vue-chat-1420b.firebaseapp.com',
  databaseURL: 'https://vue-chat-1420b.firebaseio.com',
  projectId: 'vue-chat-1420b',
  storageBucket: '',
  messagingSenderId: '456297073934',
};

Firebase.initializeApp(config);

let app;
Firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
