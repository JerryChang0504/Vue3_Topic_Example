import CategoryPage from '@/navigation/sub/CategoryPage.vue'
import { useUserStore } from '@/store/userStore'
import Storage, { CART_KEY, TOKEN_KEY } from '@/utils/storageUtil'
import { ElMessage } from 'element-plus'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/users/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/users/Register.vue') },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/users/Profile.vue'),
    meta: { requiresAuth: true, role: ['USER', 'ADMIN'] },
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/products/ProductList.vue'),
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import('@/views/products/AddProduct.vue'),
  },
  {
    path: '/products/list',
    name: 'ProductList',
    component: () => import('@/views/products/ProductManage.vue'),
  },
  {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/products/EditProduct.vue'),
  },
  {
    path: '/settings/options',
    name: 'OptionsManage',
    component: () => import('@/views/settings/OptionsManage.vue'),
    meta: { requiresAuth: true, role: ['ADMIN'] },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/checkout/checkout.vue'),
    beforeEnter: (to, from, next) => {
      const isLoggedIn = !!Storage.get(TOKEN_KEY)
      const cart = Storage.get(CART_KEY)
      if (!isLoggedIn) {
        ElMessage.error('請先登入')
        return next('/login')
      }
      if (!cart || !cart.length > 0) {
        return next('/login')
      }
      next()
    },
  },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  {
    path: '/access-denied',
    name: 'AccessDenied',
    component: () => import('@/views/users/AccessDenied.vue'),
  },
  {
    path: '/:paths(.*)*',
    name: 'Category',
    component: CategoryPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// ✅ 加入全域導航守衛：權限驗證
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isLoggedIn = userStore.isLoggedIn
  const userRole = userStore.userRole

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  if (to.meta.requiresAuth && to.meta.role) {
    if (to.meta.role.includes(userRole)) {
      return next()
    } else {
      return next({ name: 'AccessDenied' })
    }
  }

  next()
})
export default router
