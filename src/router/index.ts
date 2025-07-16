import type { RouteRecordRaw } from 'vue-router'
import type { CocktailCode } from '@/types'

import { createRouter, createWebHistory } from 'vue-router'
import { COCKTAIL_CODES, ROUTE_NAMES } from '@/types'
import { isValidCocktailCode } from '@/utils/cocktails'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: () => `/${COCKTAIL_CODES[0]}`,
  },
  {
    path: '/:cocktail',
    name: ROUTE_NAMES.COCKTAIL,
    component: () => import('@/pages/CocktailPage.vue'),
    beforeEnter: (to) => {
      const cocktail = to.params.cocktail as string

      if (!isValidCocktailCode(cocktail)) {
        return { name: ROUTE_NAMES.NOT_FOUND }
      }

      to.params.cocktail = cocktail as CocktailCode
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.NOT_FOUND,
    component: () => import('@/pages/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
