<template>
  <input type="text" v-model="msg" @focus="emit('focus')" />
  <button @click="sendMessage(msg)">送出</button>
</template>

<script setup>
import { ref } from 'vue'

// 狀態
const msg = ref('')

// emit 定義：一個不驗證的事件 + 一個有驗證的事件
const emit = defineEmits({
  focus: null,
  send: (payload) => {
    if (payload.message.trim().length > 0) {
      return true
    } else {
      console.warn('⚠️ 訊息不能為空！')
      return false
    }
  },
})

// 發送訊息
function sendMessage(message) {
  emit('send', { message })
}
</script>

<style scoped></style>
