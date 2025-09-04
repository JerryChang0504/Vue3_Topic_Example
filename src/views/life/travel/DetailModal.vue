<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="modal">
      <h2>{{ title }}</h2>
      <p>{{ details }}</p>
      <button @click="close">關閉</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  visible: Boolean,
  title: String,
  details: String
})
const emit = defineEmits(['update:visible'])

function close() {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}
.modal {
  background: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  max-width: 90%;
  text-align: center;
}
.modal h2 {
  margin-bottom: 10px;
}
.modal button {
  margin-top: 20px;
  background-color: #444;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
