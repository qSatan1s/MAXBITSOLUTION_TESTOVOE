<script setup lang="ts">
import type { CocktailCode } from '@/types'
import { useQuery } from '@pinia/colada'

import { useRoute } from 'vue-router'
import { fetchCocktailsApi } from '@/api/cocktails.ts'
import CocktailCard from '@/components/CocktailCard.vue'
import LoadingSpinner from '@/components/ui/LoadingSpinner.vue'

const route = useRoute()

const {
  data: cocktails,
  isLoading: loading,
} = useQuery({
  key: () => ['cocktails', route.params.cocktail as CocktailCode],
  query: () => fetchCocktailsApi(route.params.cocktail as CocktailCode),
  staleTime: 1000 * 60 * 10,
  gcTime: 1000 * 60 * 30,
})
</script>

<template>
  <div class="cocktail-page">
    <LoadingSpinner v-if="loading" />

    <div v-else class="cocktails-grid">
      <CocktailCard
        v-for="cocktail in cocktails || []"
        :key="cocktail.idDrink"
        :cocktail="cocktail"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cocktail-page {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.cocktails-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

@media (max-width: 768px) {
  .cocktails-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .cocktails-grid {
    padding: 10px;
    gap: 12px;
  }
}
</style>
