<template>
  <button @click="context.toggleTheme">🌗 切換主題（目前：{{ context.theme }}）</button>
</template>

<script setup>
import { useAppContext } from '../composables/useAppContext'

const context = useAppContext()
</script>
