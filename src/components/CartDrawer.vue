<template>
  <el-drawer
    :model-value="drawerVisible"
    @update:model-value="emit('update:drawerVisible', $event)"
    title="🛒 購物車內容"
    :size="'35%'"
    @close="handleClose"
  >
    <div v-if="cart.length" class="flex-grow overflow-y-auto">
      <el-table :data="cart" style="width: 100%">
        <el-table-column label="商品" width="80">
          <template #default="scope">
            <el-image
              :src="scope.row.imageBase64"
              style="width: 50px; height: 50px; border-radius: 4px"
              fit="cover"
            />
          </template>
        </el-table-column>
        <el-table-column label="名稱" min-width="80" max-width="150">
          <template #default="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="價格" width="80">
          <template #default="scope">
            <span class="font-semibold">${{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="數量" width="100">
          <template #default="scope">
            <el-input-number v-model="scope.row.quantity" :min="1" size="small" />
          </template>
        </el-table-column>
        <el-table-column label="小計" width="80">
          <template #default="scope">
            <span class="font-semibold">${{ scope.row.price * scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template #default="scope">
            <el-button
              type="danger"
              :icon="Delete"
              circle
              plain
              size="small"
              @click="$emit('removeItem', scope.row.id)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-empty v-else description="購物車目前是空的" />

    <template #footer>
      <div class="p-4 border-t">
        <div class="flex justify-between items-center mb-4">
          <p class="text-xl font-bold">總計:</p>
          <p class="text-2xl font-bold text-red-600">${{ cartStore.totalPrice }}</p>
        </div>
        <el-button type="success" class="w-full mt-4">前往結帳</el-button>
      </div>
      <el-button
        type="primary"
        class="w-full"
        size="large"
        :disabled="!cart.length"
        @click="handleCheckout"
      >
        <el-icon class="mr-2"><ShoppingCart /></el-icon>
        前往結帳 ({{ cartStore.totalQuantity }} 件商品)
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useCartStore } from '@/store/carStore'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNavigation } from '@/composables/useNavigation'
const { goTo } = useNavigation()
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

// 定義 Props，從父元件接收 cart 陣列
const props = defineProps({
  drawerVisible: { type: Boolean, required: true },
})

// 定義 Emits，向父元件發送事件
const emit = defineEmits(['update:drawerVisible', 'removeItem'])

// 關閉抽屜時發送事件
const handleClose = () => {
  emit('update:drawerVisible', false)
}

const createCheckoutConfirmContent = () => {
  const itemsHtml = cart.value
    .map(
      (item) =>
        `<div style="display: flex; justify-content: space-between; margin: 5px 0;">
      <span>${item.name} × ${item.quantity}</span>
      <span style="font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</span>
    </div>`,
    )
    .join('')

  return `
    <div style="max-height: 200px; overflow-y: auto;">
      <p style="margin-bottom: 10px; font-weight: bold;">購買商品清單：</p>
      ${itemsHtml}
      <hr style="margin: 15px 0;">
      <div style="display: flex; justify-content: space-between; font-size: 18px; font-weight: bold; color: #e74c3c;">
        <span>總計：</span>
        <span>$${cartStore.totalPrice.toFixed(2)}</span>
      </div>
      <p style="margin-top: 10px; color: #666; font-size: 12px;">
        * 點擊「確認結帳」將前往結帳頁面完成訂單
      </p>
    </div>
  `
}

// 處理結帳
const handleCheckout = async () => {
  if (!cart.value.length) {
    ElMessage.warning('購物車是空的，請先添加商品')
    return
  }

  try {
    // 顯示確認對話框
    await ElMessageBox.confirm(createCheckoutConfirmContent(), '確認結帳', {
      confirmButtonText: '確認結帳',
      cancelButtonText: '取消',
      type: 'info',
      customClass: 'checkout-confirm-dialog',
      dangerouslyUseHTMLString: true,
    })

    // 用戶確認後，關閉抽屜並跳轉到結帳頁面
    handleClose()

    // 模擬一點延遲，讓抽屜關閉動畫完成
    setTimeout(() => {
      goTo('Checkout')
      ElMessage.success('正在前往結帳頁面...')
    }, 300)
  } catch {
    // 用戶取消結帳
    ElMessage.info('已取消結帳')
  }
}
</script>
