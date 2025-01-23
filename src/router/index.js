import { createRouter, createWebHistory } from 'vue-router';

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



const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
