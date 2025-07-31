<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <h2 class="title">個人資料維護</h2>

      <el-form :model="form" :rules="rules" ref="profileForm" label-width="80px">
        <el-form-item label="帳號">
          <el-input v-model="form.username" disabled />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input v-model="form.email" placeholder="請輸入Email" clearable />
        </el-form-item>

        <el-form-item label="姓名" prop="fullName">
          <el-input v-model="form.fullName" placeholder="請輸入姓名" clearable />
        </el-form-item>

        <el-form-item label="手機號碼" prop="phone">
          <el-input v-model="form.phone" placeholder="請輸入手機號碼" clearable />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleUpdate" :loading="loading" style="width: 100%">
            更新資料
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import api from '@/service/api'
import { useUserStore } from '@/store/UserStore'
import { useRouter } from 'vue-router'

const profileForm = ref()
const loading = ref(false)
const userStore = useUserStore()
const router = useRouter()

const form = ref({
  username: '',
  email: '',
  fullName: '',
  phone: '',
})

onMounted(async () => {
  if (!userStore.user.isLogin) {
    ElMessage.error('請先登入')
    // router.push('/login')
    return
  }
  const token = localStorage.getItem('token')
  if (token) {
    const res = await api.findUser()
    console.log('🚀 ~ res:', res)
    form.value = { ...form.value, ...res.result }
  }
})

const validateEmail = (rule, value, callback) => {
  if (!value) {
    callback(new Error('請輸入Email'))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    callback(new Error('請輸入正確的Email'))
  } else {
    callback()
  }
}

const validatePhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('請輸入手機號碼'))
  } else if (!/^09\d{8}$/.test(value)) {
    callback(new Error('請輸入有效的台灣手機號碼'))
  } else {
    callback()
  }
}

const rules = {
  email: [{ validator: validateEmail, trigger: 'blur' }],
  fullName: [
    { required: true, message: '請輸入姓名', trigger: 'blur' },
    { min: 2, message: '姓名至少需2個字', trigger: 'blur' },
  ],
  phone: [{ validator: validatePhone, trigger: 'blur' }],
}

const handleUpdate = async () => {
  if (!profileForm.value) return

  try {
    const valid = await profileForm.value.validate()
    if (!valid) return

    loading.value = true
    await api.updateProfile({ ...form.value })
    ElMessage.success('資料更新成功！')
  } catch (err) {
    ElMessage.error(err.message || '更新失敗，請稍後再試')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f3f3f3;
  padding: 20px;
}

.profile-card {
  width: 100%;
  max-width: 500px;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  background: white;
}

.title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 26px;
  font-weight: bold;
  color: #333;
}
</style>
