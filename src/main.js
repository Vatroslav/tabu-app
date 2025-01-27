import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import GAuth from 'vue3-google-login';
import axios from 'axios';

// Set up global axios defaults
axios.defaults.baseURL = process.env.VUE_APP_API_ADDRESS;
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_API_KEY}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

const app = createApp(App);

const gauthOption = {
  clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
};
app.use(GAuth, gauthOption);
app.use(router);

app.mount('#app');
