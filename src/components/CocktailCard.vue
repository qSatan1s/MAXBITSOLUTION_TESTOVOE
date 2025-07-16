<script setup lang="ts">
import type { Cocktail } from '@/types'

import { computed } from 'vue'
import { useLazyImage } from '@/composables'
import { extractIngredients } from '@/utils/cocktails'

interface Props {
  cocktail: Cocktail
}

const props = defineProps<Props>()

const ingredients = computed(() => extractIngredients(props.cocktail))

const { imageRef, isLoaded, hasError, onError } = useLazyImage({
  threshold: 0.1,
  rootMargin: '50px',
})
</script>

<template>
  <div class="cocktail-card">
    <div class="cocktail-header">
      <div ref="imageRef" class="cocktail-image-container">
        <img
          v-if="isLoaded && !hasError"
          :src="cocktail.strDrinkThumb"
          :alt="cocktail.strDrink"
          class="cocktail-image"
          loading="lazy"
          @error="onError"
        >
        <div v-else-if="!isLoaded && !hasError" class="image-skeleton">
          <div class="skeleton-shimmer" />
        </div>
        <div class="image-gradient" />
        <div v-if="hasError" class="image-placeholder">
          <div class="placeholder-icon">
            🍸
          </div>
          <div class="placeholder-text">
            {{ cocktail.strDrink }}
          </div>
        </div>
      </div>

      <div class="cocktail-title-section">
        <h2 class="cocktail-name">
          {{ cocktail.strDrink }}
        </h2>
        <div class="cocktail-badges">
          <span class="badge badge-primary">{{ cocktail.strAlcoholic }}</span>
          <span class="badge badge-secondary">{{ cocktail.strCategory }}</span>
          <span class="badge badge-tertiary">{{ cocktail.strGlass }}</span>
        </div>
      </div>
    </div>

    <div class="cocktail-content">
      <div class="content-section instructions-section">
        <div class="section-header">
          <div class="section-icon">
            📋
          </div>
          <h3 class="section-title">
            Instructions
          </h3>
        </div>
        <div class="section-content">
          <p class="instructions">
            {{ cocktail.strInstructions }}
          </p>
        </div>
      </div>

      <div class="content-section ingredients-section">
        <div class="section-header">
          <div class="section-icon">
            🧪
          </div>
          <h3 class="section-title">
            Ingredients
          </h3>
        </div>
        <div class="section-content">
          <div class="ingredients-grid">
            <div
              v-for="(ingredient, index) in ingredients"
              :key="index"
              class="ingredient-item"
            >
              <span class="ingredient-name">{{ ingredient.name }}</span>
              <span class="ingredient-measure">{{ ingredient.measure }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cocktail-card {
  background: linear-gradient(135deg, $card-bg1, $card-bg2);
  border: 1px solid $card-border;
  border-radius: 16px;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  width: 100%;
}

.cocktail-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.4);
}

.cocktail-header {
  display: flex;
  align-items: center;
  padding: 24px;
  gap: 20px;
  border-bottom: 1px solid $card-header-border;
  flex-shrink: 0;
}

.cocktail-image-container {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  background: #1a1a1a;
}

.cocktail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.cocktail-image:hover {
  transform: scale(1.1);
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  overflow: hidden;
}

.skeleton-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  animation: shimmer 1.5s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.image-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, $card-gradient 0%, transparent 60%);
  pointer-events: none;
  opacity: 0.4;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  color: $text-muted;
}

.placeholder-icon {
  font-size: 32px;
  margin-bottom: 8px;
  opacity: 0.6;
}

.placeholder-text {
  font-size: 11px;
  text-align: center;
  font-weight: 500;
  max-width: 80%;
  line-height: 1.3;
}

.cocktail-title-section {
  flex: 1;
}

.cocktail-name {
  font-size: 24px;
  font-weight: 700;
  color: $text-primary;
  margin: 0 0 12px 0;
  line-height: 1.2;
}

.cocktail-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary {
  background: linear-gradient(135deg, $badge1, $badge2);
  color: $text-primary;
}

.badge-secondary {
  background: rgba(255,255,255,0.1);
  color: $text-primary;
  border: 1px solid rgba(255,255,255,0.2);
}

.badge-tertiary {
  background: linear-gradient(135deg, $badge3, $badge4);
  color: $text-primary;
}

.cocktail-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1;
}

.content-section {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.instructions-section {
  flex: 1;
}

.ingredients-section {
  flex-shrink: 0;
}

.section-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.1);
  flex-shrink: 0;
}

.section-icon {
  font-size: 16px;
  margin-right: 10px;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: $text-primary;
  margin: 0;
}

.section-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.instructions {
  color: $text-secondary;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
  flex: 1;
}

.ingredients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.ingredient-item:hover {
  background: rgba(255,255,255,0.08);
  border-color: rgba(255,255,255,0.15);
}

.ingredient-name {
  font-size: 13px;
  color: $text-primary;
  font-weight: 500;
}

.ingredient-measure {
  font-size: 12px;
  color: $badge1;
  font-weight: 600;
}

@media (max-width: 768px) {
  .cocktail-card {
    min-height: auto;
  }

  .cocktail-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .cocktail-image-container {
    width: 100px;
    height: 100px;
  }

  .cocktail-name {
    font-size: 20px;
  }

  .cocktail-content {
    padding: 20px;
    gap: 20px;
  }

  .ingredients-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .cocktail-card {
    border-radius: 12px;
  }

  .cocktail-header {
    padding: 16px;
  }

  .cocktail-image-container {
    width: 80px;
    height: 80px;
  }

  .cocktail-name {
    font-size: 18px;
  }

  .cocktail-content {
    padding: 16px;
    gap: 16px;
  }

  .section-content {
    padding: 16px;
  }

  .instructions {
    font-size: 13px;
  }

  .ingredient-item {
    padding: 10px 12px;
  }

  .ingredient-name {
    font-size: 12px;
  }

  .ingredient-measure {
    font-size: 11px;
  }
}
</style>
