# Changes Made for Results Page v0.1

## New Features

1. **Results Page**: Added a new Results page that the user is redirected to upon successful login via Google.
   - Created a new Vue component for the Results page (`src/views/Results.vue`).
   - Updated the login logic in `src/views/Login.vue` to redirect to the Results page upon successful login.
   - Added a new route for the Results page in `src/router/index.js`.
   - Moved the `div` with id `user_details` from the Login page to the Results page to display user details on the Results page.

## Code Changes

### `src/views/Results.vue`
```vue
<template>
  <div>
    <h1>Results Page</h1>
    <p>Welcome to the Results page!</p>
    <div id="user_details" v-if="userDetails">
      <h2>User Details</h2>
      <p>Name: {{ userDetails.name }}</p>
      <p>Email: {{ userDetails.email }}</p>
      <p>Profile Picture: <img :src="userDetails.picture" alt="Profile Picture"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Results',
  computed: {
    ...mapState(['userDetails'])
  }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
```

### `src/views/Login.vue`
```javascript
async sendCodeToBackend(code) {
  try {
    const response = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
      client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
      redirect_uri: 'postmessage',
      grant_type: 'authorization_code'
    });

    const accessToken = response.data.access_token;
    console.log(accessToken);

    // Fetch user details using the access token
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log(userResponse);

    if (userResponse && userResponse.data) {
      // Set the userDetails data property to the userResponse object
      this.userDetails = userResponse.data;
      // Commit the userDetails to the Vuex store
      this.setUserDetails(this.userDetails);
      // Redirect to the Results page
      this.$router.push('/results');
    } else {
      // Handle the case where userResponse or userResponse.data is undefined
      console.error('Failed to fetch user details.');
    }
  } catch (error) {
    console.error('Token exchange failed:', error.response.data);
  }
}
```

### `src/router/index.js`
```javascript
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
```

### `src/store/index.js`
```javascript
import { createStore } from 'vuex';

export default createStore({
  state: {
    userDetails: null
  },
  mutations: {
    setUserDetails(state, userDetails) {
      state.userDetails = userDetails;
    }
  },
  actions: {
    setUserDetails({ commit }, userDetails) {
      commit('setUserDetails', userDetails);
    }
  },
  modules: {
  }
});
