<template>
  <div>
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <template v-for="item in tableColumn" :key="item.id">
        <el-table-column
          align="center"
          v-if="!item.isSlot"
          :label="item.label"
          :property="item.prop"
        >
        </el-table-column>
        <el-table-column align="center" v-else :label="item.label">
          <slot name="button" :data="item"></slot>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
interface ITableColumn {
  id: number
  prop: string
  label: string
  isSlot: boolean
}
const props = defineProps({
  tableColumn: {
    type: Array<ITableColumn>,
    default: () => []
  },
  tableData: {
    type: Array
  }
})
interface User {
  date: string
  name: string
  address: string
}
let multipleSelection = $ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection = val
}
</script>

<style scoped></style>
