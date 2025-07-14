<template>
  <button @click="context.toggleLocale">🌍 切換語系（目前：{{ context.locale }}）</button>
</template>

<script setup>
import { useAppContext } from '../composables/useAppContext'

const context = useAppContext()
</script>
