<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="ID" width="180" />
    <el-table-column prop="listName" label="List Name" width="180" />
    <el-table-column prop="key" label="Key" />
    <el-table-column prop="value" label="Value" />
    <el-table-column prop="sortOrder" label="Sort Order" />
    <el-table-column prop="isActive" label="Is Active" />
    <el-table-column prop="description" label="Description" />
  </el-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    id: 4,
    listName: 'order_status',
    key: '刪除',
    value: '0',
    sortOrder: 0,
    isActive: true,
    description: '商品狀態',
  },
])
</script>

<style scoped></style>
