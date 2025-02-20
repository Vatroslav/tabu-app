# Routing

The routing configuration is defined in `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultsView.vue'),
    },
  ],
})

export default router
```

## Routes

- **Login**: `/` or `/login` - Displays the login view.
- **Results**: `/results` - Displays the results view (lazy-loaded).
