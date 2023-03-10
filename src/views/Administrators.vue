<template>
  <!-- 管理员信息 -->
  <div class="administrators">
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

    <!-- 表格start -->
    <Table :loading="data.loading" :tableData="data.tableData" :tableColumn="data.tableColumn">
      <template #button="val">
        <span class="slot_button revise" @click="revise(val.data)">编辑</span>
        <span class="slot_button dele" @click="dele(val.data)">删除</span>
      </template>
    </Table>
    <!-- 表格end -->

    <!-- 分页 -->
    <Pagination
      @changePage="changePage"
      @changePsize="changePsize"
      :query="data.query"
      :counts="data.counts"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import type { IAdminDataType } from '@/types/admin-type'
import type { Response } from '@/types/common-type'
import api from '@/api/index'

const router = useRouter()

// 数据
let data = reactive({
  loading: true,

  query: {
    //请求参数
    key: '',
    page: 1,
    psize: 5
  },
  // 表格数据
  tableData: [] as [] | undefined,
  counts: 0 as number | undefined,
  // 表格列
  tableColumn: [
    {
      id: 0,
      prop: 'id',
      label: 'id',
      isSlot: false
    },
    {
      id: 1,
      prop: 'username',
      label: '名称',
      isSlot: false
    },
    {
      id: 2,
      prop: 'tel',
      label: '手机号',
      isSlot: false
    },
    {
      id: 3,
      label: '操作',
      isSlot: true,
      slotName: 'button'
    }
  ]
})

// 获取表格数据
//#region
const getTable = async () => {
  data.loading = true
  let res: Response<IAdminDataType> = await api.admin.Admin(data.query)
  if (res.errCode === 10000) {
    data.tableData = res.data?.list
    data.counts = res.data?.counts
  } else {
    ElMessage.error(res.errMsg)
  }
  data.loading = false
}
getTable()
//#endregion

const revise = (val: any) => {}
const dele = (val: any) => {}
// 添加管理员
const add = () => {
  router.push({ name: 'AdministratorAdd' })
}
// 更改页数
//#region
const changePage = (val: number) => {
  data.query.page = val
  getTable()
}
const changePsize = (val: number) => {
  data.query.psize = val
  getTable()
}
//#endregion
</script>

<style scoped lang="scss">
@import url('@/assets/css/commonHead.css');
</style>
