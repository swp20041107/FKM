<template>
  <!-- 新手指南 -->
  <div class="records7">
    <!-- 头部start -->
    <div class="records7_header">
      <!-- 搜索 -->
      <el-input v-model="input" placeholder="请输入查询关键词" />
      <el-button type="primary">查询</el-button>
      <el-button type="primary">去添加</el-button>
    </div>
    <Table :tableColumn="tableColumn"></Table>
  </div>
</template>

<script setup lang="ts">
let input = ref('')
interface ITableColumn {
  id: number
  label: string
}
const tableColumn: ITableColumn[] = reactive([
  {
    id: 0,
    label: 'id'
  },
  {
    id: 1,
    label: '描述'
  },
  {
    id: 2,
    label: '图片'
  },
  {
    id: 3,
    label: '内容'
  },
  {
    id: 4,
    label: '操作'
  }
])
</script>

<style scoped lang="scss">
.records7 {
  @include wh(100%, 100%);
  &_header {
    margin-top: 30px;
    width: 100%;
    .el-input {
      @include wh(200px, 32px);
    }
    .el-button {
      margin-left: 20px;
      &:last-of-type {
        float: right;
      }
    }
  }
}
</style>
