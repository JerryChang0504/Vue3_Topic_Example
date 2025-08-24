<template>
  <h2>{{ model === 'add' ? '新增' : '編輯' }}選項</h2>
  <el-form
    ref="optionFormRef"
    :model="currentOption"
    :rules="formRules"
    :label-width="'100px'"
    class="option-form"
  >
    <el-form-item prop="id" label="ID" v-if="model === 'edit'">
      <el-input v-model="currentOption.id" disabled />
    </el-form-item>
    <el-form-item prop="listName" label="分類名稱">
      <el-input v-model="currentOption.listName" placeholder="分類名稱" />
    </el-form-item>
    <el-form-item prop="key" label="選項名稱">
      <el-input v-model="currentOption.key" placeholder="選項名稱" />
    </el-form-item>
    <el-form-item prop="value" label="選項值">
      <el-input v-model="currentOption.value" placeholder="選項值" />
    </el-form-item>
    <el-form-item prop="sortOrder" label="排序">
      <el-input-number v-model="currentOption.sortOrder" />
    </el-form-item>
    <el-form-item prop="isActive" label="啟用狀態">
      <el-switch v-model="currentOption.isActive" />
    </el-form-item>
    <el-form-item prop="description" label="描述">
      <el-input v-model="currentOption.description" placeholder="描述" />
    </el-form-item>
    <el-form-item label="操作">
      <el-button type="success" @click="optionFromSave(optionFormRef)">{{ fromState }}</el-button>
      <el-button @click="optionFromCancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import api from '@/service/api'
import { ElMessage } from 'element-plus'
import { computed, defineEmits, reactive, ref, watch } from 'vue'

const props = defineProps({
  model: {
    type: String,
    validator: (value) => ['add', 'edit'].includes(value),
  },
  option: {
    type: Object,
  },
})

const emit = defineEmits(['refresh', 'cancel'])

const optionFormRef = ref(null)
const fromState = computed(() => (props.model === 'add' ? '新增' : '更新'))
const currentOption = reactive({ ...props.option })

const formRules = reactive({
  listName: [
    { required: true, message: '請輸入列表名稱', trigger: 'blur' },
    { min: 3, max: 50, message: '長度需介於 3 到 50 個字元', trigger: 'blur' },
  ],
  key: [{ required: true, message: '請輸入選項名稱', trigger: 'blur' }],
  value: [{ required: true, message: '請輸入選項值', trigger: 'blur' }],
  sortOrder: [{ required: true, message: '請輸入排序值', trigger: 'change' }],
  isActive: [{ required: true, message: '請選擇啟用狀態', trigger: 'change' }],
})

// 監聽 option 的變化
watch(
  () => props.option,
  (newVal) => {
    Object.assign(currentOption, newVal)
  },
  { deep: true, immediate: true },
)

// 表單儲存
const optionFromSave = async (formRef) => {
  if (!formRef) return

  await formRef.validate(async (valid, fields) => {
    if (!valid) {
      console.log('表單驗證失敗！', fields)
      ElMessage({
        message: '請檢查表單內容是否有誤。',
        type: 'error',
      })
      return
    }
    try {
      if (props.model === 'add') {
        const res = await api.addOption({ ...currentOption, id: null, name: currentOption.key })
        if (res.code === '0000') {
          emit('refresh')
        }
      } else {
        const res = await api.updateOption(currentOption.id, {
          ...currentOption,
          name: currentOption.key,
        })
        if (res.code === '0000') {
          emit('refresh')
        }
      }
      ElMessage({
        message: `選項${fromState.value}成功！`,
        type: 'success',
      })
      formRef.resetFields()
    } catch (error) {
      ElMessage({
        message: `選項${fromState.value}失敗 : ${error}`,
        type: 'error',
      })
    }
  })
}

// 表單取消
const optionFromCancel = () => {
  emit('cancel', true)
}
</script>

<style scoped>
.option-form {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  background-color: #f9fafc;
}
</style>
