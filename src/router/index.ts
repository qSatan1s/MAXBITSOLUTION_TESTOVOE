import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('@/pages/Home.vue'), name: 'Home' },
  { path: '/about', component: () => import('@/pages/About.vue'), name: 'About' },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/pages/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
