/**
 * 根據配置過濾和轉換選項陣列
 *
 * @param {Array<Object>} options - 原始選項資料的陣列。
 * @param {Object} [config={}] - 設定物件，所有參數均可選填。
 * @param {string} [config.filterKey='listname'] - 用於過濾的鍵名。
 * @param {string} [config.filterValue=''] - 用於過濾的值。
 * @param {string} [config.labelKey='key'] - 選項物件中，用於顯示文字的屬性名稱。
 * @param {string} [config.valueKey='value'] - 選項物件中，用於值的屬性名稱。
 * @returns {Array<Object>} 轉換後的選項陣列。
 */
export function getOptions(
  options,
  { filterKey = 'listName', filterValue = '', labelKey = 'key', valueKey = 'value' } = {},
) {
  const filteredOptions = filterValue
    ? options.filter((o) => o[filterKey] === filterValue)
    : options

  return filteredOptions.map((o) => {
    return { label: o[labelKey], value: o[valueKey] }
  })
}

/**
 * 根據filterValue過濾和轉換選項陣列
 *
 * @param {Array<Object>} options - 原始選項資料的陣列。
 * @param {string} filterValue - 用於過濾的值。
 * @returns {Array<Object>} 轉換後的選項陣列。
 */
export function getfilterOption(options, filterValue) {
  return getOptions(options, { filterValue: filterValue })
}
