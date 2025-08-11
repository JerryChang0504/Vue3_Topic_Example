<template>
  <div class="checkout-page">
    <div class="container mx-auto px-4 py-8">
      <!-- 步驟指示器 -->
      <div class="mb-8">
        <el-steps :active="currentStep" finish-status="success" align-center>
          <el-step title="確認商品"></el-step>
          <el-step title="配送資訊"></el-step>
          <el-step title="付款方式"></el-step>
          <el-step title="完成訂單"></el-step>
        </el-steps>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- 主要內容區 -->
        <div class="lg:col-span-2">
          <!-- 步驟 1: 確認商品 -->
          <div v-if="currentStep === 0" class="checkout-step">
            <h2 class="text-xl font-semibold mb-4">確認購買商品</h2>
            <div class="space-y-4">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex items-center p-4 border rounded-lg"
              >
                <img :src="item.image" :alt="item.name" class="w-16 h-16 object-cover rounded" />
                <div class="ml-4 flex-1">
                  <h3 class="font-medium">{{ item.name }}</h3>
                  <p class="text-gray-600">{{ item.description }}</p>
                  <div class="flex items-center mt-2">
                    <span class="text-sm text-gray-500">數量:</span>
                    <el-input-number
                      v-model="item.quantity"
                      :min="1"
                      :max="99"
                      size="small"
                      class="ml-2"
                      @change="updateQuantity(item.id, item.quantity)"
                    />
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-lg font-semibold text-primary">
                    NT$ {{ (item.price * item.quantity).toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-500">
                    單價: NT$ {{ item.price.toLocaleString() }}
                  </div>
                </div>
                <el-button
                  type="danger"
                  size="small"
                  icon="Delete"
                  circle
                  class="ml-4"
                  @click="removeItem(item.id)"
                />
              </div>
            </div>
          </div>

          <!-- 步驟 2: 配送資訊 -->
          <div v-if="currentStep === 1" class="checkout-step">
            <h2 class="text-xl font-semibold mb-4">配送資訊</h2>
            <el-form
              :model="shippingForm"
              :rules="shippingRules"
              ref="shippingFormRef"
              label-width="100px"
            >
              <el-form-item label="收件人" prop="name">
                <el-input v-model="shippingForm.name" placeholder="請輸入收件人姓名" />
              </el-form-item>

              <el-form-item label="聯絡電話" prop="phone">
                <el-input v-model="shippingForm.phone" placeholder="請輸入聯絡電話" />
              </el-form-item>

              <el-form-item label="配送地址" prop="address">
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <el-select v-model="shippingForm.city" placeholder="選擇縣市" class="flex-1">
                      <el-option
                        v-for="city in cities"
                        :key="city.value"
                        :label="city.label"
                        :value="city.value"
                      />
                    </el-select>
                    <el-select
                      v-model="shippingForm.district"
                      placeholder="選擇區域"
                      class="flex-1"
                    >
                      <el-option
                        v-for="district in districts"
                        :key="district.value"
                        :label="district.label"
                        :value="district.value"
                      />
                    </el-select>
                  </div>
                  <el-input
                    v-model="shippingForm.address"
                    placeholder="請輸入詳細地址"
                    type="textarea"
                    :rows="2"
                  />
                </div>
              </el-form-item>

              <el-form-item label="配送方式" prop="shippingMethod">
                <el-radio-group v-model="shippingForm.shippingMethod">
                  <el-radio label="standard" class="block mb-2">
                    <div class="flex justify-between items-center w-full">
                      <div>
                        <div class="font-medium">標準配送</div>
                        <div class="text-sm text-gray-500">3-5 個工作天</div>
                      </div>
                      <span class="text-green-600 font-medium">免費</span>
                    </div>
                  </el-radio>
                  <el-radio label="express" class="block">
                    <div class="flex justify-between items-center w-full">
                      <div>
                        <div class="font-medium">快速配送</div>
                        <div class="text-sm text-gray-500">1-2 個工作天</div>
                      </div>
                      <span class="text-orange-600 font-medium">NT$ 100</span>
                    </div>
                  </el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="備註">
                <el-input
                  v-model="shippingForm.notes"
                  type="textarea"
                  :rows="3"
                  placeholder="有任何特殊需求請在此註明"
                />
              </el-form-item>
            </el-form>
          </div>

          <!-- 步驟 3: 付款方式 -->
          <div v-if="currentStep === 2" class="checkout-step">
            <h2 class="text-xl font-semibold mb-4">付款方式</h2>
            <el-radio-group v-model="paymentMethod" class="space-y-4">
              <el-radio label="credit_card" class="block p-4 border rounded-lg">
                <div class="flex items-center">
                  <div class="flex-1">
                    <div class="font-medium">信用卡付款</div>
                    <div class="text-sm text-gray-500">支援 Visa、Mastercard、JCB</div>
                  </div>
                  <div class="flex space-x-2">
                    <!-- <img src="/images/visa.png" alt="Visa" class="h-6" />
                    <img src="/images/mastercard.png" alt="Mastercard" class="h-6" /> -->
                  </div>
                </div>
              </el-radio>

              <el-radio label="bank_transfer" class="block p-4 border rounded-lg">
                <div>
                  <div class="font-medium">銀行轉帳</div>
                  <div class="text-sm text-gray-500">轉帳後請上傳轉帳證明</div>
                </div>
              </el-radio>

              <el-radio label="cash_on_delivery" class="block p-4 border rounded-lg">
                <div>
                  <div class="font-medium">貨到付款</div>
                  <div class="text-sm text-gray-500">收到商品後再付款（需加收手續費 NT$ 30）</div>
                </div>
              </el-radio>
            </el-radio-group>

            <!-- 信用卡表單 -->
            <div
              v-if="paymentMethod === 'credit_card'"
              class="mt-6 p-4 border rounded-lg bg-gray-50"
            >
              <h3 class="font-medium mb-4">信用卡資訊</h3>
              <el-form :model="creditCardForm" :rules="creditCardRules" ref="creditCardFormRef">
                <el-form-item label="卡號" prop="cardNumber">
                  <el-input
                    v-model="creditCardForm.cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxlength="19"
                    @input="formatCardNumber"
                  />
                </el-form-item>

                <div class="grid grid-cols-2 gap-4">
                  <el-form-item label="有效期限" prop="expiryDate">
                    <el-input
                      v-model="creditCardForm.expiryDate"
                      placeholder="MM/YY"
                      maxlength="5"
                      @input="formatExpiryDate"
                    />
                  </el-form-item>

                  <el-form-item label="安全碼" prop="cvv">
                    <el-input
                      v-model="creditCardForm.cvv"
                      placeholder="123"
                      maxlength="4"
                      type="password"
                    />
                  </el-form-item>
                </div>

                <el-form-item label="持卡人姓名" prop="cardholderName">
                  <el-input v-model="creditCardForm.cardholderName" placeholder="如卡片上所示" />
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 步驟導航按鈕 -->
          <div class="flex justify-between mt-8">
            <el-button v-if="currentStep > 0" @click="previousStep" icon="ArrowLeft">
              上一步
            </el-button>
            <div v-else></div>

            <el-button v-if="currentStep < 2" type="primary" @click="nextStep" icon="ArrowRight">
              下一步
            </el-button>

            <el-button
              v-else
              type="primary"
              @click="submitOrder"
              :loading="submitting"
              icon="Check"
            >
              確認訂單
            </el-button>
          </div>
        </div>

        <!-- 側邊欄：訂單摘要 -->
        <div class="lg:col-span-1">
          <div class="sticky top-4">
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-lg font-semibold mb-4">訂單摘要</h3>

              <div class="space-y-2 mb-4">
                <div class="flex justify-between text-sm">
                  <span>商品小計</span>
                  <span>NT$ {{ subtotal.toLocaleString() }}</span>
                </div>

                <div class="flex justify-between text-sm">
                  <span>運費</span>
                  <span>NT$ {{ shippingFee.toLocaleString() }}</span>
                </div>

                <div
                  v-if="paymentMethod === 'cash_on_delivery'"
                  class="flex justify-between text-sm"
                >
                  <span>貨到付款手續費</span>
                  <span>NT$ 30</span>
                </div>

                <div class="border-t pt-2">
                  <div class="flex justify-between font-semibold text-lg">
                    <span>總計</span>
                    <span class="text-primary">NT$ {{ total.toLocaleString() }}</span>
                  </div>
                </div>
              </div>

              <div class="text-xs text-gray-500 mb-4">* 價格已含稅</div>

              <!-- 優惠券 -->
              <div class="mb-4">
                <el-input v-model="couponCode" placeholder="輸入優惠券代碼" size="small">
                  <template #append>
                    <el-button @click="applyCoupon" :loading="applyingCoupon"> 使用 </el-button>
                  </template>
                </el-input>
              </div>

              <!-- 商品列表 -->
              <div class="space-y-2">
                <h4 class="font-medium text-sm text-gray-700">購買商品</h4>
                <div v-for="item in cartItems" :key="item.id" class="flex justify-between text-sm">
                  <span>{{ item.name }} × {{ item.quantity }}</span>
                  <span>NT$ {{ (item.price * item.quantity).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useNavigation } from '@/composables/useNavigation'
import api from '@/service/api'
import { useCartStore } from '@/store/carStore'
const cartStore = useCartStore()
const cart = computed(() => cartStore.cart)

const router = useRouter()
const { goTo } = useNavigation()

// 響應式數據
const currentStep = ref(0)
const cartItems = ref([])
const submitting = ref(false)
const applyingCoupon = ref(false)
const couponCode = ref('')

// 配送表單
const shippingForm = ref({
  name: '',
  phone: '',
  city: '',
  district: '',
  address: '',
  shippingMethod: 'standard',
  notes: '',
})

const shippingFormRef = ref()

// 付款方式
const paymentMethod = ref('credit_card')

// 信用卡表單
const creditCardForm = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: '',
})

const creditCardFormRef = ref()

// 表單驗證規則
const shippingRules = {
  name: [{ required: true, message: '請輸入收件人姓名', trigger: 'blur' }],
  phone: [{ required: true, message: '請輸入聯絡電話', trigger: 'blur' }],
  address: [{ required: true, message: '請輸入配送地址', trigger: 'blur' }],
  shippingMethod: [{ required: true, message: '請選擇配送方式', trigger: 'change' }],
}

const creditCardRules = {
  cardNumber: [{ required: true, message: '請輸入信用卡號', trigger: 'blur' }],
  expiryDate: [{ required: true, message: '請輸入有效期限', trigger: 'blur' }],
  cvv: [{ required: true, message: '請輸入安全碼', trigger: 'blur' }],
  cardholderName: [{ required: true, message: '請輸入持卡人姓名', trigger: 'blur' }],
}

// 地區數據
const cities = ref([
  { label: '台北市', value: 'taipei' },
  { label: '新北市', value: 'new_taipei' },
  { label: '台中市', value: 'taichung' },
  // ... 更多城市
])

const districts = ref([])

// 計算屬性
const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
})

