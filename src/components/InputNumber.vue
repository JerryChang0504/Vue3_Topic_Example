<!-- <InputNumber v-model:value="state.inputNumber"  /> 預設允許輸入整數 -->
<!-- <InputNumber v-model:value="state.inputNumber" :integer="false" />  允許輸入小數點-->

<template>
  <input v-model="numVal" v-bind="$attrs" type="text" />
</template>
<script setup name="InputNumber">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: '',
  },
  integer: {
    type: Boolean,
    default: true,
  },
})
const emit = defineEmits(['update:value'])

const isInteger = (val) => /^-?\d+$/g.test(val) // 是否為整數
const hasLeadingZeros = (val) => /^0\d.*$/g.test(String(val)?.replace('-', '')) // 是否為以0開頭

// 欄位值處理
const numVal = computed({
  get: () => {
    const num =
      String(props.value)
        ?.replace(/[^0-9.]/g, '')
        .replace(/(\..*?)\..*/g, '$1') || ''

    if (hasLeadingZeros(num)) {
      if (props.integer) {
        emit(
          'update:value',
          isInteger(num)
            ? num.replace(/^0+/, '')
            : num.replace(/^0+/, '').substring(num.indexOf('.'), -1), // 刪除前面的0
        )
        return isInteger(num)
          ? num.replace(/^0+/, '')
          : num.replace(/^0+/, '').substring(num.indexOf('.'), -1)
      } else {
        emit('update:value', num.replace(/^0+/, ''))
        return num.replace(/^0+/, '')
      }
    } else {
      if (props.integer) {
        emit('update:value', isInteger(num) ? num : num.substring(num.indexOf('.'), -1))
        return isInteger(num) ? num : num.substring(num.indexOf('.'), -1)
      } else {
        emit('update:value', num)
        return num
      }
    }
  },
  set(value) {
    emit('update:value', value)
  },
})
</script>
