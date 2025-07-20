<script setup>
import ComputedAndMethod from './components/ComputedAndMethod.vue'
import HelloWorld from './components/HelloWorld.vue'
import ReactivityFuns from './components/ReactivityFuns.vue'
import TheWelcome from './components/TheWelcome.vue'
import VbindStyle from './components/VbindStyle.vue'
// import VueOllama from './components/VueOllama.vue'
import Hello from './components/Hello.vue'
import MessageBoard from './components/MessageBoard.vue'
import TabComponent from './components/TabComponent.vue'
import RegisterRunDown from './components/RegisterRunDown.vue'
import { ref } from 'vue'
import ParentComponent from './components/ParentComponent.vue'
import ProductPage from './components/ProductPage.vue'
import BaseLayout from './components/BaseLayout.vue'
import ModalProvider from './components/ModalProvider.vue'
import DeleteButton from './components/DeleteButton.vue'
import ProvideInjectRef from './components/ProvideInjectRef.vue'
import useFormat from '@/composables/useFormat'
import WatchDeepAndMutiValues from './components/WatchDeepAndMutiValues.vue'
import CategorySidebar from './navigation/CategorySidebar.vue'
import TopBar from './navigation/TopBar.vue'
import Breadcrumb from './navigation/Breadcrumb.vue'
import { Monitor, Cpu, Coffee, Suitcase, Flag } from '@element-plus/icons-vue'
document.title = import.meta.env.VITE_APP_TITLE

const categories = [
  {
    name: 'tech',
    label: '技術類',
    icon: Monitor,
    clickable: false,
    subs: [
      { name: 'frontend', label: '前端', icon: Cpu },
      { name: 'backend', label: '後端', icon: Cpu },
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

// const { appContext } = getCurrentInstance()
// const $formatDate = appContext.config.globalProperties.$formatDate
// console.log('🚀 ~ $s(new Date()):', $formatPrice(10000))
</script>

<template>
  <header>
    <TopBar bannerOn />
  </header>

  <main>
    <!-- <h1>我的網站</h1>
    <nav>
      <router-link to="/">首頁</router-link> | <router-link to="/about">關於</router-link>|
      <router-link to="/users/eduardo/posts/1">router</router-link>|
      <router-link to="/users/eduardo/posts/20">/users/eduardo/posts/20</router-link>
    </nav> -->
    <div class="layout">
      <CategorySidebar :categories="categories" />

      <div class="content">
        <Breadcrumb :categories="categories" />
        <router-view />
      </div>
    </div>
    <!-- {{ $formatPrice(1000) }} -->
    <!--1,000.00 -->
    <!-- {{ $formatDate(new Date()) }} -->
    <!-- 2023-01-01 -->
    <!-- <ProvideInjectRef /> -->
    <!-- <ModalProvider>
      <DeleteButton />
    </ModalProvider> -->
    <!-- <BaseLayout :active="selected"> -->
    <!-- ✅ 接收子元件傳來的 user 變數 -->
    <!-- <template #default="{ user }">
        <strong>{{ user.name }}</strong
        >（{{ user.email }})
      </template> -->
    <!-- </BaseLayout> -->
    <!-- <ProductPage /> -->
    <!-- <ParentComponent /> -->
    <!-- <button @click="show = true">刪除</button> -->
    <!-- <AlertBox
      v-model:visible="show"
      title="刪除確認"
      message="確定要刪除這筆資料嗎？"
      :buttons="[
        { text: '取消', color: 'secondary', onClick: () => console.log('取消') },
        { text: '確認刪除', color: 'danger', onClick: () => console.log('刪除') },
      ]"
      size="small"
      :autoClose="false"
    /> -->
    <!-- <RegisterRunDown /> -->
    <!-- <TabComponent /> -->
    <!-- <MessageBoard /> -->
    <!-- <VbindStyle /> -->
    <!-- <ReactivityFuns /> -->
    <!-- <ComputedAndMethod /> -->
    <!-- <TheWelcome /> -->
    <!-- <WatchDeepAndMutiValues /> -->
  </main>
</template>

<style scoped>
/* header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
} */
</style>
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
