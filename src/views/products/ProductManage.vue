<template>
  <div class="container mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">商品管理</h2>
      <div class="flex items-center">
        <el-button @click="goTo('AddProduct')" type="primary"> + 新增商品 </el-button>

        <el-select v-model="selectedCategory" placeholder="選擇分類" clearable class="mr-4 w-40">
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

    <div class="product-table-container">
      <el-table v-loading="isLoading" :data="filteredProducts" style="width: 100%" stripe border>
        <el-table-column label="圖片" width="100" align="center">
          <template #default="{ row }">
            <el-image
              :src="row.imageBase64"
              fit="cover"
              style="width: 60px; height: 60px"
              class="rounded"
              lazy
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                </div>
              </template>
            </el-image>
          </template>
        </el-table-column>

        <el-table-column prop="name" label="商品名稱" sortable show-overflow-tooltip />

        <el-table-column prop="category" label="分類" width="120" />

        <el-table-column prop="price" label="售價" width="100" sortable>
          <template #default="{ row }"> ${{ row.price }} </template>
        </el-table-column>

        <el-table-column prop="stock" label="庫存" width="100" sortable>
          <template #default="{ row }">
            <div class="flex flex-col items-center">
              <span class="text-base">{{ row.stock }}</span>

              <p v-if="row.stock <= 5" class="text-xs text-red-500 mt-1">庫存緊張</p>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button size="small" type="primary" @click="editProduct(row.id)"> 編輯 </el-button>
            <el-button size="small" type="danger" @click="deleteProduct(row.id)"> 刪除 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { useNavigation } from '@/composables/useNavigation'
import api from '@/service/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { computed, onMounted, ref } from 'vue'

const { goTo } = useNavigation()

const products = ref([])
const categories = ref([])
const selectedCategory = ref('')
const isLoading = ref(true)

const filteredProducts = computed(() => {
  const filtered = selectedCategory.value
    ? products.value.filter((p) => p.category === selectedCategory.value)
    : products.value
  return filtered
})

// 編輯商品
const editProduct = (productId) => {
  goTo('EditProduct', { id: productId })
}

// 刪除商品 (新增功能)
const deleteProduct = async (productId) => {
  try {
    await ElMessageBox.confirm('確定要刪除這項商品嗎？此操作無法復原。', '警告', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    // 執行 API 刪除
    const res = await api.deleteProduct(productId)
    if (res.code === '0000') {
      ElMessage.success('商品刪除成功！')
      // 從本地列表移除商品
      products.value = products.value.filter((p) => p.id !== productId)
    }
  } catch (err) {
    if (err !== 'cancel') {
      console.error('刪除商品失敗:', err)
      ElMessage.error('刪除商品失敗，請稍後再試。')
    }
  }
}

onMounted(async () => {
  try {
    const res = await api.getManageProducts()
    if (res.code === '0000') {
      products.value = res.result
      categories.value = [...new Set(products.value.map((p) => p.category))]
    }
  } catch (err) {
    console.error('載入商品失敗:', err)
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* 使用深層選擇器調整樣式 */
::v-deep(.el-input-number.el-input-number--small) {
  /* 調整整體寬度 */
  width: 90px;
}

::v-deep(.el-input-number.el-input-number--small .el-input__inner) {
  /* 調整輸入框高度和字體大小 */
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

::v-deep(.el-input-number.el-input-number--small .el-input-number__decrease),
::v-deep(.el-input-number.el-input-number--small .el-input-number__increase) {
  /* 調整按鈕高度 */
  height: 24px;
  width: 24px;
}
</style>
