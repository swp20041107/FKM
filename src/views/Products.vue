<template>
  <!-- 商品列表 -->
  <div class="products">
    <!-- 头部start -->
    <div class="records_header">
      <!-- 搜索 -->
      <el-input
        v-model="data.query.key"
        clearable
        @clear="getTable"
        @keydown.enter="getTable"
        placeholder="请输入查询关键词"
      />
      <el-button type="primary" @click="getTable">查询</el-button>
      <el-button type="primary" @click="add">去添加</el-button>
    </div>
    <!-- 头部end -->
  </div>
</template>

<script setup lang="ts">
let data = reactive({
  query: {
    key: ''
  }
})
const getTable = () => {}
const add = () => {}
</script>

<style scoped lang="scss">
@import url('@/assets/css/commonHead.css');
</style>
