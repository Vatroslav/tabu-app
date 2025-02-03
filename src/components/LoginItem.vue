<script setup lang="ts">
import { decodeCredential, GoogleLogin } from 'vue3-google-login'
import type { CallbackTypes } from 'vue3-google-login'
import { loginWithGoogle } from '@/services/auth/google'
import router from '@/router'

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
      router.push({ path: 'home' })
    } else {
      console.log('Error', resp.data.error ?? ' logging in!')
    }
  })
}
</script>

<template>
  <div>Login to Tabu</div>
  <GoogleLogin :callback="callback" prompt auto-login />
</template>
