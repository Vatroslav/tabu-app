<script setup lang="ts">
import { APP_VERSION } from '../utils/version';

defineProps<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  showLabel?: boolean;
}>();
</script>

<template>
  <div class="version-display" :class="position">
    <span v-if="showLabel">Version</span>
    {{ APP_VERSION }}
  </div>
</template>

<style scoped>
.version-display {
  font-size: 0.8em;
  color: #666;
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.version-display.top {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.version-display.bottom {
  position: absolute;
  bottom: 20px;
  left: 20px;
  transform: none;
}

.version-display.left {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.version-display.right {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style> 