<template>
  <div class="welcome">
    <el-container>
      <!-- 头部 -->
      <el-header>
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
          <Aside></Aside>
        </el-aside>
        <!-- 右边 -->
        <el-main> <router-view></router-view> </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import useUserState from '../stores/user'
const $route = useRoute()
const $router = useRouter()
const user = useUserState()

// 退出登录
const logOut = () => {
  ElMessageBox.confirm('您是否确定退出登录', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      sessionStorage.removeItem('user')
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
// console.log(user.)
watchEffect(() => {
  console.log($route)
})
</script>

<style scoped lang="scss">
.welcome {
  @include wh(100%, 100%);
  // 布局容器样式
  .el-container {
    @include wh(100%, 100%);
    .el-header {
      @include wh(100%, 60px);
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
        }
      }
    }
    .el-aside {
      @include wh(123px, 100%);
      border-right: 1px solid #f1f1f1;
      box-sizing: border-box;
    }
  }
  // dialog样式
  ::v-deep .el-dialog__body {
    text-align: center !important;
  }
}
</style>
