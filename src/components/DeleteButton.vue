<!-- components/DeleteButton.vue -->
<template>
  <button @click="modal.open('confirm')">刪除</button>
</template>

<script setup>
import { inject } from 'vue'

const modal = inject('modal')
</script>
