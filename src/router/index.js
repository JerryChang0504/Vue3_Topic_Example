import { createWebHistory, createRouter } from 'vue-router'
import About from '@/views/About.vue'
import UserPost from '@/views/UserPost.vue'
import CategoryPage from '@/navigation/sub/CategoryPage.vue'
const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue') },
  { path: '/register', name: 'Register', component: () => import('@/views/Register.vue') },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  { path: '/about', name: 'About', component: About },
  { path: '/users/:username/posts/:postId', component: UserPost },
  {
    path: '/category/:paths(.*)*',
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

  if (to.meta.requiresAuth && !isLoggedIn) {
    return next('/login')
  }

  next()
})
export default router
