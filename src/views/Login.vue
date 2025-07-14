<!-- src/views/LoginPage.vue -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">會員登入</h2>

      <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username" placeholder="請輸入帳號" />
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="請輸入密碼"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading">登入</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '請輸入帳號', trigger: 'blur' }],
  password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }],
}

const handleLogin = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      loading.value = true

      // 模擬登入
      setTimeout(() => {
        loading.value = false

        // 儲存登入狀態（可換成 Pinia 或 localStorage）
        localStorage.setItem('isLogin', 'true')
        ElMessage.success('登入成功！')
        router.push('/') // 登入後導回首頁
      }, 1000)
    }
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f2f2;
}

.login-card {
  width: 400px;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.title {
  text-align: center;
  margin-bottom: 24px;
  font-size: 24px;
  color: #333;
}
</style>
