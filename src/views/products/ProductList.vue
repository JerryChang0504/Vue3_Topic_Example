<template>
  <div class="container mx-auto px-4 py-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">商品列表</h2>
      <div class="flex items-center">
        <el-select v-model="selectedCategory" placeholder="選擇分類" clearable class="mr-4">
          <el-option label="全部" value="" />
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
        <el-button @click="drawerVisible = true" type="primary" plain>
          🛒 購物車 ({{ cartStore.totalQuantity }})
        </el-button>
      </div>
    </div>

    <el-row v-if="isLoading" :gutter="20">
      <el-col v-for="i in 8" :key="i" :span="6" class="mb-6">
        <el-skeleton animated :rows="5" />
      </el-col>
    </el-row>

    <el-row v-else :gutter="20">
      <el-col
        v-for="product in visibleProducts"
        :key="product.id"
        :span="6"
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        class="mb-6"
      >
        <el-card shadow="hover" body-style="padding: 0;">
          <div
            class="relative w-full h-40 overflow-hidden cursor-pointer"
            @click="showProductDetail(product)"
          >
            <el-tooltip :content="product.description" placement="top">
              <img
                :src="product.imageBase64"
                loading="lazy"
                alt="product image"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
            </el-tooltip>
          </div>
          <div class="p-4">
            <h3 class="text-lg font-bold truncate">{{ product.name }}</h3>
            <p class="text-sm text-gray-500 mb-1">{{ product.category }}</p>
            <el-rate v-model="product.rating" disabled show-score :max="5" class="mb-2" />
            <p class="text-red-600 text-xl font-semibold mb-2">$ {{ product.price }}</p>
            <el-button type="primary" size="small" class="w-full" @click="addToCart(product)">
              加入購物車
            </el-button>
            <el-button
              type="primary"
              size="small"
              class="w-full mt-2"
              @click="editProduct(product.id)"
            >
              編輯商品
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="visibleCount < filteredProducts.length" class="text-center mt-4">
      <el-button @click="loadMore" type="primary" plain>載入更多</el-button>
    </div>

    <el-dialog v-model="dialogVisible" :title="currentProduct.name" width="1000px">
      <div v-if="currentProduct" class="flex flex-col items-center">
        <img
          :src="currentProduct.imageBase64"
          alt="product image"
          class="w-full mb-4 rounded max-w-md"
        />
        <div class="p-2 text-center">
          <p class="text-xl font-bold mb-2">$ {{ currentProduct.price }}</p>
          <p class="text-gray-700 mb-4">{{ currentProduct.description }}</p>
          <el-rate
            v-model="currentProduct.rating"
            disabled
            show-score
            :max="5"
            class="mb-2 justify-center"
          />
        </div>
      </div>
    </el-dialog>

    <CartDrawer v-model:drawerVisible="drawerVisible" @removeItem="removeItem" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '@/service/api'
import { useNavigation } from '@/composables/useNavigation'
import { ElMessage } from 'element-plus'
import CartDrawer from '@/components/CartDrawer.vue'
import { useCartStore } from '@/store/carStore'

const { goTo } = useNavigation()
const cartStore = useCartStore()

const products = ref([])
const categories = ref([])
const selectedCategory = ref('')
const isLoading = ref(true)
const loadMoreCount = 4 // 每次載入 4 筆
const visibleCount = ref(loadMoreCount) // 初始顯示 12 筆
const dialogVisible = ref(false)
const drawerVisible = ref(false) // 新增控制抽屜的變數
const currentProduct = ref({})

const handleImageError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x200?text=無法載入'
}

const loadMore = () => {
  visibleCount.value += loadMoreCount
}

// 分類
const filteredProducts = computed(() => {
  const filtered = selectedCategory.value
    ? products.value.filter((p) => p.category === selectedCategory.value)
    : products.value
  return filtered
})

const visibleProducts = computed(() => filteredProducts.value.slice(0, visibleCount.value))

const showProductDetail = (product) => {
  currentProduct.value = product
  dialogVisible.value = true
}

// 加入購物車函式 (已修改)
const addToCart = (product) => {
  const existingItem = cartStore.cart.find((item) => item.id === product.id)

  if (existingItem) {
    existingItem.quantity += 1
    ElMessage.success(`${product.name} 數量已更新為 ${existingItem.quantity}`)
  } else {
    cartStore.addProduct(product)
    ElMessage.success(`${product.name} 已加入購物車`)
  }

  drawerVisible.value = true
}

// 移除購物車商品函式 (新功能)
const removeItem = (productId) => {
  cartStore.removeProduct(productId)
  ElMessage.success('商品已從購物車移除')
}

// 編輯商品
const editProduct = (productId) => {
  goTo('EditProduct', { id: productId })
}

onMounted(async () => {
  try {
    // 取得產品列表
    const res = await api.getProducts()
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
