<template>
  <div class="callback">
    <h1>Callback</h1>
    <p>Processing your login...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Callback',
  data() {
    return {
      userDetails: null
    };
  },
  methods: {
    async handleCallback() {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
const response = await axios.post('https://oauth2.googleapis.com/token', {
  code,
  client_id: process.env.VUE_APP_OAUTH_CLIENT_ID,
  client_secret: process.env.VUE_APP_OAUTH_CLIENT_SECRET,
  redirect_uri: process.env.VUE_APP_OAUTH_REDIRECT_URI,
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

          if (userResponse && userResponse.data) {
            // Set the userDetails data property to the userResponse object
            this.userDetails = userResponse.data;
            this.$router.push('/');
          } else {
            // Handle the case where userResponse or userResponse.data is undefined
            console.error('Failed to fetch user details.');
            this.$router.push('/login');
          }
        } else {
          console.error('Authorization code not found in URL.');
          this.$router.push('/login');
        }
      } catch (error) {
        console.error('Token exchange failed:', error.response.data);
        this.$router.push('/login');
      }
    }
  },
  mounted() {
    this.handleCallback();
  }
};
</script>

<style scoped>
.callback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
