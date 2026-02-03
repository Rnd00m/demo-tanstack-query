import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'use-query',
      component: () => import('../views/UseQueryView.vue'),
    },
    {
      path: '/use-mutation',
      name: 'use-mutation',
      component: () => import('../views/UseMutationView.vue'),
    },
    {
      path: '/optimistic-update',
      name: 'optimistic-update',
      component: () => import('../views/OptimisticUpdateView.vue'),
    },
    {
      path: '/pagination',
      name: 'pagination',
      component: () => import('../views/PaginationView.vue'),
    },
    {
      path: '/infinite-scroll',
      name: 'infinite-scroll',
      component: () => import('../views/InfiniteScrollView.vue'),
    },
  ],
})

export default router
