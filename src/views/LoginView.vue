<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import Login from '@/components/LoginItem.vue';

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
  <main>
    <Login />
  </main>
</template>
