<template>
  <div class="filter">
    <label>
      分類：
      <select v-model="localCategory">
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </label>

    <label>
      價格上限：
      <input type="number" v-model.number="localMaxPrice" />
    </label>

    <button @click="reset">🔁 重設</button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  category: String,
  maxPrice: Number,
  categories: Array,
})

const emit = defineEmits(['update:category', 'update:maxPrice', 'reset'])

const localCategory = ref(props.category)
const localMaxPrice = ref(props.maxPrice)

// 當 local 改變時，通知父層更新 v-model
watch(localCategory, (val) => emit('update:category', val))
watch(localMaxPrice, (val) => emit('update:maxPrice', val))

// 當父層 props 改變時，更新 local 狀態（確保同步）
watch(
  () => props.category,
  (val) => (localCategory.value = val),
)
watch(
  () => props.maxPrice,
  (val) => (localMaxPrice.value = val),
)

function reset() {
  // 通知父層執行重設
  emit('reset')
}
</script>

<style scoped>
.filter {
  width: 600px;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 16px;
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  align-items: center;
}
</style>
