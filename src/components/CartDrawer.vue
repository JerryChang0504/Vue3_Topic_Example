<template>
  <el-drawer
    :model-value="drawerVisible"
    @update:model-value="emit('update:drawerVisible', $event)"
    title="🛒 購物車內容"
    :size="'40%'"
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
    </template>
  </el-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useCartStore } from '@/store/carStore'
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)
console.log('🚀 ~ carStore:', cartStore)

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
</script>
