<template>
  <p>👋 {{ greeting }}</p>
</template>

<script setup>
import { computed } from 'vue'
import { useAppContext } from '../composables/useAppContext'
const context = useAppContext()

const greeting = computed(() => {
  return context.locale === 'zh' ? '你好，世界！' : 'Hello, world!'
})
</script>
