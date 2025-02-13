# Routing

The routing configuration is defined in `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultsView.vue'),
    },
    {
      path: '/submission',
      name: 'submission',
      component: () => import('@/views/SubmissionView.vue'),
    },
  ],
})

export default router
```

## Routes

- **Home**: `/` or `/home` - Displays the home view.
- **Login**: `/login` - Displays the login view.
- **About**: `/about` - Displays the about view (lazy-loaded).
- **Results**: `/results` - Displays the results view (lazy-loaded).
- **Submission**: `/submission` - Displays the submission view (lazy-loaded).
