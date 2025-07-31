import apiService from './apiService'
import { API_ROUTES } from './apiRoutes'
import { find } from 'lodash'

const api = {
  // 註冊
  register: (data) => apiService.post(API_ROUTES.REGISTER, data),
  // 登入
  login: (data) => apiService.post(API_ROUTES.LOGIN, data),
  // 用戶資料
  user: () => apiService.get(API_ROUTES.USER),
  // 查詢個人資料
  findUser: () => apiService.get(API_ROUTES.FINDUSER),
  // 個人資料維護
  updateProfile: (data) => apiService.put(API_ROUTES.PROFILE, data),
  // 登出
  logout: () => apiService.post(API_ROUTES.LOGOUT),
}

export default api
