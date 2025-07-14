<template>
  <div>
    <h2>步驟 1：輸入姓名</h2>
    <input v-model="form.name" placeholder="輸入姓名" />
  </div>
</template>

<script setup>
const props = defineProps(['form'])
</script>
