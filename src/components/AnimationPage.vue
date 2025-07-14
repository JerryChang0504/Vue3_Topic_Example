<template>
  <div>
    <h3>🎞 這是動畫頁</h3>
    <div :class="['spinner', { paused: isPaused }]"></div>
    <p>{{ isPaused ? '⏸️ 動畫暫停中' : '▶️ 動畫播放中' }}</p>
  </div>
</template>

<script setup>
import { ref, onActivated, onDeactivated } from 'vue'

const isPaused = ref(false)

onActivated(() => {
  console.log('🔄 動畫啟動')
  isPaused.value = false
})

onDeactivated(() => {
  console.log('⏸️ 動畫暫停')
  isPaused.value = true
})
</script>

<style scoped>
.spinner {
  margin: 30px auto;
  width: 100px;
  height: 100px;
  border: 10px solid #ccc;
  border-top: 10px solid #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.paused {
  animation-play-state: paused;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
