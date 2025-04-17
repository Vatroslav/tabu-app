<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Login from '@/components/LoginItem.vue';
import VersionDisplay from '../components/VersionDisplay.vue';

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = '';
};

onMounted(() => {
  disableScroll();
});

onUnmounted(() => {
  enableScroll();
});
</script>

<template>
  <div class="login-container">
    <main>
      <Login />
    </main>
    <VersionDisplay position="bottom" show-label />
  </div>
</template>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
}
</style>