const shippingFee = computed(() => {
  return shippingForm.value.shippingMethod === 'express' ? 100 : 0
})

const total = computed(() => {
  let total = subtotal.value + shippingFee.value
  if (paymentMethod.value === 'cash_on_delivery') {
    total += 30 // 貨到付款手續費
  }
  return total
})

// 方法
const loadCartItems = () => {
  cartItems.value = cart.value
}

const updateQuantity = (itemId, quantity) => {
  const item = cartItems.value.find((item) => item.id === itemId)
  if (item) {
    item.quantity = quantity
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
}

const removeItem = (itemId) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== itemId)
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))

  if (cartItems.value.length === 0) {
    ElMessage.warning('購物車已清空')
    goTo('products')
  }
}

const nextStep = async () => {
  if (currentStep.value === 1) {
    // 驗證配送表單
    const valid = await shippingFormRef.value.validate().catch(() => false)
    if (!valid) return
  }

  if (currentStep.value === 2 && paymentMethod.value === 'credit_card') {
    // 驗證信用卡表單
    const valid = await creditCardFormRef.value.validate().catch(() => false)
    if (!valid) return
  }

  currentStep.value++
}

const previousStep = () => {
  currentStep.value--
}

const submitOrder = async () => {
  try {
    submitting.value = true

    const orderData = {
      items: cartItems.value,
      shipping: shippingForm.value,
      payment: {
        method: paymentMethod.value,
        ...(paymentMethod.value === 'credit_card' && {
          creditCard: creditCardForm.value,
        }),
      },
      subtotal: subtotal.value,
      shippingFee: shippingFee.value,
      total: total.value,
    }

    const response = await api.order.create(orderData)

    // 清空購物車
    localStorage.removeItem('cartItems')

    // 跳轉到成功頁面
    goTo('CheckoutSuccess', { orderId: response.data.id })

    ElMessage.success('訂單建立成功！')
  } catch (error) {
    console.error('訂單建立失敗:', error)
    ElMessage.error('訂單建立失敗，請稍後再試')
  } finally {
    submitting.value = false
  }
}

