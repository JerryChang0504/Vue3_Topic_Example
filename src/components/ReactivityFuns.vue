<template>
  <div :class="'divbox'" :style="{ backgroundColor: box.color }">
    <p>按下按鈕次數：{{ count }}</p>
    <button @click="changeColor">變更顏色</button>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 用 ref 管理單一數值
const count = ref(0)

// 用 reactive 管理物件
const box = reactive({
  color: 'blue',
})

// 改變顏色與計數
const changeColor = () => {
  //計數
  count.value++
  //隨機顏色
  box.color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
}
</script>
<style scoped>
.divbox {
  margin: 20px;
  padding: 20px;
  color: #fff;
}
</style>
