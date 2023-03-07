<template>
  <!-- 抽屉效果 -->
  <div class="recordsDrawer">
    <el-drawer v-model="props.drawer" :before-close="handleClose" title="添加" size="90%">
      <!-- 表单start -->
      <el-form
        ref="ruleFormRef"
        :model="drawerForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="drawerForm.title" />
        </el-form-item>
        <el-form-item label="描述" prop="comment">
          <el-input v-model="drawerForm.comment" />
        </el-form-item>
        <el-form-item label="封面图片">
          <el-upload
            v-model:file-list="fileList"
            class="upload-demo"
            :action="UPLOAD_URL"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button type="primary">upload</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item label="详情信息" prop="content">
          <el-input v-model="drawerForm.content" type="textarea" />
        </el-form-item>

        <el-form-item>
          <el-upload
            method="post"
            :headers="headers"
            :limit="1"
            :on-success="logoSuccess"
            :on-exceed="logoExceed"
            v-model:file-list="logoList"
            :action="UPLOAD_URL"
            list-type="picture-card"
          >
            <i class="iconfont icon-24px"></i>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单end -->
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
const proxy = getCurrentInstance()?.proxy
const api: any = proxy?.$api
// 上传图片基础路径
let UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL

let headers = {
  Authorization: JSON.parse(sessionStorage.getItem('user') || '').token || ''
}
const props = defineProps({
  drawer: {
    type: Boolean,
    default: () => false
  },
  typeid: {
    type: Number,
    default: () => 0
  }
})
// 自定义事件
const emit = defineEmits(['done'])

// 表单数据
let drawerForm = reactive({
  id: 0,
  typeid: props.typeid,
  photo: '',
  title: '',
  comment: '',
  content: '',
  state: 0,
  addtime: new Date().toLocaleString(),
  videos: [] as Array<IObj>,
  pictures: []
})

// logo图片只能一张
//#region
let logoList = $ref<UploadUserFile[]>([])
const logoSuccess: UploadProps['onSuccess'] = (e) => {
  drawerForm.photo = e.data[0].url
}
const logoExceed: UploadProps['onExceed'] = (e) => {
  ElMessage.warning('最多只能上传一张图片')
}
//#endregion

// videos上传图片
//#region
// videos接口
interface IObj {
  oldfilename?: string
  filename?: string
}
let fileList = $ref<UploadUserFile[]>([])
// 上传多张成功触发
const handleSuccess: UploadProps['onSuccess'] = (e) => {
  let obj: IObj = {}
  e.data.forEach((item: any) => {
    obj.oldfilename = item.url
    obj.filename = item.url
    drawerForm.videos.push(obj)
  })
}
//#endregion
// 验证
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  comment: [{ required: true, message: '请描述', trigger: 'blur' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
})

// 点击确认提交
//#region
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log(drawerForm)
      let res = await api.record.addRecords(drawerForm)
      res.errCode === 10000 ? ElMessage.success('添加成功') : ElMessage.error('添加失败')
      formEl.resetFields() //清空表单
      fileList = []
      logoList = []
    } else {
      console.log('error submit!')
    }
  })
}
//#endregion

// 点击叉号关闭的时候
//#region
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('请问您确定要关闭吗?')
    .then(() => {
      emit('done', false)
    })
    .catch(() => {
      // catch error
    })
}
//#endregion
</script>
<style lang="scss" scoped>
.recordsDrawer {
  // 抽屉
  ::v-deep .el-overlay {
    .el-drawer {
      .el-drawer__header {
        // 标题大小
        .el-drawer__title {
          font-size: 16px !important;
          color: #000;
        }
      }
    }
  }

  // 表单
  .el-form {
    @include wh(275px, 337px);
  }
}
</style>
