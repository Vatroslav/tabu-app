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
