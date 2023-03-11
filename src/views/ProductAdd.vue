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
        <el-upload
          v-model:file-list="logoList"
          :action="data.UPLOAD_URL"
          :on-success="logoSuccess"
          list-type="picture-card"
        >
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
          <ul v-for="(item, index) in data.productForm.prices" :key="item.id">
            <li>
              <el-select v-model="data.selectColor[index]" placeholder="请选择颜色">
                <el-option
                  v-for="item in data.color"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title"
                />
              </el-select>
            </li>
            <li>
              <el-select v-model="data.selectSize[index]" placeholder="请选择尺码">
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
                v-model="data.productForm.prices[index].price"
                placeholder="价格"
              ></el-input>
            </li>
            <li>
              <el-upload
                v-if="!item.pic"
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
              <div class="img" v-else>
                <img :src="data.IMAGE_URL + item.pic" alt="" />
                <i @click="deleProductImg(index)" class="iconfont icon-guanbixiao"></i>
              </div>
            </li>
            <li>
              <span @click="deleLine(index)">-</span>
            </li>
          </ul>
        </div>
      </el-form-item>

      <el-form-item label="排序" prop="displayOrder">
        <el-input v-model="data.productForm.displayOrder" />
      </el-form-item>

      <el-form-item label="商品介绍" prop="info">
        <el-input v-model="data.productForm.info" />
      </el-form-item>

      <el-form-item>
        <el-upload
          v-model:file-list="picturesList"
          class="upload-demo"
          :action="data.UPLOAD_URL"
          :on-success="picturesSuccess"
          multiple
          :limit="3"
        >
          <el-button type="primary">图片上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item> </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(productFormRef)"> 提交 </el-button>
      </el-form-item>
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
  UPLOAD_URL: import.meta.env.VITE_UPLOAD_URL, //上传基础路径
  IMAGE_URL: import.meta.env.VITE_IMAGE_URL, //图片显示基础路径
  // 表单数据
  productForm: {
    id: 0,
    info: '',
    name: '',
    comment: '',
    catid: '',
    photo: '',
    displayOrder: '',
    videos: [] as Array<object>,
    pictures: [] as Array<object>,
    prices: [
      {
        id: 0,
        price: '',
        pic: '',
        proPackage: '',
        proPackageIds: '3,7'
      },
      {
        id: 1,
        price: '',
        pic: '',
        proPackage: '',
        proPackageIds: '3,7'
      }
    ]
  },
  // 颜色
  color: [] as Array<INorms>,
  selectColor: [] as Array<string>,
  // 尺码
  size: [] as Array<INorms>,
  selectSize: [] as Array<string>,
  productType: [] as Array<IProductType> | undefined
})
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  comment: [{ required: true, message: '请描述', trigger: 'blur' }],
  catid: [{ required: true, message: '请选择商品类型', trigger: 'change' }],
  displayOrder: [{ required: true, message: '请输入排序顺序', trigger: 'blur' }],
  info: [{ required: true, message: '请介绍商品', trigger: 'blur' }]
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
let logoList: any = $ref<UploadUserFile[]>([])
const logoSuccess: UploadProps['onSuccess'] = (e) => {
  data.productForm.photo = e.data
}

// 规格相关功能
//#region
// 上传商品图片下标
let uploadPicturesIndex: number = $ref(0)
// 上传商品图片方法
const uploadPicturesI = (index: number) => {
  uploadPicturesIndex = index
}
// 上传商品图片
const picturesImg: UploadProps['onSuccess'] = (e) => {
  data.productForm.prices[uploadPicturesIndex].pic = e.data
}
// 删除商品图片
const deleProductImg = (i: number) => {
  data.productForm.prices[i].pic = ''
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
  data.productForm.prices.push(obj)
}
// 删除一行
const deleLine = (index: number) => {
  data.selectColor.splice(index, 1)
  data.selectSize.splice(index, 1)
  data.productForm.prices.splice(index, 1)
}
//#endregion
//#endregion

// 图片上多多张
const picturesList = ref<UploadUserFile[]>([])
const picturesSuccess: UploadProps['onSuccess'] = (e) => {
  console.log(e)
  let obj = {
    filename: ''
  }
  obj.filename = e.data
  data.productForm.pictures.push(obj)
}

// 提交
const submitForm = async (formEl: FormInstance | undefined) => {
  //商品规格
  let pictures = data.productForm.prices
  let isMessage = false

  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // 如果没有商品规格就提示必须要添加
      if (pictures.length < 1) {
        ElMessage.warning('请选择商品规格')
      } else {
        //有商品规格就判断他是否选择了
        // 遍历总行数  将每行的颜色和尺码加起来就是每一行的规格，并对其进行验证
        pictures.forEach((item, index) => {
          //将每一行选择的规格和颜色拼接起来
          let proPackage = (data.selectColor[index] + data.selectSize[index]).toString()
          // 放到请求的参数中
          pictures[index].proPackage = proPackage
          // 如果没有选择颜色规格、价格图片就提示选择
          if (
            !pictures[index].proPackage ||
            pictures[index].proPackage === 'NaN' ||
            data.selectColor[index] == '' ||
            data.selectColor[index] == undefined ||
            data.selectSize[index] == undefined ||
            data.selectSize[index] == '' ||
            !pictures[index].pic ||
            !pictures[index].price
          ) {
            isMessage = true
          } else {
            isMessage = false
          }
        })
        // 如果有一项没选就弹框提示
        if (isMessage === true) {
          ElMessage.warning('请选择颜色或尺码并填写价格上传图片')
        } else {
          console.log(data.productForm)
          //验证通过就请求接口
          let res = await api.product.productAdd(data.productForm)
          if (res.errCode === 10000) {
            ElMessage.success('添加成功')
            formEl.resetFields() //清空表单移除验证
            logoList = [] //清空封面图片
            data.selectColor = []
            data.selectSize = []
            // 清空表单
            data.productForm = reactive({
              id: 0,
              info: '',
              name: '',
              comment: '',
              catid: '',
              photo: '',
              displayOrder: '',
              videos: [] as Array<object>,
              pictures: [] as Array<object>,
              prices: [
                {
                  id: 0,
                  price: '',
                  pic: '',
                  proPackage: '',
                  proPackageIds: '3,7'
                },
                {
                  id: 1,
                  price: '',
                  pic: '',
                  proPackage: '',
                  proPackageIds: '3,7'
                }
              ]
            })
          }
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
  .el-form {
    .el-form-item {
      width: 50%;
      .productAdd_norms {
        width: 100%;
        ul {
          width: 100%;
          display: flex;
          &:first-of-type {
            background-color: #fafafa;
          }
          li {
            text-align: center;
            line-height: 40px;
            width: 116px;
            img {
              @include wh(40px, 40px);
            }
            .img {
              position: relative;
              i {
                @include wh(16px, 16px);
                position: absolute;
                top: -10px;
                right: 20%;
              }
            }
            // @include wh(116px, 100%);
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
  }
}
</style>
