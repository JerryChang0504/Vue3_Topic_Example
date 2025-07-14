<template>
  <li>
    {{ text }}
    <button @click="remove">刪除</button>
  </li>
</template>

<script setup>
const props = defineProps(['text', 'index']) // 接收傳入的資料
const emit = defineEmits(['remove']) // 宣告 emit 事件

function remove() {
  emit('remove', props.index) // 把要刪除的 index 傳給父組件
}
</script>
<style scoped></style>
