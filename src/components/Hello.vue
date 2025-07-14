<template>
  <div>
    <input v-model="message" placeholder="輸入留言..." />
    <button @click="sendMessage">發送</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 建立要發送的事件
const emit = defineEmits(['send'])

const message = ref('')

function sendMessage() {
  if (message.value.trim() !== '') {
    emit('send', message.value)
    message.value = '' // 清空輸入框
  }
}
</script>

<style scoped>
input {
  margin-right: 0.5rem;
}
</style>
