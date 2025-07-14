<template>
  <div class="form-container">
    <h3>步驟 {{ step + 1 }} / {{ steps.length }}</h3>

    <transition name="fade" mode="out-in">
      <component :is="currentStepComponent" :form="form" :key="step" />
    </transition>

    <p class="error" v-if="error">{{ error }}</p>

    <div class="actions">
      <button @click="prevStep" :disabled="step === 0">⬅ 上一步</button>
      <button @click="nextStep">
        {{ step === steps.length - 1 ? ' 送出' : '➡ 下一步' }}
      </button>
    </div>
    <!-- <pre>{{ form }}</pre> -->
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Step1 from './Step1.vue'
import Step2 from './Step2.vue'
import Step3 from './Step3.vue'

const steps = [Step1, Step2, Step3]
const step = ref(0)
const error = ref('')

const form = ref({
  name: '',
  email: '',
})

const currentStepComponent = computed(() => steps[step.value])

function nextStep() {
  error.value = ''
  if (step.value === 0 && !form.value.name.trim()) {
    error.value = '請輸入姓名'
    return
  }
  if (step.value === 1 && !form.value.email.trim()) {
    error.value = '請輸入 Email'
    return
  }

  if (step.value < steps.length - 1) {
    step.value++
  } else {
    alert(` 表單送出：${JSON.stringify(form.value)}`)
  }
}

function prevStep() {
  if (step.value > 0) {
    error.value = ''
    step.value--
  }
}
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fdfdfd;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 1rem 0;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

button {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  background: #42b983;
  color: white;
  cursor: pointer;
}

button:disabled {
  background: #aaa;
}

.error {
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* ✨ 加入動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
