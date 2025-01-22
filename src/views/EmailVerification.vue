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
    const apiRoute = process.env.API_ROUTE;
    const email = 'user@example.com'; // Replace with actual email
    fetch(`${apiRoute}/user/check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' // Handle CORS
      },
      body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
      console.log('Email verification response:', data);
    })
    .catch(error => {
      console.error('Email verification error:', error);
    });
  }
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
