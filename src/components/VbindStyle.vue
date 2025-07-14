<template>
  <div class="form-wrapper">
    <h2>📝 多欄位輸入 + 聚焦互動</h2>

    <div v-for="(item, index) in inputs" :key="index" class="input-item">
      <label>第 {{ index + 1 }} 項</label>
      <input
        type="text"
        v-model="item.value"
        :placeholder="`輸入第 ${index + 1} 項...`"
        ref="inputRefs"
      />
    </div>

    <div class="button-group">
      <button v-for="(item, index) in inputs" :key="'btn-' + index" @click="focusInput(index)">
        跳到第 {{ index + 1 }} 項
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'

// 輸入欄位資料
const inputs = ref([{ value: '' }, { value: '' }, { value: '' }, { value: '' }])

// 建立 refs 陣列
const inputRefs = ref([])

// 聚焦指定欄位
const focusInput = async (index) => {
  await nextTick()
  inputRefs.value[index]?.focus()
}

onMounted(async () => {
  const res = await fetch('/api/products')
  const data = await res.json()
  console.log(data)
})
</script>

<style scoped>
.form-wrapper {
  padding: 20px;
  max-width: 500px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 10px;
}
.input-item {
  margin-bottom: 12px;
}
.input-item input {
  width: 100%;
  padding: 8px;
  font-size: 16px;
}
.button-group {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
button {
  padding: 8px 12px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
button:hover {
  background-color: #36966e;
}
</style>
