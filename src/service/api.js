import { API_ROUTES } from './apiRoutes'
import apiService from './apiService'

const api = {
  // 註冊
  register: (data) => apiService.post(API_ROUTES.REGISTER, data),
  // 登入
  login: async (data) => {
    const res = await apiService.post(API_ROUTES.LOGIN, data)
    localStorage.setItem('token', res.result)
    return res
  },
  // 用戶資料
  user: () => apiService.get(API_ROUTES.USER),
  // 查詢個人資料
  findUser: () => apiService.get(API_ROUTES.FINDUSER),
  // 個人資料維護
  updateProfile: (data) => apiService.put(API_ROUTES.PROFILE, data),
  // 登出
  logout: () => apiService.post(API_ROUTES.LOGOUT),
  // 新增產品
  addProduct: (data) => apiService.post(API_ROUTES.PRODUCT_ADD, data),

  // 取得產品列表
  getProducts: () => apiService.get(API_ROUTES.PRODUCT_LIST),

  // 取得產品詳細資料
  getProductById: (id) => apiService.get(API_ROUTES.PRODUCT_DETAIL(id)),
  // 更新產品資料
  updateProduct: (id, data) => apiService.put(API_ROUTES.PRODUCT_UPDATE(id), data),

  // 取得產品管理列表
  getManageProducts: () => apiService.get(API_ROUTES.PRODUCT_MANAGE_LIST),
}

export default api
