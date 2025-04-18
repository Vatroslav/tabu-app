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
    <img src="/tabu_big_logo_mobile.svg" alt="Tabu Logo" class="logo" />
    <VersionDisplay position="bottom" show-label />
  </div>
</template>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.logo {
  width: 100%;
  max-width: 360px;
  height: auto;
  margin: 0;
  padding: 0;
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  transform: translateX(0);
}

main {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
}
</style>
