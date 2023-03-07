<template>
  <el-pagination
    v-model:page-size="query.psize"
    :page-sizes="[5, 10, 15, 20]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="total, sizes, prev, pager, next, jumper"
    :total="counts"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
const emit = defineEmits(['changePage', 'changePsize'])
const props = defineProps({
  query: {
    type: Object,
    default: () => {}
  },
  counts: {
    type: Number,
    default: () => 0
  }
})
const pageSize4 = $ref(100)
const small = $ref(false)
const disabled = $ref(false)
const background = $ref(false)
const handleSizeChange = (val: number) => {
  emit('changePsize', val)
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  emit('changePage', val)
  console.log(`current page: ${val}`)
}
</script>

<style scoped lang="scss">
.el-pagination {
  width: 550px;
  margin: 0 auto;
  margin-top: 30px;
  padding-bottom: 20px;
}
</style>
