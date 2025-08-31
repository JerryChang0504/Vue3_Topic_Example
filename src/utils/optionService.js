import api from '../service/api'
import Storage, { OPTIONS_KEY } from './storageUtil'

const CACHE_EXPIRY_MS = 3600 * 1000 // 緩存 1 小時

/**
 * 獲取並緩存選項資料
 * @returns {Promise<Object>} 返回選項資料
 */
export async function getAndCacheOptions() {
  const cachedData = JSON.parse(Storage.get(OPTIONS_KEY))
  const now = Date.now()

  // 檢查緩存是否存在且未過期
  if (cachedData && now - cachedData.timestamp < CACHE_EXPIRY_MS) {
    console.log('Using cached options data.')
    return cachedData.data
  }

  // 緩存無效，發送 API 請求
  try {
    console.log('Fetching fresh options data from API...')
    const response = await api.getOptions()
    const newData = response.result

    // 將新資料儲存到緩存
    Storage.set(
      OPTIONS_KEY,
      JSON.stringify({
        timestamp: now,
        data: newData,
      }),
    )
    return newData
  } catch (err) {
    console.error('Failed to load options:', err)
    return {} // 失敗時返回空物件
  }
}
