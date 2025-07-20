// src/services/apiService.js
import axios from 'axios'

const apiService = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
})

// 請求攔截器：自動加上 Token
apiService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// 回應攔截器：統一錯誤處理（可擴充）
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // 可自訂錯誤訊息處理
    if (error.response?.status === 401) {
      console.warn('未授權，請重新登入')
    }
    return Promise.reject(error)
  },
)

export default apiService
