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
