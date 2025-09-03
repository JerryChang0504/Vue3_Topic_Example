<template>
  <div class="card" @click="toggleDetails">
    <img :src="imageUrl" :alt="title" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>

  <div v-if="showDetails" class="details">
    <p>{{ details }}</p>
    <button @click.stop="toggleDetails">收起詳情</button>
  </div>
    <div v-else>
      <button @click.stop="toggleDetails">顯示詳情</button>
  </div>
</template>

<script setup>
import {ref, watch}from 'vue'

// ✅ 接收 props
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String,
  details:String
})

// ✅ 定義 emit
const emit = defineEmits(['card-clicked'])

const showDetails = ref(false)

// ✅ 當卡片被點擊，向父元件發送事件
function toggleDetails() {
  showDetails.value = !showDetails.value
  emit('card-clicked', props.title) // 傳送事件到父元件
}

//✅ 使用 watch 監聽詳情開關
watch(showDetails, (newVal) => {
  if (newVal) {
    console.log(`✅ 已展開詳情：${props.title}`)
  } else {
    console.log(`❎ 已關閉詳情：${props.title}`)
  }
})
</script>

<style scoped>
.card {
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-10px);
}
.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}
.card h3 {
  font-size: 1.5rem;
  margin: 20px 0 10px;
}
.card p {
  font-size: 1rem;
  padding: 0 20px 20px;
  color: #666;
}
.details {
  margin-top: 10px;
}
button {
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #1e3d58;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #345678;
}
</style>
