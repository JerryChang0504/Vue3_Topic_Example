<template>
   <div
    class="card"
    :class="{ active: isActive }"
    @click="toggleDetails"
  >
    <img :src="imageUrl" :alt="title" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <button>顯示詳情</button>
  </div>
</template>

<script setup>
import {ref, watch}from 'vue'

// ✅ 接收 props
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  details:String,
  modelValue: Boolean // 用 v-model 傳進來的 active 狀態
})

// ✅ 定義 emit
const emit = defineEmits(['card-clicked'])


const showDetails = ref(false)

// ✅ 當卡片被點擊，向父元件發送事件
function toggleDetails() {
  emit('card-clicked') // 通知父元件
  showDetails.value = !showDetails.value
}

// watch(showDetails, (val) => {
//   console.log(val ? `✅ 展開：${props.title}` : `❎ 收起：${props.title}`)
// })
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 280px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}
.card img {
  width: 100%;         /* 寬度100% */
  height: 200px;       /* 固定高度 */
  object-fit: cover;   /* ⭐️ 自動裁切圖片填滿，不變形 */
  border-bottom: 1px solid #eee;
}
.card.active {
  background-color: #fffbe0; /* 🌕 淡黃色，表示已點擊 */
}
.card button {
  margin-top: 10px;
  background-color: #345678;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
/* 浮起效果：hover */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

/* 浮起效果：點擊中 */
.card:active {
  transform: scale(0.98);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* 顯示詳情時強調卡片 */
.card.active {
  border: 2px solid #1e3d58;
}
</style>