const applyCoupon = async () => {
  if (!couponCode.value.trim()) {
    ElMessage.warning('請輸入優惠券代碼')
    return
  }

  try {
    applyingCoupon.value = true
    const response = await api.coupon.validate(couponCode.value)

    if (response.valid) {
      ElMessage.success('優惠券套用成功！')
      // 應用折扣邏輯
    } else {
      ElMessage.error('優惠券無效或已過期')
    }
  } catch (error) {
    ElMessage.error('優惠券驗證失敗')
  } finally {
    applyingCoupon.value = false
  }
}

const formatCardNumber = (value) => {
  // 格式化信用卡號：1234 5678 9012 3456
  const formatted = value
    .replace(/\s/g, '')
    .replace(/(\d{4})/g, '$1 ')
    .trim()
  creditCardForm.value.cardNumber = formatted
}

const formatExpiryDate = (value) => {
  // 格式化有效期限：MM/YY
  const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2')
  creditCardForm.value.expiryDate = formatted
}

// 生命週期
onMounted(() => {
  loadCartItems()

  // if (cartItems.value.length === 0) {
  //   ElMessage.warning('購物車是空的')
  //   goTo('Cart')
  // }
})
</script>

<style scoped>
.checkout-step {
  @apply bg-white p-6 rounded-lg shadow-sm border;
}

.primary {
  @apply text-blue-600;
}
</style>
