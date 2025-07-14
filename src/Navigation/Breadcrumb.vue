<template>
  <div class="breadcrumb-wrapper">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item to="/">首頁</el-breadcrumb-item>
      <el-breadcrumb-item v-if="mainLabel" :to="`/category/${main}`">
        {{ mainLabel }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="subLabel">
        {{ subLabel }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  categories: {
    type: Array,
    required: true,
  },
})

const route = useRoute()

const main = computed(() => route.params.main)
const sub = computed(() => route.params.sub)

const mainLabel = computed(() => {
  return props.categories.find((cat) => cat.name === main.value)?.label
})

const subLabel = computed(() => {
  const mainCat = props.categories.find((cat) => cat.name === main.value)
  return mainCat?.subs.find((s) => s.name === sub.value)?.label
})
</script>

<style scoped>
.breadcrumb-wrapper {
  padding: 16px 32px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
}
</style>
