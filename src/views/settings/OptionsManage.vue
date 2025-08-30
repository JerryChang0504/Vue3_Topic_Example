<template>
  <div class="container">
    <div class="header">
      <h2 class="title">選項管理</h2>
      <div class="header-actions">
        <el-button @click="showAddOptionForm = true" type="primary"> + 新增項目 </el-button>

        <el-select
          v-model="selectedCategory"
          placeholder="選擇分類"
          clearable
          class="select-category"
        >
          <el-option label="全部" value="" />
          <el-option
            v-for="category in categories"
            :key="category"
            :label="category"
            :value="category"
          />
        </el-select>
      </div>
    </div>

    <div class="add-option-container" v-if="showAddOptionForm">
      <h2>新增選項</h2>
      <el-form
        ref="optionFormRef"
        :model="optionForm"
        :rules="rules"
        label-width="120px"
        class="option-form"
      >
        <el-form-item label="列表名稱" prop="listName">
          <el-input v-model="optionForm.listName" placeholder="例如: order_status" />
        </el-form-item>

        <el-form-item label="選項名稱" prop="name">
          <el-input v-model="optionForm.name" placeholder="例如: 銷售中" />
        </el-form-item>

        <el-form-item label="選項值" prop="value">
          <el-input v-model="optionForm.value" placeholder="例如: 0" />
        </el-form-item>

        <el-form-item label="排序" prop="sortOrder">
          <el-input-number v-model="optionForm.sortOrder" :min="0" controls-position="right" />
        </el-form-item>

        <el-form-item label="是否啟用" prop="isActive">
          <el-switch v-model="optionForm.isActive" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="optionForm.description"
            type="textarea"
            :rows="2"
            placeholder="輸入選項描述"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm(optionFormRef)"> 提交 </el-button>
          <el-button @click="resetForm(optionFormRef)"> 重置 </el-button>
          <el-button type="success" @click="showAddOptionForm = false">關閉</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="filteredProducts" style="width: 100%">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="listName" label="分類名稱" width="180" />
      <el-table-column prop="key" label="選項名稱" />
      <el-table-column prop="value" label="選項值" />
      <el-table-column prop="sortOrder" label="排序" />
      <el-table-column prop="isActive" label="啟用狀態">
        <template #default="{ row }">
          <el-icon v-if="row.isActive" style="color: var(--el-color-success)"><Open /></el-icon>
          <el-icon v-else style="color: var(--el-color-danger)"><Close /></el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="{ row }">
          <el-button size="small" type="primary" @click="editOption(row.id)"> 編輯 </el-button>
          <el-button size="small" type="danger" @click="deleteOption(row.id)"> 刪除 </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import api from '@/service/api'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Open, Close } from '@element-plus/icons-vue'
import { useNavigation } from '@/composables/useNavigation'
const { goTo } = useNavigation()

const tableData = ref([])
const categories = ref([])
const selectedCategory = ref('')
// 表單的 ref，用於存取表單實例並呼叫其方法
const optionFormRef = ref(null)
const showAddOptionForm = ref(false)
// 表單資料，使用 reactive 創建響應式物件
const optionForm = reactive({
  listName: '',
  name: '',
  value: '',
  sortOrder: 0,
  isActive: true,
  description: '',
})
// 表單驗證規則
const rules = reactive({
  listName: [
    { required: true, message: '請輸入列表名稱', trigger: 'blur' },
    { min: 3, max: 50, message: '長度需介於 3 到 50 個字元', trigger: 'blur' },
  ],
  name: [{ required: true, message: '請輸入選項名稱', trigger: 'blur' }],
  value: [{ required: true, message: '請輸入選項值', trigger: 'blur' }],
  sortOrder: [{ required: true, message: '請輸入排序值', trigger: 'change' }],
})

const filteredProducts = computed(() => {
  return selectedCategory.value
    ? tableData.value.filter((p) => p.listName === selectedCategory.value)
    : tableData.value
})

// 提交表單的函式
const submitForm = async (formEl) => {
  // 如果表單實例不存在，則直接返回
  if (!formEl) return

  // 觸發表單驗證
  await formEl.validate((valid, fields) => {
    if (!valid) {
      // 驗證失敗
      console.log('表單驗證失敗！', fields)
      ElMessage({
        message: '請檢查表單內容是否有誤。',
        type: 'error',
      })
      return
    }

    try {
      api.addOption(optionForm)
      ElMessage({
        message: '選項新增成功！',
        type: 'success',
      })
      const res = api.getOptions()
      if (res.code === '0000') {
        tableData.value = res.result
        categories.value = [...new Set(tableData.value.map((p) => p.listName))]
      }

      optionFormRef.value.resetFields()
    } catch (error) {
      ElMessage({
        message: `選項新增失敗 : ${error}`,
        type: 'error',
      })
    }
  })
}

// 重置表單的函式
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields() // 重置所有表單項
}

const deleteOption = async (optionId) => {
  try {
    await ElMessageBox.confirm('確定要刪除這選項嗎？此操作無法復原。', '警告', {
      confirmButtonText: '確定',
      cancelButtonText: '取消',
      type: 'warning',
    })

    const res = await api.deleteOption(optionId)
    if (res.code === '0000') {
      ElMessage.success('選項刪除成功！')

      //更新該筆資料
      const index = tableData.value.findIndex((p) => p.id === res.result.id)
      if (index !== -1) {
        tableData.value.splice(index, 1, res.result)
      }
    }
  } catch (err) {
    if (err !== 'cancel') {
      console.error('刪除商品失敗:', err)
      ElMessage.error('刪除商品失敗，請稍後再試。')
    }
  }
}

onMounted(async () => {
  try {
    const res = await api.getOptions()
    if (res.code === '0000') {
      tableData.value = res.result
      categories.value = [...new Set(tableData.value.map((p) => p.listName))]
    }
  } catch (err) {
    ElMessage.error('載入商品失敗')
  }
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.header-actions {
  display: flex;
  align-items: center;
}

.select-category {
  margin-left: 16px;
  width: 160px;
}
</style>
