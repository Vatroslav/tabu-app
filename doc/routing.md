# Routing

The routing configuration is defined in `src/router/index.ts`:

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { handleLogout } from '@/services/logout'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultsView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('@/views/LoginView.vue'),
      beforeEnter: async (to, from, next) => {
        try {
          await handleLogout()
          next({ name: 'login' })
        } catch (error) {
          console.error('Error during logout:', error)
          next({ name: 'login' })
        }
      }
    },
  ],
})

export default router
```

## Routes

- **Login**: `/` or `/login` - Authentication page for user login
- **Results**: `/results` - Displays user results and statistics (lazy-loaded)
- **Logout**: `/logout` - Handles user logout process and redirects to login

## Route Features

- **Lazy Loading**: The `/results` route is lazy-loaded to improve initial load performance
- **Authentication**: 
  - Login route is the default route (`/`)
  - Results route may require authentication
  - Logout route handles session termination
- **History Mode**: Uses HTML5 History Mode for clean URLs
- **Route Guards**: 
  - Logout route uses `beforeEnter` guard to handle logout process
  - Automatic redirection to login on logout completion or error
- **Route Aliases**: 
  - `/login` is an alias for the root path `/`
