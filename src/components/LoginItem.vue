<template>
  <div class="login">
    <img src="/tabu_small_logo_login.webp" alt="Tabu Small Logo" class="small-logo-login" />
    <h1>Login to your Tabu account</h1>
    <GoogleLogin :buttonConfig="buttonConfig" :callback="callback" prompt auto-login />
    <div v-if="showRegister" class="register">
      You are not registered yet. <br><br>
      Please,
      <a href="https://tabuhr.pro.typeform.com/new-user?utm_source=webapp&utm_medium=login">
        fill out the questionnaire</a> to get started.
      <br><br>
      If you have already filled out the questionnaire, <br>please wait approximately <b>5 minutes</b> for your account
      to be created.
      <br><br>
      If it still doesn't work, please contact us at info@tabu.hr
    </div>
  </div>
</template>

<script setup lang="ts">
import { decodeCredential, GoogleLogin } from 'vue3-google-login'
import type { CallbackTypes } from 'vue3-google-login'
import { checkEmail } from '@/services/auth/google'
import router from '@/router'
import { ref, computed } from 'vue'
import { handleLogout } from '@/services/logout'

type GoogleUserData = {
  email: string
  given_name: string
}

const showRegister = ref(false)

const callback: CallbackTypes.CredentialCallback = async response => {
  // This callback will be triggered when the user selects or logs in to their Google account from the popup
  const userData: GoogleUserData = decodeCredential(
    response.credential,
  ) as GoogleUserData
  checkEmail(userData.given_name, userData.email, response.credential).then(function (resp) {
    if (!resp.success) {
      console.error('Error', resp.error ?? ' logging in!')
      showRegister.value = true // Show registration message on error
      return
    }
    showRegister.value = !resp.response.exists
  }).catch(error => {
    console.error('Login error:', error)
    showRegister.value = true // Show registration message on error
  })
}

const screenWidth = ref(window.innerWidth)

const buttonConfig = computed(() => {
  let width = '500px' // Default width for desktops
  if (screenWidth.value < 768) width = '250px' // Mobile

  return {
    text: 'continue_with', // "signin_with", "signup_with", "continue_with"
    size: 'large',
    width, // Dynamic width update
    shape: 'pill',
  }
})
</script>

<style scoped>
h1 {
  font-weight: 500;
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
}

.register {
  margin-top: 20px;
  text-align: center;
  font-weight: 300;
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
