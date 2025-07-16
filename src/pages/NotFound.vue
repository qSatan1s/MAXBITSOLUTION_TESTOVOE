<script setup lang="ts">
import { useRouter } from 'vue-router'

import { COCKTAIL_CODES } from '@/types'

const router = useRouter()

function goHome(): void {
  router.replace(`/${COCKTAIL_CODES[0]}`)
}
</script>

<template>
  <div class="not-found">
    <div class="error-container">
      <div class="error-icon">
        🍸
      </div>
      <div class="error-content">
        <h1 class="error-title">
          404
        </h1>
        <h2 class="error-subtitle">
          Коктейль не найден
        </h2>
        <p class="error-description">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Aut esse fuga laboriosam laudantium magnam molestias nam odio tempore voluptas.
          At ea eaque id illo iusto neque nesciunt nulla quasi voluptatem?
        </p>
        <div class="error-actions">
          <button type="button" class="primary-button" @click="goHome">
            <span class="button-icon">🏠</span>
            Вернуться на главную
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  position: relative;
  padding: 40px 20px;
}

.error-container {
  text-align: center;
  position: relative;
  z-index: 1;
  background: linear-gradient(135deg, $card-bg1, $card-bg2);
  border: 1px solid $card-border;
  border-radius: 24px;
  padding: 60px 40px;
  backdrop-filter: blur(20px);
  max-width: 500px;
  width: 100%;
}

.error-icon {
  font-size: 80px;
  margin-bottom: 30px;
  display: block;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.error-content {
  color: $text-primary;
}

.error-title {
  font-size: 72px;
  font-weight: 700;
  background: linear-gradient(135deg, $badge1, $badge2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 0 0 15px 0;
  line-height: 1;
}

.error-subtitle {
  font-size: 28px;
  font-weight: 600;
  color: $text-primary;
  margin: 0 0 20px 0;
}

.error-description {
  font-size: 16px;
  color: $text-secondary;
  line-height: 1.6;
  margin: 0 0 40px 0;
}

.error-actions {
  display: flex;
  justify-content: center;
}

.primary-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, $badge1, $badge2);
  border: none;
  border-radius: 12px;
  color: $text-primary;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.3);
}

.button-icon {
  font-size: 18px;
}

@media (max-width: 768px) {
  .not-found {
    padding: 20px 15px;
  }

  .error-container {
    padding: 40px 30px;
  }

  .error-icon {
    font-size: 60px;
  }

  .error-title {
    font-size: 56px;
  }

  .error-subtitle {
    font-size: 24px;
  }

  .error-description {
    font-size: 14px;
  }

  .primary-button {
    padding: 14px 24px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .error-container {
    padding: 30px 20px;
    border-radius: 16px;
  }

  .error-icon {
    font-size: 48px;
  }

  .error-title {
    font-size: 48px;
  }

  .error-subtitle {
    font-size: 20px;
  }
}
</style>
