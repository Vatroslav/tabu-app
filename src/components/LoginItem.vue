<template>
  <div class="login">
    <img src="/tabu_small_logo_login.webp" alt="Tabu Small Logo" class="small-logo-login" />
    <h1>Login to your Tabu account</h1>
    <GoogleLogin :buttonConfig="buttonConfig" :callback="callback" prompt auto-login />
  </div>
</template>

<script setup lang="ts">
import { decodeCredential, GoogleLogin } from 'vue3-google-login'
import type { CallbackTypes } from 'vue3-google-login'
import { loginWithGoogle } from '@/services/auth/google'
import router from '@/router'
import { ref, computed } from 'vue';

type GoogleUserData = {
  email: string
  given_name: string
}

const callback: CallbackTypes.CredentialCallback = async response => {
  // This callback will be triggered when the user selects or login to his Google account from the popup
  const userData: GoogleUserData = decodeCredential(
    response.credential,
  ) as GoogleUserData
  loginWithGoogle(userData.given_name, userData.email).then(function (resp) {
    if (resp.data.success) {
      console.log('Successfully logged in', resp.data.response)
      const localUser = {
        name: resp.data.response.name,
      }
      localStorage.setItem('userData', JSON.stringify(localUser))
      router.push({ path: 'results' })
    } else {
      console.log('Error', resp.data.error ?? ' logging in!')
    }
  })
}

const screenWidth = ref(window.innerWidth);

const buttonConfig = computed(() => {
  let width = "500px"; // Default width for desktops
  if (screenWidth.value < 768) width = "250px"; // Mobile

  return {
    text: "continue_with", // "signin_with", "signup_with", "continue_with"
    size: "large",
    width, // Dynamic width update
    shape: "pill",
  };
});
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}


@media (max-width: 768px) {
  .small-logo-login {
    top: calc(50% - 150px);
    /* Adjust this value to position the logo slightly above the text */
    text-align: center;
  }
}


@media (min-width: 768px) {
  .small-logo-login {
    position: absolute;
    left: 10px;
    top: 10px;
    max-height: 50vh;
    max-width: 50vw;
    z-index: 1;
    padding: 10px;
  }
}
</style>
