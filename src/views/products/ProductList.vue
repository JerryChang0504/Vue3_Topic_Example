<template>
  <div class="product-list-container">
    <div class="product-list-header">
      <h2 class="header-title">商品列表</h2>
      <div class="header-controls">
        <el-select
          v-model="selectedCategory"
          placeholder="選擇分類"
          clearable
          class="category-select"
        >
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
      <el-col v-for="i in 4" :key="i" :span="6" class="product-col">
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
        class="product-col"
      >
        <el-card shadow="hover" body-style="padding: 0;">
          <div class="card-image-wrapper" @click="showProductDetail(product)">
            <el-tooltip :content="product.description" placement="top">
              <img
                :src="product.imageBase64"
                loading="lazy"
                alt="product image"
                class="card-image"
                @error="handleImageError"
              />
            </el-tooltip>
          </div>

          <div class="card-body">
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-category">{{ product.category }}</p>
            <el-rate v-model="product.rating" disabled show-score :max="5" class="product-rating" />
            <p class="product-price">$ {{ product.price }}</p>

            <el-button
              type="primary"
              size="small"
              class="add-to-cart-button"
              @click="addToCart(product)"
            >
              加入購物車
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <div v-if="visibleCount < filteredProducts.length" class="load-more-container">
      <el-button @click="loadMore" type="primary" plain>載入更多</el-button>
    </div>

    <el-dialog v-model="dialogVisible" :title="currentProduct.name" width="1000px">
      <div v-if="currentProduct" class="product-detail-dialog">
        <img :src="currentProduct.imageBase64" alt="product image" class="product-detail-image" />
        <div class="product-detail-content">
          <p class="detail-price">$ {{ currentProduct.price }}</p>
          <p class="detail-description">{{ currentProduct.description }}</p>
          <el-rate
            v-model="currentProduct.rating"
            disabled
            show-score
            :max="5"
            class="detail-rating"
          />
        </div>
      </div>
    </el-dialog>

    <CartDrawer v-model:drawerVisible="drawerVisible" @removeItem="removeItem" />
  </div>

  <el-button type="primary" size="small" class="add-to-cart-button" @click="AddOption">
    新增選項
  </el-button>
</template>

<script setup>
import CartDrawer from '@/components/CartDrawer.vue'
import { useNavigation } from '@/composables/useNavigation'
import api from '@/service/api'
import { useCartStore } from '@/store/carStore'
import { ElMessage } from 'element-plus'
import { computed, onMounted, ref } from 'vue'

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

const AddOption = () => {
  api.optionsAdd({
    // listName: 'ProductClass',
    // name: '電子產品',
    value: '001',
    sortOrder: 1,
    isActive: true,
    description: '電子產品類別',
  })
}
</script>

<style scoped>
/* Container & Layout */
.product-list-container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px 16px;
}

.product-col {
  margin-bottom: 24px;
}

/* Header */
.product-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-title {
  font-size: 24px;
  font-weight: bold;
}

.header-controls {
  display: flex;
  align-items: center;
}

.category-select {
  width: 160px;
  margin-right: 16px;
}

/* Product Card */
.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  cursor: pointer;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-body {
  padding: 16px;
}

.product-name {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.product-category {
  font-size: 14px;
  color: #6b7280;
  margin-bottom: 4px;
}

.product-rating {
  margin-bottom: 8px;
}

.product-price {
  color: #dc2626;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
}

.add-to-cart-button {
  width: 100%;
}

/* Load More Button */
.load-more-container {
  text-align: center;
  margin-top: 16px;
}

/* Product Detail Dialog */
.product-detail-dialog {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-detail-image {
  width: 100%;
  margin-bottom: 16px;
  border-radius: 4px;
  max-width: 448px;
}

.product-detail-content {
  padding: 8px;
  text-align: center;
}

.detail-price {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.detail-description {
  color: #4b5563;
  margin-bottom: 16px;
}

.detail-rating {
  margin-bottom: 8px;
  justify-content: center;
}
</style>
