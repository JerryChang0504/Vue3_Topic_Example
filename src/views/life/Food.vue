<template>
  <div class="page">
    <!-- 頂部 Banner -->
    <header class="header">
      <h1>美食天堂介紹</h1>
      <p>多種選擇，口味多樣</p>
    </header>

    <!-- 卡片區塊 -->
    <main class="container">
      <div class="card" v-for="(item, index) in cards" :key="index">
        <img :src="item.image" :alt="item.title" class="card-img" />
        <h2>{{ item.title }}</h2>
        <p>{{ item.content }}</p>
        <button class="btn">了解更多</button>
      </div>
    </main>

    <!-- 頁尾 -->
    <footer class="footer">
      <p>© 2025 我的網站 | idea by dan</p>
    </footer>
  </div>
</template>

<script setup>
const cards = [
  {
    title: "中式美食",
    content: "火侯精準、調味講究。",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8mJBadfEj8M_dPQATxl0uH2ETTgqpHEZgHQ&s"
  },
  {
    title: "日式美食",
    content: "營養均衡、注重原味。",
    image: "https://www.gomaji.com/blog/wp-content/uploads/2021/01/FotoJet2-1.jpg"
  },
  {
    title: "美式美食",
    content: "多樣性高、份量大。",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9Oj1CXD9hVKZANXu3l3CRKEavmHHV87Zeg&s"
  },
];
</script>

<style scoped>
/* 頁面整體 */
.page {
  font-family: "Microsoft JhengHei", sans-serif;
  background: #f4f4f9;
  color: #333;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: #4a90e2;
  color: white;
  text-align: center;
  padding: 20px 10px;
}

/* 卡片容器 */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 50px;
  flex: 1;
}

/* 卡片 */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-5px);
}

/* 卡片圖片 */
.card-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

/* 按鈕 */
.btn {
  margin-top: 10px;
  background: #4a90e2;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.2s;
}
.btn:hover {
  background: #357abd;
}

/* Footer */
.footer {
  background: #222;
  color: white;
  text-align: center;
  padding: 5px;
  margin-top: auto;
}
</style>

