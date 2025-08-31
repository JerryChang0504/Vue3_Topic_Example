import Storage, { CART_KEY, TOKEN_KEY, USER_KEY, USER_ROLE_KEY } from '@/utils/storageUtil'
import { defineStore } from 'pinia'

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]
    const base64 = atob(base64Url)
    return JSON.parse(base64)
  } catch (e) {
    return null
  }
}

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      username: '',
      password: '',
      rememberMe: false,
      isLogin: false,
    },
    remainingTime: 0, // 剩餘秒數
    timer: null, // 計時器
  }),
  actions: {
    /**
     * 登入
     * @param {*} user
     * @returns
     * @description
     * 將用戶資料儲存到狀態中
     * 啟動 Token 倒數
     * 將用戶資料儲存到狀態中
     * */
    login(user, res) {
      this.user = user
      Storage.set(USER_KEY, user)
      Storage.set(TOKEN_KEY, res.token)
      this.startTokenCountdown(res.token)
      Storage.set(USER_ROLE_KEY, res.userRole)
    },
    /**
     * 啟動 Token 倒數
     * @param {*} token
     * @returns
     */
    startTokenCountdown(token) {
      // 解析 token
      const payload = parseJwt(token)
      if (!payload?.exp) return
      this.stopTokenCountdown() // 避免多個 interval 重複

      const updateTime = () => {
        const now = Math.floor(Date.now() / 1000)
        const remaining = payload.exp - now
        this.remainingTime = remaining

        if (remaining <= 0) {
          this.logout()
        }
      }

      updateTime()
      this.timer = setInterval(updateTime, 1000)
    },

    /**
     * 停止 Token 倒數
     */
    stopTokenCountdown() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },

    /**
     * 登出
     */
    logout() {
      this.stopTokenCountdown()
      this.user.isLogin = false
      Storage.remove(TOKEN_KEY)
      Storage.remove(CART_KEY)
      Storage.remove(USER_ROLE_KEY)
      this.remainingTime = 0
    },
  },
})
