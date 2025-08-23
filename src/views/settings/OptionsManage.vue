<template>
  <div class="container">
    <div class="header">
      <h2 class="title">選項管理</h2>
      <div class="header-actions">
        <el-button @click="goTo('AddOption')" type="primary"> + 新增項目 </el-button>

        <el-select
          v-model="selectedCategory"
          placeholder="選擇分類"
          clearable
          class="select-category"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
      </div>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="listName" label="分類名稱" width="180" />
      <el-table-column prop="key" label="選項名稱" />
      <el-table-column prop="value" label="選項值" />
      <el-table-column prop="sortOrder" label="排序" />
      <el-table-column prop="isActive" label="啟用狀態">
        <template #default="{ row }">
          <el-icon v-if="row.isActive" style="color: var(--el-color-success)"><Open /></el-icon>
          <el-icon v-else style="color: var(--el-color-danger)"><Close /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
    </el-table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed  } from 'vue'
import api from '@/service/api'
import { ElMessage } from 'element-plus'
import { Open, Close } from '@element-plus/icons-vue'
import { useNavigation } from '@/composables/useNavigation'
const { goTo } = useNavigation()

const tableData = ref([])
const categories = ref([])
const selectedCategory = ref('')

const filteredProducts = computed(() => {
  return selectedCategory.value
    ? tableData.value.filter((p) => p.listName === selectedCategory.value)
    : tableData.value
})

onMounted(async () => {
  try {
    const res = await api.getOptions()
    console.log('🚀 ~ res:', res)
    if (res.code === '0000') {
      tableData.value = res.result
      categories.value = [...new Set(tableData.value.map((p) => p.listName))]
    }
  } catch (err) {
    ElMessage.error('載入商品失敗')
  } 
  
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.header-actions {
  display: flex;
  align-items: center;
}

.select-category {
  margin-left: 16px;
  width: 160px;
}
</style>