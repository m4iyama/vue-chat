import Vue from 'vue';
import Firebase from 'firebase';
import Router from 'vue-router';
import RoomsView from './views/RoomsView.vue';
import LoginView from './views/LoginView.vue';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'rooms',
    },
    {
      path: '/',
      name: 'rooms',
      component: RoomsView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(v => v.meta.requiresAuth);
  const { currentUser } = Firebase.auth();

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
