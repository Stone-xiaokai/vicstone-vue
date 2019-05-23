<template>
  <div class="app-container">
    <div class="total-layout" :model="orderCount">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <svg-icon icon-class="order" class="total-icon">
            </svg-icon>
            <div class="total-title">订单总数</div>
            <div class="total-value">{{orderCount}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{productCountDown}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{productCountOn}}</el-col>
                <!--<el-col :span="6" class="color-danger overview-item-value">50</el-col>-->
                <el-col :span="6" class="color-danger overview-item-value">{{productCount}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <!--<el-col :span="6" class="overview-item-title">库存紧张</el-col>-->
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <!--<el-col :span="6" class="color-danger overview-item-value">100</el-col>-->
                <!--<el-col :span="6" class="color-danger overview-item-value">200</el-col>-->
                <!--<el-col :span="6" class="color-danger overview-item-value">1000</el-col>-->
                <el-col :span="6" class="color-danger overview-item-value">{{userCount}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <!--<el-col :span="6" class="overview-item-title">今日新增</el-col>-->
                <!--<el-col :span="6" class="overview-item-title">昨日新增</el-col>-->
                <!--<el-col :span="6" class="overview-item-title">本月新增</el-col>-->
                <el-col :span="6" class="overview-item-title">用户注册</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistics-layout">
      <div class="layout-title">商品分类统计</div>
      <div id="myChart" :style="{width: '600px', height: '300px'}"></div>
    </div>
  </div>
</template>
<script>
  // import {orderCountreq} from '@/api/home';
  import {getMember,updateMember,orderCountreq,productCountByStatus,productCount,userCount,selectProductCountCate} from '@/api/member';
  export default {
    name: 'home',
    data() {
      return {
        orderCount:0,
        userCount:0,
        productCount:0,
        productCountDown:0,
        productCountOn:0,

      }
    },
    created(){
      // this.initOrderCountDate();
      this.getOrderCount();
    },
    mounted(){
      this.drawLine();
    },
    methods:{
      getOrderCount() {
        console.log("aaaaaaaaaaa");
        orderCountreq().then(response => {
          this.orderCount = response.data;
        });
        userCount().then(response => {
          this.userCount = response.data;
        });
        productCount().then(response => {
          this.productCount = response.data;
        });
        productCountByStatus("1").then(response => {
          this.productCountOn = response.data;
        });
        productCountByStatus("0").then(response => {
          this.productCountDown = response.data;
        });
        // selectProductCountCate().then(response => {
        //   console.log(response.data);
        //   this.productCateData = response.data;
        // });
      },
      async drawLine(){
        var productCateData=[];
        selectProductCountCate().then(response => {
          console.log(response.data);
          productCateData = response.data;
          console.log(productCateData);
          // this.productCateData = response.data;
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            // title:{
            //   text:'ECharts 数据统计'
            // },
            series:[{
              name:'访问量',
              type:'pie',
              radius:'60%',
              // data:[
              //   {value:0,name:'Android'},
              //   {value:200,name:'IOS'},
              //   {value:360,name:'PC'},
              //   {value:0,name:'Ohter'}
              // ]
              data:productCateData
            }]
          });
        });
      }
    }
  }

</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .total-layout {
  }

  .total-frame {
    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
    width: 590px;
  }
</style>
