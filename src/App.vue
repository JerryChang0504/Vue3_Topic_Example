<script setup>
import CategorySidebar from './navigation/CategorySidebar.vue'
import TopBar from './navigation/TopBar.vue'
import Breadcrumb from './navigation/Breadcrumb.vue'
import { Monitor, Cpu, Coffee, Suitcase, Flag } from '@element-plus/icons-vue'
import api from './service/api'

import { onMounted } from 'vue'

const getusers = async () => {
  const res = await api.user()
  console.log('🚀 ~ res:', res?.result)
  return res
}

onMounted(() => {
  getusers()
})

const categories = [
  {
    name: 'products',
    label: '商品相關',
    icon: Monitor,
    clickable: false,
    subs: [
      { name: '', label: '商品介紹', icon: Cpu },
      { name: 'add', label: '商品新增', icon: Cpu },
    ],
  },
  {
    name: 'life',
    label: '生活類',
    icon: Coffee,
    clickable: false,
    subs: [
      { name: 'food', label: '美食', icon: Coffee },
      {
        name: 'travel',
        label: '旅遊',
        icon: Suitcase,
        clickable: false,
        subs: [
          { name: 'usa', label: '美國', icon: Flag },
          { name: 'canada', label: '加拿大', icon: Flag },
        ],
      },
    ],
  },
]
</script>

<template>
  <header>
    <TopBar bannerOn />
  </header>

  <main>
    <div class="layout">
      <CategorySidebar :categories="categories" />

      <div class="content">
        <Breadcrumb :categories="categories" />
        <router-view />
      </div>
    </div>
  </main>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa; /* 整體背景 */
}

/* 側邊欄 */
.el-menu-vertical-demo {
  width: 240px;
  min-height: 100vh;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

/* 主內容區 */
.content {
  flex: 1;
  padding: 32px;
  background-color: #f5f7fa;
  overflow: auto;
}

/* 響應式：小於 768px 隱藏側邊欄 */
@media (max-width: 768px) {
  .el-menu-vertical-demo {
    display: none;
  }

  .content {
    padding: 16px;
  }
}
</style>
