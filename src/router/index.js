import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login.vue';
import EmailVerification from '../views/EmailVerification.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/verify-email',
    name: 'EmailVerification',
    component: EmailVerification,
  },
];

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes,
});

export default router;
