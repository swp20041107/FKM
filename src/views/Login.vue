<template>
  <!-- 登录页面 -->
  <div class="login">
    <!-- 登录盒子 -->
    <div class="login_pass">
      <!-- 标题 -->
      <div class="login_pass_title">
        <span>密码登录</span>
      </div>
      <!-- 表单 -->
      <el-form :model="data.query">
        <el-form-item>
          <el-input v-model="data.query.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="data.query.pass" @keydown.enter="login"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="login">{{ isShow ? '登陆中...' : '登录' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/index'
import { debounce } from '@/untils/common'
import prive from '../untils/prive'
// pinia
import useUserStore from '@/stores/user'
const user = useUserStore()

// 路由跳转
const $router = useRouter()
let data = reactive({
  query: {
    username: '',
    pass: ''
  }
})

//#region
let isShow: boolean = $ref(false)
const login = () => {
  debounce(async () => {
    isShow = true
    let res: any = await api.login.Login(data.query)
    if (res.errCode === 10000) {
      // token存入pinia
      // user.token = res.data.token
      sessionStorage.setItem('token', res.data.token)
      user.menus = res.data.menu
      $router.push({ name: 'welcome' })
      // 处理url
      let paths = prive.getpaths(res.data.menu)
      sessionStorage.setItem('paths', JSON.stringify(paths))
    } else {
      ElMessage.error(res.errMsg)
    }
    isShow = false
  })
}
//#endregion
</script>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100%;
  background-color: #666666;

  &_pass {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    width: 655px;
    height: 445px;
    background-color: #fff;
    &_title {
      width: 100%;
      height: 105px;
      line-height: 105px;
      font-size: 27px;
      padding-left: 29px;
      box-sizing: border-box;
      span {
        font-weight: bold;
      }
    }
    .el-form {
      width: 365px;
      height: 175px;
      margin: 0 auto;
      margin-top: 40px;
      .el-form-item {
        margin-bottom: 37px;
        :deep(.is-focus) {
          box-shadow: 0 0 0 1px #fe4366 inset !important;
        }
        button {
          width: 100%;
          height: 40px;
          background-color: #fe4366;
        }
      }
    }
  }
}
</style>
