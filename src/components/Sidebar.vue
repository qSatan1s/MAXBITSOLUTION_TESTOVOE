<script setup lang="ts">
import type { CocktailCategory, CocktailCode } from '@/types'
import { computed } from 'vue'

import { useRoute } from 'vue-router'
import { COCKTAIL_CODES } from '@/types'

interface Props {
  isMobileOpen?: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  closeMobile: []
}>()
const route = useRoute()

const categoriesConfig: Record<CocktailCode, Omit<CocktailCategory, 'code'>> = {
  margarita: { name: 'Margarita', description: 'Classic Mexican cocktail', icon: '🍹' },
  mojito: { name: 'Mojito', description: 'Refreshing Cuban drink', icon: '🌿' },
  a1: { name: 'A1 Cocktail', description: 'Premium cognac blend', icon: '🥃' },
  kir: { name: 'Kir Royal', description: 'French aperitif', icon: '🍷' },
}

const categories = computed<CocktailCategory[]>(() => {
  return COCKTAIL_CODES.map((code): CocktailCategory => ({
    code,
    ...categoriesConfig[code],
  }))
})

function handleMenuClick(): void {
  emit('closeMobile')
}
</script>

<template>
  <div class="sidebar" :class="{ 'mobile-open': isMobileOpen }">
    <div class="sidebar-content">
      <div class="logo">
        <div class="logo-icon">
          🍸
        </div>
        <div class="logo-text">
          <span class="logo-main">Cocktail</span>
          <span class="logo-sub">Database</span>
        </div>
      </div>
      <nav class="nav">
        <router-link
          v-for="cat in categories"
          :key="cat.code"
          :to="`/${cat.code}`"
          class="nav-item"
          :class="{ active: route.params.cocktail === cat.code }"
          @click="handleMenuClick"
        >
          <div class="nav-icon">
            {{ cat.icon }}
          </div>
          <div class="nav-content">
            <div class="nav-name">
              {{ cat.name }}
            </div>
            <div class="nav-desc">
              {{ cat.description }}
            </div>
          </div>
          <div v-if="route.params.cocktail === cat.code" class="nav-indicator" />
        </router-link>
      </nav>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: $sidebar-width;
  background: linear-gradient(180deg, $sidebar-bg1 0%, $sidebar-bg2 100%);
  border-right: 1px solid $sidebar-border;
  position: fixed;
  height: 100vh;
  z-index: 10;
  backdrop-filter: blur(10px);
  overflow-y: auto;
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
    z-index: 20;
  }

  .sidebar.mobile-open {
    transform: translateX(0);
  }
}

.sidebar-content {
  padding: 30px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.logo-icon {
  font-size: 28px;
  margin-right: 12px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-main {
  font-size: 18px;
  font-weight: 600;
  color: $text-primary;
}

.logo-sub {
  font-size: 12px;
  color: $text-muted;
  font-weight: 400;
}

.nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: 18px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  color: $text-primary;
  text-decoration: none;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateX(4px);
}

.nav-item.active {
  background: linear-gradient(135deg, $active-bg1, $active-bg2);
  border-color: $active-border;
}

.nav-item.active .nav-indicator {
  position: absolute;
  left: 0;
  top: 0;
  width: 3px;
  height: 100%;
  background: linear-gradient(180deg, $active-indicator1, $active-indicator2);
}

.nav-icon {
  font-size: 20px;
  margin-right: 15px;
}

.nav-content {
  flex: 1;
}

.nav-name {
  font-size: 15px;
  font-weight: 500;
  color: $text-primary;
  margin-bottom: 2px;
}

.nav-desc {
  font-size: 12px;
  color: $text-muted;
}

@media (max-width: 480px) {
  .sidebar-content {
    padding: 20px 15px;
  }

  .logo {
    padding: 15px;
    margin-bottom: 30px;
  }

  .nav-item {
    padding: 15px;
  }
}
</style>
