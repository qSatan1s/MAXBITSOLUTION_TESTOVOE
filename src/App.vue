<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import MobileMenuButton from '@/components/ui/MobileMenuButton.vue'
import Overlay from '@/components/ui/Overlay.vue'

const isMobileMenuOpen = ref<boolean>(false)
const closeMobileMenu = () => isMobileMenuOpen.value = false
</script>

<template>
  <div class="app-container">
    <MobileMenuButton v-model="isMobileMenuOpen" />

    <Overlay
      :is-visible="isMobileMenuOpen"
      @click="closeMobileMenu"
    />

    <Sidebar
      :is-mobile-open="isMobileMenuOpen"
      @close-mobile="closeMobileMenu"
    />

    <main class="main">
      <router-view />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.main {
  margin-left: $sidebar-width;
  flex: 1;
  position: relative;
  z-index: 5;
  padding: 40px;
  overflow-x: hidden;
}

@media (max-width: 768px) {
  .main {
    margin-left: 0;
    padding: 80px 20px 20px 20px;
  }
}

@media (max-width: 480px) {
  .main {
    padding: 80px 15px 15px 15px;
  }
}
</style>
