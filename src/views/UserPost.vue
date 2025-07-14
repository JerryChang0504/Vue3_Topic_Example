<template>
  <label>template 直接取用 route params</label>
  <div>User {{ $route.params.username }} with post {{ $route.params.postId }}</div>
  <label>script setup 取用 route params</label>
  <div>User {{ username }} with post {{ postId }}</div>
</template>
<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const { username, postId } = route.params
</script>
