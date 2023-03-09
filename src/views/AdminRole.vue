<template>
  <div class="adminRole">
    <div class="adminRole_header">
      <el-button type="primary">去添加</el-button>
    </div>
    <!-- <Table :tableColumn="tableColumn" :tableData="tableData"></Table> -->
  </div>
</template>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
const api: any = proxy?.$api
const tableColumn = reactive([
  {
    id: 0,
    label: 'id'
  },
  {
    id: 1,
    label: '名称'
  },
  {
    id: 2,
    label: '操作'
  }
])
let tableData = reactive([])
const getAdministratorrole = async () => {
  let res = await api.admin.Administratorrole()
  console.log(res)
  console.log('成功了')
  tableData = res.data.list
}
getAdministratorrole()
</script>

<style scoped lang="scss">
.adminRole {
  @include wh(100%, 100%);
  &_header {
    width: 100%;
    .el-button {
      float: right;
    }
  }
}
</style>
