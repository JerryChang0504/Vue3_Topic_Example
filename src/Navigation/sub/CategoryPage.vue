<template>
  <div>
    <h2>主分類：{{ main }}</h2>
    <h3>子分類：{{ sub }}</h3>
    <p>這裡可以載入 {{ main }}/{{ sub }} 對應的資料或內容</p>
  </div>
</template>

<script setup>
defineProps(['main', 'sub'])
</script>
