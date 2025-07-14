<template>
  <div>
    <h1>📋 我的待辦清單</h1>
    <input v-model="newItem" placeholder="輸入待辦事項" />
    <button @click="addItem">加入</button>

    <ol>
      <TodoItem
        v-for="(item, index) in todos"
        :key="index"
        :text="item"
        :index="index"
        @remove="removeItem"
      />
    </ol>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TodoItem from './MessageInput.vue'

const newItem = ref('')
const todos = ref([])

function addItem() {
  if (newItem.value.trim() !== '') {
    todos.value.push(newItem.value)
    newItem.value = ''
  }
}

function removeItem(index) {
  todos.value.splice(index, 1)
}
</script>

<style scoped>
ol {
  padding-left: 10px;
}
li {
  margin: 5px 0;
}
button {
  margin-left: 10px;
}
</style>
