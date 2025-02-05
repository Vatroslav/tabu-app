<script setup lang="ts">
import { ref, onMounted } from 'vue'
import router from '@/router'

type UserData = {
  name: string
}

let userData = ref<UserData>({
  name: '',
})
onMounted(() => {
  let localStorageString = localStorage.getItem('userData') ?? ''
  if (localStorageString === '') {
    router.push('/login')
  } else {
    userData.value = JSON.parse(localStorageString) as UserData
  }
})
</script>

<template>
  <div>Logged in as {{ userData.name }}</div>
</template>
