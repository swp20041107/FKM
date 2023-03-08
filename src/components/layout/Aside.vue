<template>
  <el-col>
    <el-menu
      :collapse="common.isCollapse"
      router
      background-color="#fff"
      class="el-menu-vertical-demo"
      :default-active="$route.path"
      unique-opened
    >
      <el-sub-menu v-for="item in oneMenu" :key="item.id" :index="String(item.id)">
        <template #title>
          <i :class="['iconfont', item.ico]"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="val in user.OWNPRIV(item.name)"
          :key="val.id"
          :index="val.url"
          :class="val.url === $route.path ? 'isactive' : ''"
          @click="look(val.url)"
        >
          <span>{{ val.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script setup lang="ts">
import useUserStore from '@/stores/user'
import useCommonStore from '@/stores/common'
const $route = useRoute()
const user = useUserStore()
const common = useCommonStore()
// 一级菜单
let oneMenu = reactive(user.power) as any[]
//
const look = (url: string) => {
  console.log(url)
}
</script>

<style scoped lang="scss">
i {
  font-size: 16px;
  margin-right: 5px;
}
.isactive {
  background-color: #e6f7ff !important;
  color: #409eff !important;
  border-right: 3px solid #0082ff;
  box-sizing: border-box;
}
.el-col {
  padding: 0;
  .el-menu {
    height: 100%;
    border-right: 1px solid #f1f1f1;

    .el-sub-menu {
      :deep(.el-sub-menu__title) {
        width: 100% !important;
        height: 60px !important;
        padding: 0 !important;
        padding-left: 15px !important;
        box-sizing: border-box;
        .el-icon {
          right: 15px;
          width: 12px;
          color: #000;
        }
        span {
          color: #000;
        }
      }
      :deep(ul.el-menu) {
        background-color: #fafafa !important;
        overflow: hidden;
        li.el-menu-item {
          &:first-of-type {
            margin-top: 10px;
          }
          &:last-of-type {
            margin-bottom: 10px;
          }
          height: 40px;
        }
      }
    }
  }
}
</style>
