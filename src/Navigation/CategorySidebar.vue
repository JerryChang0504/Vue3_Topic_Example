<template>
  <div class="sidebar-wrapper">
    <el-menu
      class="sidebar-menu"
      :default-active="active"
      router
      :collapse="isCollapsed"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <MenuItem
        v-for="item in categoriesWithPaths"
        :key="item.path"
        :item="item"
        :basePath="basePath"
      />
    </el-menu>

    <!-- 右下小按鈕 -->
    <div class="collapse-btn" @click="toggleCollapse">
      <el-icon>
        <component :is="isCollapsed ? DArrowRight : DArrowLeft" />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router'
import { DArrowLeft, DArrowRight } from '@element-plus/icons-vue' // ⬅️ 必要的 Icon

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
  basePath: {
    type: String,
    default: '/category',
  },
  defaultOpenAll: {
    type: Boolean,
    default: true,
  },
})

const buildMenuTree = (items, parentPath = '') => {
  return items.map((item) => {
    const path = parentPath ? `${parentPath}/${item.name}` : item.name
    const newItem = {
      ...item,
      path,
    }
    if (item.subs) {
      newItem.subs = buildMenuTree(item.subs, path)
    }
    return newItem
  })
}

const categoriesWithPaths = computed(() => buildMenuTree(props.categories))

const route = useRoute()
const active = computed(() => {
  if (route.path.startsWith(props.basePath)) {
    return route.path.slice(props.basePath.length + 1) // 去掉 basePath + '/'
  }
  return ''
})

const collectOpenKeys = (items) => {
  let keys = []
  items.forEach((item) => {
    if (item.subs) {
      keys.push(item.path)
      keys = keys.concat(collectOpenKeys(item.subs))
    }
  })
  return keys
}

const isCollapsed = ref(false)
const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

// const openKeys = computed(() =>
//   props.defaultOpenAll ? collectOpenKeys(categoriesWithPaths.value) : [],
// )
// console.log('🚀 ~ active ~ active:', active.value)
</script>
<style scoped>
.sidebar-wrapper {
  position: relative;
  width: 240px;
  min-height: 100vh;
  background-color: #f9f9f9;
  border-right: 1px solid #ddd;
  transition: width 0.3s;
}

.sidebar-menu {
  height: 100%;
  border-right: none;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.sidebar-menu .el-menu-item,
.sidebar-menu .el-sub-menu__title {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: #333;
  font-weight: 500;
}

.sidebar-menu .el-menu-item:hover,
.sidebar-menu .el-sub-menu__title:hover {
  background-color: #e6f7ff;
  color: #409eff;
}

.sidebar-menu .el-menu-item.is-active {
  background-color: #409eff;
  color: white;
}

.sidebar-menu .el-sub-menu.is-open > .el-sub-menu__title {
  background-color: #e6f7ff;
  color: #409eff;
}

.collapse-btn {
  position: absolute;
  bottom: 20px;
  right: 12px;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.collapse-btn:hover {
  background-color: #f2f2f2;
  transform: scale(1.1);
}
</style>
