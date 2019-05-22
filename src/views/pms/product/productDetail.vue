<template>
  <!--<el-card class="form-container" shadow="never">-->
    <!--<el-form :model="productDetail" ref="brandFrom" label-width="150px">-->
      <!--<el-form-item label="用户密码：">-->
        <!--<el-input v-model="productDetail.productName"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="用户联系方式：">-->
        <!--<el-input v-model="productDetail.productBrand"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="用户地址：">-->
        <!--<el-input v-model="productDetail.productPrice"></el-input>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
  <!--</el-card>-->
  <el-card shadow="never" class="standard-margin">
  <span class="font-title-medium">物品详细信息</span>
  <div class="form-container-border">
    <el-row>
      <el-col :span="6" class="form-border form-left-bg font-small">物品编号</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productId}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品名称</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productName}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品品牌</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productBrand}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品价格（单位￥）</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productPrice}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品类别</el-col>
      <el-col class="form-border font-small" :span="18">{{productCateSmall}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品所在地</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productAddress}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品发布者</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.userName}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品状态</el-col>
      <el-col class="form-border font-small" :span="18">{{productStatus}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6">物品描述</el-col>
      <el-col class="form-border font-small" :span="18">{{productDetail.productText}}</el-col>
    </el-row>
    <el-row>
      <el-col class="form-border form-left-bg font-small" :span="6" style="height:100px;line-height:80px">凭证图片
      </el-col>
      <el-col class="form-border font-small" :span="18" style="height:100px">
        <img v-for="item in proofPics" style="width:80px;height:80px" :src="getImgUrl(item)">
      </el-col>
    </el-row>
  </div>
  </el-card>
</template>

<script>
  import {
    productCateSmall
  } from '@/api/product'
  const defaultProduct={
    productId: 0,
    productName: '',
    productBrand: '',
    productPrice: '',
    productAddress: '',
    productText: '',
    productSrcOne: '',
    productSrcTwo: '',
    productSrcThree: '',
    productStatus: '',
    productUserId: '',
    userName:'',
    productCateSmallName:''
  };
    export default {
        name: "productDetail",

      data() {
        return {
          productDetail: Object.assign({}, defaultProduct),
          proofPics: [],
          productCateSmall:'',
          productStatus:''
        }
      },
      created() {
        this.getCateSmall();
        this.getProductStatus();
            this.productDetail = this.$route.query.row;
            this.proofPics.push(this.$route.query.row.productSrcOne);
            this.proofPics.push(this.$route.query.row.productSrcTwo);
            this.proofPics.push(this.$route.query.row.productSrcThree);

      },
      methods: {
        getImgUrl(icon){
          return "http://localhost:8088/image"+icon;
        },
        getCateSmall(){
          productCateSmall(this.$route.query.row.productSmallCategoryId).then(response => {
            this.productCateSmall = response.data.name;
          });
        },
        getProductStatus(){
         if(this.$route.query.row.productStatus==1||this.$route.query.row.productStatus=="1"){
           this.productStatus = "在上架"
         } else {
           this.productStatus = "在下架"
         }
        }
      }
    }
</script>

<style scoped>
  .detail-container {
    position: absolute;
    left: 0;
    right: 0;
    width: 1080px;
    padding: 35px 35px 15px 35px;
    margin: 20px auto;
  }

  .standard-margin {
    margin-top: 15px;
  }
  .form-border {
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: 10px;
  }

  .form-container-border {
    border-left: 1px solid #DCDFE6;
    border-top: 1px solid #DCDFE6;
    margin-top: 15px;
  }

  .form-left-bg {
    background: #F2F6FC;
  }
</style>
