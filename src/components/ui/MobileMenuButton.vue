<script setup lang="ts">
interface Props {
  modelValue: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function handleChange(event: Event): void {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <div class="mobile-menu-container">
    <input
      id="burger-checkbox"
      class="burger-checkbox"
      type="checkbox"
      :checked="modelValue"
      @change="handleChange"
    >
    <label class="burger" for="burger-checkbox" />
  </div>
</template>

<style lang="scss" scoped>
.mobile-menu-container {
  display: none;
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;

  @media (max-width: 768px) {
    display: block;
  }
}

.burger-checkbox {
  position: absolute;
  visibility: hidden;
}

.burger {
  cursor: pointer;
  display: block;
  position: relative;
  background: $button-bg;
  border: 1px solid $button-border;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  width: 44px;
  height: 44px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-within {
    outline: 2px solid $active-border;
    outline-offset: 2px;
  }
}

.burger::before,
.burger::after {
  content: '';
  position: absolute;
  left: 50%;
  display: block;
  width: 18px;
  height: 2px;
  border-radius: 1px;
  background: $text-primary;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

.burger::before {
  top: 50%;
  transform: translate(-50%, -50%) translateY(-6px);
  box-shadow: 0 6px 0 $text-primary;
}

.burger::after {
  top: 50%;
  transform: translate(-50%, -50%) translateY(6px);
}

.burger-checkbox:checked + .burger::before {
  transform: translate(-50%, -50%) rotate(45deg);
  box-shadow: 0 0 0 transparent;
}

.burger-checkbox:checked + .burger::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
