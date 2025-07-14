<template>
  <el-menu class="sidebar" :default-active="activeMenu" :router="true" unique-opened>
    <el-sub-menu
      v-for="(mainCategory, index) in categories"
      :key="index"
      :index="mainCategory.name"
    >
      <template #title>
        <span>{{ mainCategory.label }}</span>
      </template>
      <el-menu-item
        v-for="sub in mainCategory.subs"
        :key="sub.name"
        :index="`/category/${mainCategory.name}/${sub.name}`"
      >
        {{ sub.label }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const route = useRoute()

// 根據當前路由設定 active menu
const activeMenu = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  width: 240px;
  min-height: calc(100vh - 56px); /* 扣除 top-bar 高度 */
  background-color: #fff;
  border-right: 1px solid #e0e0e0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

/* 響應式隱藏側邊欄 */
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
