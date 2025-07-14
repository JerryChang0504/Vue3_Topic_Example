<template>
  <div class="tabs">
    <button v-for="tab in tabs" :key="tab" @click="currentTab = tab">
      {{ tab }}
    </button>
  </div>

  <component :is="currentTabComponent" class="content" />
</template>

<script setup>
import { ref, computed } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import Contact from './Contact.vue'

const tabs = ['Home', 'About', 'Contact']
const currentTab = ref('Home')

// 對應元件映射
const componentsMap = {
  Home,
  About,
  Contact,
}

const currentTabComponent = computed(() => componentsMap[currentTab.value])
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  background: #42b983;
  color: white;
}

.content {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
