<template>
  <div class="welcome">
    <el-container>
      <!-- 头部 -->
      <el-header>
        <div class="welcome_header_menu" @click="changeCollapse">
          <i class="iconfont icon-caidan"></i>
        </div>
        <div class="welcome_header_right">
          <img src="../assets/images/logo.png" alt="" />
          <div class="welcome_header_right_title">FKM后台管理系统</div>
          <div class="welcome_header_right_button" @click="logOut">退出登录</div>
        </div>
      </el-header>
      <!-- 下边 -->
      <el-container>
        <!-- 左边 -->
        <el-aside>
          <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>
        <!-- 右边 -->
        <el-main> <router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import useCommonState from '../stores/common'
const $route = useRoute()
const $router = useRouter()
const { isCollapse } = storeToRefs(useCommonState())

// 改变折叠状态
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value
}
// 退出登录
const logOut = () => {
  ElMessageBox.confirm('您是否确定退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('paths')
      $router.push({ name: 'login' })
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出'
      })
    })
}
watchEffect(() => {
  console.log($route)
})
</script>

<style scoped lang="scss">
.col {
  color: #2295ff;
}
.welcome {
  @include wh(100%, 100%);

  // 布局容器样式
  .el-container {
    @include wh(100%, 100%);
    .el-header {
      @include wh(100%, 60px);
      .welcome_header_menu {
        cursor: pointer;
        position: absolute;
        left: 0;
        top: 0;
        @include wh(46px, 32px);
        border: 1px solid #dddddd;
        border-radius: 2px;
        text-align: center;
        line-height: 32px;
        i {
          font-size: 16px;
        }
      }
      .welcome_header_right {
        float: right;
        margin-right: 25px;
        margin-top: 10px;
        @include wh(237px, 32px);
        img {
          float: left;
          @include wh(30px, 30px);
        }
        div {
          line-height: 32px;
        }
        &_title {
          margin-left: 5px;
          @include wh(110px, 100%);
          float: left;
        }
        &_button {
          float: right;
          @include wh(89px, 100%);
          border: 1px solid #dddddd;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
        }
      }
    }
    .el-aside {
      max-width: 123px;
      min-width: 64px;
      height: 100%;
      // @include wh(123px, 100%);
      box-sizing: border-box;
    }
    .el-main {
      width: 100%;
      height: 100%;
    }
  }
  // dialog样式
  :deep(.el-dialog__body) {
    text-align: center !important;
  }
}
</style>
