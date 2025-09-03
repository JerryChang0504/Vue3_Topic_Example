<template>
  <div class="card" @click="onClick">
    <img :src="imageUrl" :alt="title" />
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script setup>
// ✅ 接收 props
const props = defineProps({
  imageUrl: String,
  title: String,
  description: String
})

// ✅ 定義 emit
const emit = defineEmits(['card-clicked'])

// ✅ 當卡片被點擊，向父元件發送事件
function onClick() {
  emit('card-clicked', props.title)
}
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
</style>
