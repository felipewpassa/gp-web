import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        auth: false
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/produtos',
      name: 'produtos',
      component: () => import('../views/ProdutosView.vue'),
      meta: {
        auth: true
      }
    },
  ]
})

router.beforeEach(async(to, from, next) => {
  if (to.meta?.auth) {
    const auth = useAuth()
    if (auth.token) {
      const isAutheticated = await auth.checkToken()
      if (isAutheticated) {
        next()
      } else {
        next({ name: 'login'});
      }
    } else {
      next({ name: 'login'});
    }
  } else {
    next()
  }
})

export default router
