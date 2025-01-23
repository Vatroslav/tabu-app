# Documentation of Changes

## Overview
This documentation outlines the changes made to set up a Vue.js frontend with an OAuth login page and email verification via an external API with CORS enabled.

### 2025-01-22
- Created `package.json` file with initial configuration for the Vue.js project.
- Updated `VUE_APP_API_ADDRESS` to `https://api.beta.tabu.nimes.ink` in `.env`.
- Added `API_ROUTE=/api` to `.env`.
- Updated `src/views/EmailVerification.vue` to include email validation route and CORS handling.

## 2025-01-21 Files Created

### 1. `src/main.js`
This file initializes the Vue.js application and sets up the router.

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

### 2. `src/App.vue`
This file defines the main App component, which includes the router view.

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 3. `src/router/index.js`
This file sets up the Vue Router with routes for the login and email verification pages.

```javascript
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
```

### 4. `src/views/Login.vue`
This file defines the Login component with a button for OAuth login.

```vue
<template>
  <div class="login">
    <h1>Login</h1>
    <button @click="loginWithOAuth">Login with OAuth</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    loginWithOAuth() {
      const apiAddress = process.env.VUE_APP_API_ADDRESS;
      const apiPort = process.env.VUE_APP_API_PORT;
      console.log('API Address:', apiAddress);
      console.log('API Port:', apiPort);
      // Implement OAuth login logic here using apiAddress and apiPort
    },
  },
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
```

### 5. `src/views/EmailVerification.vue`
This file defines the EmailVerification component with a message for email verification.

```vue
<template>
  <div class="email-verification">
    <h1>Email Verification</h1>
    <p>Please check your email for the verification link.</p>
  </div>
</template>

<script>
export default {
  name: 'EmailVerification',
  mounted() {
    // Implement email verification logic here
    console.log('Email verification');
  },
};
</script>

<style scoped>
.email-verification {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
```

### 6. `.env`
This file contains environment variables for the API address and port.

```
VUE_APP_API_ADDRESS=https://api.example.com
VUE_APP_API_PORT=443
```

## Summary
