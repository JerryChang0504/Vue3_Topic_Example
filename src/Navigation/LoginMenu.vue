<template>
  <div>
    <el-button v-if="!isLogin" type="primary" @click="goLogin">登入</el-button>

    <el-dropdown v-else>
      <span class="el-dropdown-link">
        👤 {{ user.name }}
        <el-icon><More /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="goProfile">個人資料維護</el-dropdown-item>
          <el-dropdown-item divided @click="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown, More } from '@element-plus/icons-vue'

import { useUserStore } from '@/store/UserStore'

const router = useRouter()
const userStore = useUserStore()

const isLogin = computed(() => !!userStore.user?.isLogin)
const user = computed(() => userStore.user || {})

const goLogin = () => {
  router.push('/login')
}

const goProfile = () => {
  router.push('/profile')
}

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>
