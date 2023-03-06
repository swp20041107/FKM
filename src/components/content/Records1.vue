<template>
  <div class="records1">
    <!-- 头部start -->
    <div class="records1_header">
      <!-- 搜索 -->
      <el-input v-model="input" placeholder="请输入查询关键词" />
      <el-button type="primary">查询</el-button>
      <el-button type="primary">去添加</el-button>
    </div>
    <Table :tableData="data.tableData" :tableColumn="data.tableColumn">
      <template #button="val">
        <span class="slot_button revise" @click="revise(val.data)">编辑</span>
        <span class="slot_button dele">删除</span>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
const proxy = getCurrentInstance()?.proxy
const api: any = proxy?.$api
let input = ref('')
let data: any = reactive({
  tableData: [],
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
      isSlot: false,
      label: '图片'
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
      label: '操作'
    }
  ]
})
const revise = (val: object) => {
  console.log(val)
}
// 获取表格数据
const getTable = async () => {
  let res = await api.record.RecordsList()
  data.tableData = res.data.list
}
getTable()
</script>

<style scoped lang="scss">
.records1 {
  @include wh(100%, 100%);
  .revise {
    color: #0878ff;
    margin-right: 37px;
  }
  .dele {
    color: #ff3a3a;
  }
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
