<template>
  <div class="chat-container">
    <h2>🧠 Ollama Chat (Llama3)</h2>
    <div class="chat-box">
      <div v-for="(msg, index) in messages" :key="index" :class="msg.role">
        <strong>{{ msg.role === 'user' ? '🧑‍💻 你' : '🤖 模型' }}:</strong> {{ msg.content }}
      </div>
    </div>
    <textarea v-model="input" placeholder="輸入你的訊息..." rows="3"></textarea>
    <button @click="send">送出</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const messages = ref([])

const send = async () => {
  if (!input.value.trim()) return

  messages.value.push({ role: 'user', content: input.value })

  const res = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: input.value,
      stream: false,
    }),
  })

  const data = await res.json()
  messages.value.push({ role: 'assistant', content: data.response })
  input.value = ''
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: auto;
  font-family: Arial, sans-serif;
}
.chat-box {
  border: 1px solid #ccc;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  margin-bottom: 1rem;
  background: #f9f9f9;
}
.user {
  text-align: right;
}
.assistant {
  text-align: left;
}
textarea {
  width: 100%;
  resize: none;
}
button {
  margin-top: 0.5rem;
}
</style>
