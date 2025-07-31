import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: {
      username: '',
      password: '',
      rememberMe: false,
      isLogin: false,
    },
  }),
  actions: {
    login(user) {
      this.user = user
    },
  },
})
