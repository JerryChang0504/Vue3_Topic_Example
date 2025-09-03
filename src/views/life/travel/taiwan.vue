<template>
  <div>
  <header class="header">
    <h1>歡迎來到台灣旅遊介紹</h1>
    <p>探索台灣的美麗景點，感受獨特的文化與自然風光！</p>
  </header>
    <main class="cards-container">
      <CardComponent
        v-for="(card, index) in cards"
        :key="index"
        :imageUrl="card.imageUrl"
        :title="card.title"
        :description="card.description"
        @card-clicked="handleCardClick"
      />
    </main>

    <footer class="footer">
    <p>&copy; 2025 台灣旅遊介紹網站 - 版權所有</p>
  </footer>
  </div>
</template>

<script setup>
import CardComponent from '@/views/life/travel/CardComponent.vue'

import { ref } from 'vue'

const cards = ref([
  {
    imageUrl: 'https://via.placeholder.com/300x200?text=台南',
    title: '台南 - 安平古堡',
    description: '台灣最具歷史意義的景點之一。'
  },
  {
    imageUrl: 'https://imgs.cwgv.com.tw/books/BCB/BCB755/cover/thumb/BCB755.png',
    title: '台北 - 台北101',
    description: '世界著名的高樓建築與都市地標。'
  },
  {
    imageUrl: 'https://via.placeholder.com/300x200?text=日月潭',
    title: '南投 - 日月潭',
    description: '台灣最美的湖泊之一，風景如畫。'
  },
  {
    imageUrl: 'https://via.placeholder.com/300x200?text=日月潭',
    title: '墾丁 - 墾丁國家公園',
    description: '擁有美麗的沙灘、熱帶植物和豐富的海洋生物。'
  },
  {
    imageUrl: 'https://via.placeholder.com/300x200?text=日月潭',
    title: '台北 - 陽明山國家公園',
    description: '陽明山以其獨特的火山景觀、溫泉和美麗的花卉而聞名。'
  },
  {
    imageUrl: 'https://via.placeholder.com/300x200?text=日月潭',
    title: '新北 - 九份老街',
    description: '是一個融合了歷史和自然景觀的浪漫小鎮。'
  }
])

function handleCardClick(title) {
  alert(`歡迎來到：${title}`)
}
</script>

<style scoped>
.header {
  background: #1e3d58;
  color: white;
  text-align: center;
  padding: 50px 20px;
}
.header h1 {
  font-size: 3rem;
}
.header p {
  font-size: 1.2rem;
  margin-top: 10px;
}

.cards-container {
  display: flex;
  justify-content: left;
  gap: 20px;
  flex-wrap: wrap;
  margin: 40px 0;
  padding: 0 20px;
}
.footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}
.footer p {
  font-size: 1rem;
}
</style>
