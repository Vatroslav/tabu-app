import { createRouter, createWebHistory } from 'vue-router';

import Login from '../views/Login.vue';
import EmailVerification from '../views/EmailVerification.vue';
import Results from '../views/Results.vue';

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
  {
    path: '/results',
    name: 'Results',
    component: Results,
  },
];

const router = createRouter({
  history: createWebHistory(typeof process !== 'undefined' ? process.env.BASE_URL || '/' : '/'),
  routes,
});

export default router;
