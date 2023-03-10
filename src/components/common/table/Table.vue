<template>
  <div>
    <el-table
      v-loading="loading"
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
          <template #default="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script setup lang="ts">
interface ITableColumn {
  id: number
  prop?: string
  label: string
  isSlot: boolean
  slotName?: string
}
const props = defineProps({
  tableColumn: {
    type: Array<ITableColumn>,
    default: () => []
  },
  tableData: {
    type: Array
  },
  loading: {
    type: Boolean,
    default: () => true
  }
})
interface User {
  date: string
  name: string
  address: string
}
console.log(props.loading)

let multipleSelection = $ref<User[]>([])
const handleSelectionChange = (val: User[]) => {
  multipleSelection = val
}
</script>

<style scoped></style>
