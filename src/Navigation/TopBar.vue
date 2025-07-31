<!-- src/components/TopBar.vue -->
<template>
  <header class="top-bar">
    <div class="logo">🛒 我的商城</div>
    <TopBarAdBanner :show="bannerOn" :width="'400px'" :interval="2000" />
    <div class="auth">
      <LoginMenu />
      <!-- <el-button type="primary" @click="goLogin">登入</el-button> -->
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import TopBarAdBanner from '@/views/TopBarAdBanner.vue'
import LoginMenu from './LoginMenu.vue'
defineProps({ bannerOn: { type: Boolean, default: false } })

const router = useRouter()

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #409eff;
  color: #fff;
  padding: 0 20px;
  height: 56px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.auth {
  display: flex;
  align-items: center;
}
</style>
