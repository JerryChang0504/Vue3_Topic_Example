<template>
  <div>
    <h2>目前分類路徑：</h2>
    <p>/category/{{ paths.join('/') }}</p>
    {{ $route.params }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

// const props = defineProps({
//   paths: {
//     type: Array,
//     default: () => [],
//   },
// })

const route = useRoute()
const paths = computed(() => {
  const p = route.params.paths
  if (Array.isArray(p)) return p
  if (typeof p === 'string') return p ? [p] : []
  return []
})
console.log('🚀 ~ paths ~ paths:', paths.value)
</script>
