<template>
  <el-col>
    <el-menu
      background-color="#fff"
      class="el-menu-vertical-demo"
      default-active="1"
      unique-opened
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu v-for="item in oneMenu" :key="item.id" :index="String(item.id)">
        <template #title>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="val in user.OWNPRIV(item.name)"
          :key="val.id"
          :index="String(val.id)"
          @click="look(val.url)"
          >{{ val.name }}
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-col>
</template>

<script setup lang="ts">
import prive from '@/untils/prive'

import useUserStore from '@/stores/user'
const user = useUserStore()

// 一级菜单
let oneMenu = reactive(user.power) as any[]
// 大事记功能
let matter = prive.getownpriv('大事记')
console.log(matter)
//
const look = (url: string) => {
  console.log(url)
}
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.el-col {
  @include wh(100%, 100%);
  padding: 0;
  .el-menu {
    border: none !important;
    .el-sub-menu {
      ::v-deep .el-sub-menu__title {
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
      ::v-deep ul.el-menu {
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
