<template>
  <!-- 大事记添加修改 抽屉效果 -->
  <div class="recordsDrawer">
    <el-drawer
      v-model="isDrawer"
      :before-close="handleClose"
      :title="props.reviseData.id ? '编辑' : '添加'"
      size="90%"
    >
      <!-- 表单start -->
      <el-form
        ref="drawerFormRef"
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
            method="post"
            accept=".png,.jpg"
            v-model:file-list="fileList"
            class="upload-demo"
            :action="UPLOAD_URL"
            :headers="headers"
            :data="dataImgs"
            :on-success="handleSuccess"
            list-type="picture"
          >
            <el-button type="primary">upload</el-button>
            <template #tip>
              <div class="el-upload__tip">只支持.png和.jpg格式图片</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            method="post"
            v-model:file-list="videoLists"
            accept=".mp4"
            class="upload-demo"
            :action="UPLOAD_URL"
            :headers="headers"
            :on-success="videoSuccess"
            list-type="picture"
          >
            <el-button type="primary">上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只支持.mp4格式视频</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情信息" prop="content">
          <el-input v-model="drawerForm.content" type="textarea" />
        </el-form-item>

        <el-form-item class="recordsDrawer_addLogo">
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
          <el-button type="primary" @click="submitForm(drawerFormRef)">提交</el-button>
        </el-form-item>
      </el-form>
      <!-- 表单end -->
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'
import type { IAddRecordType } from '@/types/records-type'
import useRecordStore from '@/stores/record' //通过pinia控制抽屉
const { isDrawer } = storeToRefs(useRecordStore()) as any

const props = defineProps({
  drawer: {
    type: Boolean,
    default: () => false
  },
  typeid: {
    type: Number,
    default: () => 0
  },
  // 修改
  reviseData: {
    type: Object,
    default: () => {}
  }
})

// 自定义事件
const emit = defineEmits(['clearRevise', 'getTable'])
const drawerFormRef = ref<FormInstance>()
const proxy = getCurrentInstance()?.proxy //api
const api: any = proxy?.$api //api
// 上传图片基础路径
let UPLOAD_URL = import.meta.env.VITE_UPLOAD_URL
// 图片显示基础路径
let IMAGE_URL = import.meta.env.VITE_IMAGE_URL
// 上传图片请求头
let headers = {
  Authorization: sessionStorage.getItem('token') || ''
}
// 表单数据
let drawerForm: IAddRecordType = reactive({
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
watchEffect(() => {
  // 当抽屉关闭时就将数据恢复初始样子
  if (isDrawer.value === false) {
    drawerForm = reactive({
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
  }
})

// logo图片只能一张
//#region
let logoList: any = $ref<UploadUserFile[]>([])
const logoSuccess: UploadProps['onSuccess'] = (e) => {
  drawerForm.photo = e.data
}
const logoExceed: UploadProps['onExceed'] = (e) => {
  ElMessage.warning('最多只能上传一张图片')
}
//#endregion
watchEffect(() => {
  // 如果有修改数据,就进行修改功能,否则就将id赋值为0进行添加功能
  props.reviseData.id ? (drawerForm = props.reviseData as IAddRecordType) : false
})
//pictures上传图片
//#region
// pictures接口
interface IObj {
  oldfilename?: string
  filename?: string
  file?: string
}
let dataImgs: IObj = reactive({
  file: ''
})

let fileList = $ref<UploadUserFile[]>([])
// 上传多张成功触发
const handleSuccess: UploadProps['onSuccess'] = (e) => {
  let obj: IObj = reactive({})
  dataImgs.file = e.data
  obj.oldfilename = e.data
  obj.filename = e.data
  drawerForm.pictures?.push(obj)
}
//#endregion

// 上传videos视频
//#region
const videoLists = $ref<UploadUserFile[]>([])
const videoSuccess: UploadProps['onSuccess'] = (e) => {
  let response = videoLists[0].response as any
  let obj: IObj = {}
  obj.oldfilename = e.data
  obj.filename = e.data
  drawerForm.videos?.push(obj)
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
      let res = await api.record.addRecords(drawerForm)
      if (res.errCode === 10000) {
        ElMessage.success('添加成功')
        isDrawer.value = false //抽屉隐藏
        emit('getTable')
        formEl.resetFields() //清空表单
        emit('clearRevise', {}) //清空修改数据 必须写在清空表单后面
        fileList = [] //清空图片
        logoList = []
        console.log('修改之后的表单', drawerForm)
      } else {
        ElMessage.error('添加失败')
      }
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
      isDrawer.value = false //抽屉隐藏
      drawerFormRef.value?.resetFields() //清空表单
      emit('clearRevise', {}) //清空修改数据
      fileList = []
      logoList = []
    })
    .catch(() => {
      // catch error
    })
}
//#endregion
console.log('表单', drawerForm)
</script>
<style lang="scss" scoped>
.recordsDrawer {
  // 抽屉
  :deep(.el-overlay) {
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
  // 添加logo
  &_addLogo {
    position: absolute;
    top: 20%;
    left: 30%;
  }
}
</style>
