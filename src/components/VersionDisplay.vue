<script setup lang="ts">
import { APP_VERSION } from '../utils/version';

defineProps<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  showLabel?: boolean;
}>();
</script>

<template>
  <div class="version-display" :class="position">
    <span v-if="showLabel">Tabu app v</span>
    {{ APP_VERSION }}
  </div>
</template>

<style scoped>
.version-display {
  color: #000000;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

@media (min-width: 768px) {
  .version-display {
    font-size: 14px;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .version-display {
    font-size: 12px;
    position: absolute;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    justify-content: center;
  }
}
</style> 