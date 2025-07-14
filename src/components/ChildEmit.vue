<template>
  <button @click="$emit('child-event', 'from child')">點我觸發事件</button>
</template>

<script setup></script>

<style scoped></style>
