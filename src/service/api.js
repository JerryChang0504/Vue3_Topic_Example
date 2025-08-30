import Storage, { TOKEN_KEY } from '@/utils/storageUtil'
import { API_ROUTES } from './apiRoutes'
import apiService from './apiService'
import { add } from 'lodash'

const api = {
  // 註冊
  register: (data) => apiService.post(API_ROUTES.REGISTER, data),
  // 登入
  login: async (data) => {
    const res = await apiService.post(API_ROUTES.LOGIN, data)
    Storage.set(TOKEN_KEY, res.result)
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

  // 刪除產品
  deleteProduct: (id) => apiService.put(API_ROUTES.PRODUCT_DELETE(id)),

  // 取得選項列表
  getOptions: () => apiService.get(API_ROUTES.OPTIONS_LIST),

  addOption: (data) => apiService.post(API_ROUTES.OPTIONS_ADD, data),
  updateOption: (id, data) => apiService.put(API_ROUTES.OPTIONS_UPDATE(id), data),
  deleteOption: (id) => apiService.put(API_ROUTES.OPTIONS_DELETE(id)),

}

export default api
