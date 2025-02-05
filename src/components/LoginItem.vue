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
      router.push({ path: 'results' })
    } else {
      console.log('Error', resp.data.error ?? ' logging in!')
    }
  })
}
</script>

<template>
  <div class="login">
    <img src="/tabu_small_logo_login.webp" alt="Tabu Small Logo" class="small-logo-login" />
    <h1>Login to your Tabu account</h1>
    <!--<button class="gsi-material-button" style="width:400">
      <div class="gsi-material-button-state"></div>
      <div class="gsi-material-button-content-wrapper">
        <span class="gsi-material-button-contents">Continue with Google</span>
        <span style="display: none;">Continue with Google</span>
      </div>
    </button>-->
    <GoogleLogin :callback="callback" prompt auto-login />
  </div>
</template>


<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

.gsi-material-button {
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: WHITE;
  background-image: none;
  border: 1px solid #747775;
  -webkit-border-radius: 20px;
  border-radius: 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #1f1f1f;
  cursor: pointer;
  font-family: 'Roboto', arial, sans-serif;
  font-size: 14px;
  height: 40px;
  letter-spacing: 0.25px;
  outline: none;
  overflow: hidden;
  padding: 0 12px;
  position: relative;
  text-align: center;
  -webkit-transition: background-color .218s, border-color .218s, box-shadow .218s;
  transition: background-color .218s, border-color .218s, box-shadow .218s;
  vertical-align: middle;
  white-space: nowrap;
  width: auto;
  max-width: 400px;
  min-width: min-content;
}

.gsi-material-button .gsi-material-button-icon {
  height: 20px;
  margin-right: 12px;
  min-width: 20px;
  width: 20px;
}

.gsi-material-button .gsi-material-button-content-wrapper {
  -webkit-align-items: center;
  align-items: center;
  display: flex;
  -webkit-flex-direction: row;
  flex-direction: row;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.gsi-material-button .gsi-material-button-contents {
  -webkit-flex-grow: 0;
  flex-grow: 0;
  font-family: 'Roboto', arial, sans-serif;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}

.gsi-material-button .gsi-material-button-state {
  -webkit-transition: opacity .218s;
  transition: opacity .218s;
  bottom: 0;
  left: 0;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
}

.gsi-material-button:disabled {
  cursor: default;
  background-color: #ffffff61;
  border-color: #1f1f1f1f;
}

.gsi-material-button:disabled .gsi-material-button-contents {
  opacity: 38%;
}

.gsi-material-button:disabled .gsi-material-button-icon {
  opacity: 38%;
}

.gsi-material-button:not(:disabled):active .gsi-material-button-state,
.gsi-material-button:not(:disabled):focus .gsi-material-button-state {
  background-color: #303030;
  opacity: 12%;
}

.gsi-material-button:not(:disabled):hover {
  -webkit-box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, .30), 0 1px 3px 1px rgba(60, 64, 67, .15);
}

.gsi-material-button:not(:disabled):hover .gsi-material-button-state {
  background-color: #303030;
  opacity: 8%;
}
</style>
