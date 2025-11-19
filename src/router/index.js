import CategoryPage from '@/Navigation/sub/CategoryPage.vue'
import Storage, { USER_ROLE_KEY } from '@/utils/storageUtil'
import About from '@/views/About.vue'
import UserPost from '@/views/UserPost.vue'

import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/users/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/users/Register.vue') },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/users/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/views/products/ProductList.vue'),
  },
  {
    path: '/products/add',
    name: 'AddProduct',
    component: () => import('@/views/products/AddProduct.vue'),
  },

  {
    path: '/products/edit/:id',
    name: 'EditProduct',
    component: () => import('@/views/products/EditProduct.vue'),
  },
  {
    path: '/settings/options',
    name: 'SettingsOptions',
    component: () => import('@/views/settings/OptionsManage.vue'),
    meta: { requiresAuth: true, role: ['ADMIN'] },
  },
  {
    path: '/settings/setting',
    name: 'ProductSetting',
    component: () => import('@/views/products/ProductManage.vue'),
    meta: { requiresAuth: true, role: ['ADMIN'] },
  },
  { path: '/about', name: 'About', component: About },
  { path: '/users/:username/posts/:postId', component: UserPost },
  {
    path: '/accessDenied',
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
  const isLoggedIn = !!localStorage.getItem('token')
  const role = Storage.get(USER_ROLE_KEY)
  console.log('🚀 ~ role:', role)
  console.log('🚀 ~ to.meta:', to.meta)
  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }
  if (to.meta.requiresAuth && !to.meta.role.includes(role)) {
    return next('/accessDenied')
  }
  next()
})
export default router
