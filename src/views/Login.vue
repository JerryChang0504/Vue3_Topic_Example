<!-- src/views/Login.vue -->
<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">會員登入</h2>

      <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
        <el-form-item label="帳號" prop="username">
          <el-input v-model="form.username" placeholder="請輸入帳號或Email" clearable />
        </el-form-item>

        <el-form-item label="密碼" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            show-password
            placeholder="請輸入密碼"
            clearable
            @keyup.enter="handleLogin"
          />
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="form.rememberMe">記住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" style="width: 100%">
            登入
          </el-button>
        </el-form-item>

        <div class="login-links">
          <el-link type="primary" @click="handleForgotPassword">忘記密碼？</el-link>
          <el-link type="primary" @click="handleRegister">註冊新帳號</el-link>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginForm = ref()
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  rememberMe: false,
})

// 改進的驗證規則
const rules = {
  username: [
    { required: true, message: '請輸入帳號或Email', trigger: 'blur' },
    { min: 3, message: '帳號至少需要3個字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 6, message: '密碼至少需要6個字符', trigger: 'blur' },
  ],
}

// 載入記住的帳號
onMounted(() => {
  const rememberedUsername = localStorage.getItem('rememberedUsername')
  if (rememberedUsername) {
    form.value.username = rememberedUsername
    form.value.rememberMe = true
  }
})

const handleLogin = async () => {
  if (!loginForm.value) return

  try {
    const valid = await loginForm.value.validate()
    if (!valid) return

    loading.value = true

    // 模擬登入API調用
    await simulateLogin()

    // 處理記住我功能
    if (form.value.rememberMe) {
      localStorage.setItem('rememberedUsername', form.value.username)
    } else {
      localStorage.removeItem('rememberedUsername')
    }

    // 儲存登入狀態（建議使用JWT token）
    const loginData = {
      isLogin: true,
      username: form.value.username,
      loginTime: new Date().getTime(),
    }
    localStorage.setItem('loginData', JSON.stringify(loginData))

    ElMessage.success('登入成功！')
    router.push('/') // 登入後導回首頁
  } catch (error) {
    ElMessage.error(error.message || '登入失敗，請稍後再試')
  } finally {
    loading.value = false
  }
}

// 模擬登入API
const simulateLogin = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模擬登入驗證
      if (form.value.username === 'admin' && form.value.password === '123456') {
        resolve()
      } else if (form.value.username && form.value.password) {
        // 模擬成功登入（實際應該調用API）
        resolve()
      } else {
        reject(new Error('帳號或密碼錯誤'))
      }
    }, 1000)
  })
}

const handleForgotPassword = () => {
  ElMessage.info('忘記密碼功能開發中...')
  // router.push('/forgot-password')
}

const handleRegister = () => {
  // ElMessage.info('註冊功能開發中...')
  router.push('/register')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 400px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: white;
  backdrop-filter: blur(10px);
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
  color: #333;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-links {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-button {
  font-size: 16px;
  height: 44px;
  border-radius: 8px;
}

.el-input :deep(.el-input__inner) {
  height: 44px;
  border-radius: 8px;
}
</style>
