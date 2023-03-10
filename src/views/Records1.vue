<template>
  <!-- 作品管理 -->
  <div class="records1">
    <!-- 头部start -->
    <div class="records_header">
      <!-- 搜索 -->
      <el-input
        v-model="query.key"
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
      <template #img="val">
        <el-image
          lazy
          style="width: 100px; height: 100px"
          :src="IMAGE_URL + val.data.photo"
          fit="cover"
        />
      </template>
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
      :counts="data.counts"
      :query="query"
    ></Pagination>

    <!-- 添加或修改 -->
    <RecordsDrawer
      @getTable="getTable"
      :reviseData="data.reviseData"
      :typeid="1"
      @clearRevise="clearRevise"
    ></RecordsDrawer>
  </div>
</template>

<script setup lang="ts">
import useRecordData from '@/hooks/useRecordData'
import useRecordStore from '@/stores/record' //通过抽屉控制pinia
let { isDrawer } = storeToRefs(useRecordStore())
const IMAGE_URL = import.meta.env.VITE_IMAGE_URL

// 数据
//#region
let data: any = reactive({
  loading: true,
  tableData: [],
  counts: 0,
  reviseData: {},
  tableColumn: []
})
// 传参
let query = reactive({
  key: '',
  typeid: 1,
  page: 1,
  psize: 5
})
//#endregion

// 给表格列表赋值
data.tableColumn = useRecordData.tableColumn

// 获取数据
//#region
// 判断有无数据
const getTable = async () => {
  data.loading = true
  let res = await useRecordData.getTable(query)
  data.tableData = res.tableData
  data.counts = res.counts
  data.loading = false
}
getTable()
//#endregion

const add = () => {
  isDrawer.value = true
}

// 更改页数
//#region
const changePage = (val: number) => {
  query.page = val
  getTable()
}
const changePsize = (val: number) => {
  query.psize = val
  getTable()
}
//#endregion
// 删除
//#region
interface IDeleValType {
  id: number
}
const dele = async (val: IDeleValType) => {
  let res = await useRecordData.dele(val.id, query)
  data.tableData = res?.tableData
  data.counts = res?.counts
}
//#endregion

// 修改
const revise = (val: any) => {
  isDrawer.value = true //抽屉显示
  data.reviseData = val
  if (val.pictures === null && val.videos == null) {
    data.reviseData.pictures = []
    data.reviseData.videos = []
  } else if (val.videos === null) {
    data.reviseData.videos = []
  } else if (val.pictures === null) {
    data.reviseData.pictures = []
  }
}
// 清空修改
const clearRevise = (val: object) => {
  data.reviseData = val
}
</script>

<style scoped lang="scss">
@import url('@/assets/css/commonHead.css');
.records1 {
  @include wh(100%, 100%);
}
</style>
