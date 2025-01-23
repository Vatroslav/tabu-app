import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import GAuth from 'vue3-google-login';

const app = createApp(App);

const gauthOption = {
  clientId: process.env.VUE_APP_OAUTH_CLIENT_ID,
  scope: 'profile email',
  prompt: 'select_account'
};
app.use(GAuth, gauthOption);
app.use(router);

app.mount('#app');
