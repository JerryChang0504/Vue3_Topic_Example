<template>
  <div>
  <header class="header">
    <h1>歡迎來到台灣旅遊介紹</h1>
    <p>探索台灣的美麗景點，感受獨特的文化與自然風光！</p>
  </header>
    <div class="cards-container">
    <CardComponent
      v-for="(card, index) in cards"
      :key="index"
      :imageUrl="card.imageUrl"
      :title="card.title"
      :description="card.description"
      :details="card.details"
      @card-clicked="openModal(index)"
    />
    </div>

    <footer class="footer">
    <p>&copy; 2025 台灣旅遊介紹網站 - 版權所有</p>
  </footer>
  </div>

  <!-- <div class="cards-container">
    <CardComponent
      v-for="(card, index) in cards"
      :key="index"
      v-model="activeCardIndex"
      :imageUrl="card.imageUrl"
      :title="card.title"
      :description="card.description"
      :modelValue="activeCardIndex === index"
      @update:modelValue="val => {
        if (val) activeCardIndex = index
        else if (activeCardIndex === index) activeCardIndex = null
      }"
    />
  </div> -->

  <!-- 詳情彈窗 -->

  <DetailModal
  v-if="showModal && activeCardIndex !== null"
  v-model:visible="showModal"
  :title="cards[activeCardIndex].title"
  :details="cards[activeCardIndex].details"
  @update:visible="closeModal"
/>

</template>

<script setup>
import CardComponent from '@/views/life/travel/CardComponent.vue'
import DetailModal  from '@/views/life/travel/DetailModal.vue'


import { ref } from 'vue'
const showModal = ref(false)
const activeCardIndex = ref(null)

// 開啟 Modal
function openModal(index) {
  activeCardIndex.value = index
  showModal.value = true
}

// 關閉 Modal
function closeModal() {
  showModal.value = false
  activeCardIndex.value = null
}


const cards = ref([
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCzdjON7t97HcNcrupCN4nVa1onC5dP-ISxg&s',
    title: '台南 - 安平古堡',
    description: '台灣最具歷史意義的景點之一。',
    details:'安平古堡建於17世紀，是荷蘭人建立的第一個堡壘，充滿歷史故事。'
  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAzX7fpq2qIyxpyStNCo3Spgh1uIdJO3B3Yw&s',
    title: '台北 - 台北101',
    description: '世界著名的高樓建築與都市地標。',
    details:'台北101 是台灣科技與設計的象徵，也擁有高級購物中心與觀景台。'

  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScdQ-VTTuGSQtcj1ZaCwahpIoJeSAt0ax4pw&s',
    title: '南投 - 日月潭',
    description: '台灣最美的湖泊之一，風景如畫。',
    details:'日月潭為天然湖泊，擁有壯麗風景與豐富原住民文化。'

  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0n99SlTL2x0TPvV0_Nmrg-1ddjTTfHioaMQ&s',
    title: '墾丁 - 墾丁國家公園',
    description: '擁有美麗的沙灘、熱帶植物和豐富的海洋生物。',
    details:'墾丁國家公園位於臺灣南端恆春半島之南側，三面環海，是國內少數涵蓋陸地與海域的國家公園之一，也是臺灣本島唯一的熱帶區域。 特殊的地形、豐饒的動植物及獨特的民情風俗，不僅是保育、研究、環境教育的自然博物館，更是國民休閒旅遊的怡情勝地'

  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKOu7xssurA1kDuQL-Cl6uB86-1IGhdjAsQ&s',
    title: '台北 - 陽明山國家公園',
    description: '陽明山以其獨特的火山景觀、溫泉和美麗的花卉而聞名。',
    details:'陽明山以其獨特的火山地形、豐富的自然生態、四季皆有的花卉美景、以及地熱溫泉而聞名，其中以大屯火山群為主體，保存著完整的火山遺跡。 豐富的動植物物種也讓陽明山成為生態觀察的絕佳地點，而擎天崗的草原景觀與小油坑的噴氣孔地貌，更是遊客不可錯過的景點。'

  },
  {
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIgZRuvkuWge-N71W6IDB9den1GBEjDMTNgg&s',
    title: '新北 - 九份老街',
    description: '是一個融合了歷史和自然景觀的浪漫小鎮。',
    details:'九份老街是位於台灣新北市瑞芳區的一座知名山城，因昔日盛產金礦而興盛，後因採礦業沒落而一度沉寂，卻保留了獨特的坡地景觀和日式建築風格。 其主要景觀集中在基山街、豎崎路和輕便路，以懷舊的氛圍、豐富的台灣傳統小吃、茶館文化和迷人的山海夜景聞名。'

  }
])

function handleCardClick(title) {
  console.log(`歡迎來到：${title}`)
}

</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 40px;
  justify-content: center;
}
.header {
  text-align: center;
}
.footer {
  text-align: center;
}
</style>
