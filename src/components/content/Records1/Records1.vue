<template>
  <div class="records1">
    <!-- 头部start -->
    <div class="records1_header">
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

    <!-- 表格start -->
    <Table v-if="flag" :tableData="data.tableData" :tableColumn="data.tableColumn">
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
        <span class="slot_button dele">删除</span>
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
    <RecordsDrawer :typeid="1" @done="done" :drawer="data.drawer"></RecordsDrawer>
  </div>
</template>

<script setup lang="ts">
// 全局
const proxy = getCurrentInstance()?.proxy
const api: any = proxy?.$api

let IMAGE_URL = import.meta.env.VITE_IMAGE_URL
// 数据
//#region
let data: any = reactive({
  drawer: false,
  tableData: [],
  counts: 0,
  tableColumn: [
    {
      id: 0,
      prop: 'id',
      label: 'id'
    },
    {
      id: 1,
      prop: 'title',
      isSlot: false,
      label: '标题'
    },
    {
      id: 2,
      prop: 'comment',
      isSlot: false,
      label: '描述'
    },
    {
      id: 3,
      prop: 'photo',
      isSlot: true,
      label: '图片',
      slotName: 'img'
    },
    {
      id: 4,
      prop: 'content',
      isSlot: false,
      label: '内容'
    },
    {
      id: 5,
      prop: '',
      isSlot: true,
      label: '操作',
      slotName: 'button'
    }
  ]
})
// 传参
let query = reactive({
  key: '',
  typeid: 0,
  page: 1,
  psize: 5
})
//#endregion

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

// 打开关闭添加或修改
//#region
const add = () => {
  data.drawer = true
}
// 关闭添加或修改
const done = (val: boolean) => {
  data.drawer = val
  getTable()
}
//#endregion
// 判断有无数据
let flag = $ref(false)
// 获取数据
//#region
const getTable = async () => {
  let res = await api.record.RecordsList(query)
  flag = true
  data.tableData = res.data.list
  data.counts = res.data.counts
}
getTable()
//#endregion

// 修改
const revise = (val: object) => {
  console.log(val)
}
</script>

<style scoped lang="scss">
.records1 {
  @include wh(100%, 100%);
  .revise {
    color: #0878ff;
    margin-right: 37px;
    cursor: pointer;
  }
  .dele {
    color: #ff3a3a;
    cursor: pointer;
  }
  &_header {
    margin-top: 30px;
    width: 100%;
    margin-bottom: 20px;
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
