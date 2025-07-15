<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
function goHome() {
  router.replace('/')
}
</script>

<template>
  <div class="not-found">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <button @click="goHome">
      На главную
    </button>
  </div>
</template>
