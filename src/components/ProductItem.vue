<template>
  <div class="product-item">
    <span>{{ product.name }} - ${{ product.price }}</span>
    <div class="actions">
      <button @click="editProduct">編輯</button>
      <button @click="removeProduct">刪除</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: Object,
})
const emit = defineEmits(['delete', 'edit'])

const editProduct = () => {
  emit('edit', props.product)
}

const removeProduct = () => {
  emit('delete', props.product.id)
}
</script>

<style scoped>
.product-item {
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.actions button {
  margin-left: 8px;
}
</style>
