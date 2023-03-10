<template>
  <div class="productAdd">
    <el-form
      ref="productFormRef"
      :model="data.productForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      size="default"
      status-icon
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="data.productForm.name" />
      </el-form-item>
      <el-form-item label="描述" prop="comment">
        <el-input v-model="data.productForm.comment" />
      </el-form-item>
      <el-form-item label="商品分类" prop="catid">
        <el-select v-model="data.productForm.catid" placeholder="请选择商品分类">
          <el-option
            v-for="item in data.productType"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="封面图片">
        <el-upload :action="data.UPLOAD_URL" :on-success="logoSuccess" list-type="picture-card">
          <i class="iconfont icon-24px"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="规格">
        <div class="productAdd_norms">
          <ul>
            <li>颜色</li>
            <li>尺寸</li>
            <li>价格</li>
            <li>图片</li>
            <li>
              <span @click="addLine">+</span>
            </li>
          </ul>
          <ul v-for="(item, index) in data.productForm.pictures" :key="item.id">
            <li>
              <el-select v-model="data.selectColor[index]" placeholder="请选择商品分类">
                <el-option
                  v-for="item in data.color"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title"
                />
              </el-select>
            </li>
            <li>
              <el-select v-model="data.selectSize[index]" placeholder="请选择商品分类">
                <el-option
                  v-for="item in data.size"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title"
                />
              </el-select>
            </li>
            <li>
              <el-input
                v-model="data.productForm.pictures[index].price"
                placeholder="价格"
              ></el-input>
            </li>
            <li>
              <el-upload
                class="upload-demo"
                @click="uploadPicturesI(index)"
                :action="data.UPLOAD_URL"
                :on-success="picturesImg"
              >
                <el-button
                  style="background-color: #fff; border: 1px solid #dcdfe6; color: #000"
                  type="primary"
                  >图片</el-button
                >
              </el-upload>
            </li>
            <li>
              <span @click="deleLine(item.id)">-</span>
            </li>
          </ul>
        </div>
      </el-form-item>
      <el-button type="primary" @click="submitForm(productFormRef)"> Create </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import api from '@/api/index'
import type { IProductTypeDataType } from '@/types/product-type'
import type { Response } from '@/types/common-type'
import type { FormInstance, FormRules, UploadProps, UploadUserFile } from 'element-plus'

const productFormRef = ref<FormInstance>()

//商品类型接口
interface IProductType {
  id: number
  pid: number
  name: string
}
// 商品规格返回接口
interface INorms {
  id: number
  title: string
  pid: number
  sort: number
}
// 数据
let data = reactive({
  UPLOAD_URL: import.meta.env.VITE_UPLOAD_URL,
  // 表单数据
  productForm: {
    name: '',
    comment: '',
    catid: '',
    photo: '',
    pictures: [
      {
        id: 0,
        price: '',
        pic: '',
        proPackage: '',
        proPackageIds: ''
      },
      {
        id: 1,
        price: '',
        pic: '',
        proPackage: '',
        proPackageIds: ''
      }
    ]
  },
  // 颜色
  color: [] as Array<INorms>,
  selectColor: [],
  // 尺码
  size: [] as Array<INorms>,
  selectSize: [],
  productType: [] as Array<IProductType> | undefined
})
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  comment: [{ required: true, message: '请描述', trigger: 'blur' }],
  catid: [{ required: true, message: '请选择商品类型', trigger: 'change' }]
})

// 获取商品类型和获取商品规格
//#region
const getProductType = async () => {
  let res: Response<IProductTypeDataType> = await api.product.productType({ page: 1, psize: 2 })
  data.productType = res.data?.list
}
getProductType()
// 获取商品规格
const getProductNorms = async () => {
  let res: Response<IProductTypeDataType> = await api.product.productNorms({ page: 1, psize: 9 })
  res.data?.list.forEach((item: INorms) => {
    if (item.pid === 1) {
      data.color.push(item)
    } else if (item.pid === 2) {
      data.size.push(item)
    }
  })
}
getProductNorms()
//#endregion

//上传封面图片
// 成功回调
const logoSuccess: UploadProps['onSuccess'] = (e) => {
  data.productForm.photo = e.data
}
// 上传商品图片下标
let uploadPicturesIndex: number = $ref(0)
// 上传商品图片方法
const uploadPicturesI = (index: number) => {
  console.log(index)
  uploadPicturesIndex = index
}
// 上传商品图片
const picturesImg: UploadProps['onSuccess'] = (e) => {
  console.log(uploadPicturesIndex)

  data.productForm.pictures[uploadPicturesIndex].pic = e.data
}

// 添加一行和删除一行
//#region
const addLine = () => {
  let obj = {
    id: new Date().getTime(),
    price: '',
    pic: '',
    proPackage: '',
    proPackageIds: ''
  }
  data.productForm.pictures.push(obj)
}
// 删除一行
const deleLine = (id: number) => {
  // 查找id一样的元素将它进行删除
  let arr = data.productForm.pictures.filter((item) => {
    return item.id === id
  })
  let index = data.productForm.pictures.indexOf(arr[0])
  data.productForm.pictures.splice(index, 1)
}
//#endregion

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  //商品规格
  let pictures = data.productForm.pictures
  let isMessage = false
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 如果没有商品规格就提示必须要添加
      if (pictures.length < 1) {
        ElMessage.warning('请选择商品规格')
      } else {
        //有商品规格就判断他是否选择了
        // 遍历总行数  将每行的颜色和尺码加起来就是每一行的规格
        pictures.forEach((item, index) => {
          //将每一行选择的规格和颜色拼接起来
          let proPackage = (data.selectColor[index] + data.selectSize[index]).toString()
          // 放到请求的参数中
          pictures[index].proPackage = proPackage
          // 如果没有选择颜色或者规格就提示选择
          if (!pictures[index].proPackage || pictures[index].proPackage === 'NaN') {
            isMessage = true
          } else {
            isMessage = false
          }
        })
        if (isMessage === true) {
          ElMessage.warning('请选择颜色或尺码')
        }
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style lang="scss" scoped>
.productAdd {
  @include wh(100%, 100%);
  &_norms {
    @include wh(100%, 40px);
    background-color: #fafafa;
    ul {
      @include wh(100%, 100%);
      display: flex;
      li {
        text-align: center;
        line-height: 40px;
        @include wh(200px, 100%);
        &:last-of-type {
          display: flex;
          align-items: Center;
          justify-content: center;
          font-size: 20px;
          font-weight: bold;
          span {
            @include wh(20px, 20px);
            cursor: pointer;
            border: 1px solid #000;
            display: inline-block;
            line-height: 20px;
          }
        }
      }
    }
  }
}
</style>
