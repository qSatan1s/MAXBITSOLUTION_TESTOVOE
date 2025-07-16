<script setup lang="ts">
interface Props {
  isVisible: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()

function handleClick(): void {
  emit('click')
}
</script>

<template>
  <Transition name="overlay">
    <div
      v-if="isVisible"
      class="overlay"
      @click="handleClick"
    />
  </Transition>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: $overlay-bg;
  z-index: 15;
  backdrop-filter: blur(4px);
  cursor: pointer;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}
</style>
