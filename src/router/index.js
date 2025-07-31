import { createWebHistory, createRouter } from 'vue-router'
import About from '@/views/About.vue'
import UserPost from '@/views/UserPost.vue'
import CategoryPage from '@/navigation/sub/CategoryPage.vue'
const routes = [
  { path: '/', component: () => import('@/views/Home.vue') },
  { path: '/login', component: () => import('@/views/Login.vue') },
  { path: '/register', component: () => import('@/views/Register.vue') },
  { path: '/profile', component: () => import('@/views/Profile.vue') },
  { path: '/about', component: About },
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

export default router
