<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table ref="productCateTable"
                style="width: 100%"
                :data="list"
                v-loading="listLoading" border>
        <el-table-column label="编号" width="150" align="center">
          <template slot-scope="scope">{{scope.row.productId}}</template>
        </el-table-column>
        <el-table-column label="物品名称" align="center">
          <template slot-scope="scope">{{scope.row.productName}}</template>
        </el-table-column>
        <el-table-column label="物品所在地" width="300" align="center">
          <template slot-scope="scope">{{scope.row.productAddress}}</template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center">
          <template slot-scope="scope">
            <!--<el-button-->
              <!--size="mini"-->
              <!--:disabled="scope.row.level | disableNextLevel"-->
              <!--@click="handleShowNextLevel(scope.$index, scope.row)">转移-->
            <!--</el-button>-->
            <el-button
            size="mini"
            @click="showLogisticsDialog(scope.row.productId)">转移商品
            </el-button>
          </template>
        </el-table-column>
        <!--<el-table-column label="操作" width="250" align="center">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button-->
        <!--size="mini"-->
        <!--type="danger"-->
        <!--@click="handleDelete(scope.$index, scope.row)">删除-->
        <!--</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.pageNum"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog title="转移商品"
               :visible.sync="markOrderDialogVisible"
               width="40%">
      <!--<el-form :model="markInfo"-->
               <!--label-width="150px">-->
        <!--<el-form-item label="操作备注：">-->
          <!--<el-input v-model="markInfo.note" type="textarea" rows="3">-->
          <!--</el-input>-->
        <!--</el-form-item>-->
      <!--</el-form>-->
      <el-cascader
      clearable
      v-model="selectProductCateValue"
      :options="productCateOptions">
      </el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleMarkOrder">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>
<script>
  import {fetchListProduct,deleteProductCate,updatePublishCate,updateShowStatus,updateNavStatus} from '@/api/productCate'
  import {fetchListWithChildren} from '@/api/productCate'
  export default {
    name: "productCateList",
    data() {
      return {
        list: null,
        total: null,
        listLoading: true,
        listQuery: {
          pageNum: 1,
          pageSize: 5
        },
        selectProductCateValue: null,
        parentId: 0,
        productCateOptions: [],
        dialogVisible:false,     //模态框是否显示
        addLoading: false,       //是否显示loading
        markOrderDialogVisible:false,
        productIdCate:0
      }
    },
    created() {
      this.resetParentId();
      this.getList();
      this.getProductCateList();
    },
    watch: {
      $route(route) {
        this.resetParentId();
        this.getList();
      },
      selectProductCateValue: function (newValue) {
        if (newValue != null && newValue.length == 2) {
          this.listQuery.productSmallCategoryId = newValue[1];
        } else {
          this.listQuery.productSmallCategoryId = null;
        }

      }
    },
    methods: {
      handleMarkOrder(){
      console.log(this.selectProductCateValue[1]);
      console.log(this.productIdCate);
        this.$confirm('是否要进行物品转移?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = new URLSearchParams();
          params.append("productId",this.productIdCate);
          params.append("productSmallCate",this.selectProductCateValue[1]);
          updatePublishCate(params).then(response=>{
            this.markOrderDialogVisible=false;
            this.$message({
              type: 'success',
              message: '物品类别转移成功!'
            });
              this.getList();
          });
        });
      },
      showLogisticsDialog(value){
        this.productIdCate = value;
        // console.log(value);
        this.markOrderDialogVisible=true;
      },
      getProductCateList() {
        fetchListWithChildren().then(response => {
          let list = response.data;
          this.productCateOptions = [];
          for (let i = 0; i < list.length; i++) {
            let children = [];
            if (list[i].children != null && list[i].children.length > 0) {
              for (let j = 0; j < list[i].children.length; j++) {
                children.push({label: list[i].children[j].name, value: list[i].children[j].id});
              }
            }
            this.productCateOptions.push({label: list[i].name, value: list[i].id, children: children});
          }
        });
      },
      resetParentId(){
        if (this.$route.query.parentId != null) {
          this.parentId = this.$route.query.parentId;
        } else {
          this.parentId = 0;
        }
      },
      getList() {
        this.listLoading = true;
        fetchListProduct(this.$route.query.parentId, this.listQuery).then(response => {
          this.listLoading = false;
          this.list = response.data.list;
          this.total = response.data.total;
        });
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      handleNavStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('navStatus',row.navStatus);
        updateNavStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowStatusChange(index, row) {
        let data = new URLSearchParams();
        let ids=[];
        ids.push(row.id)
        data.append('ids',ids);
        data.append('showStatus',row.showStatus);
        updateShowStatus(data).then(response=>{
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
        });
      },
      handleShowNextLevel(index, row) {
        this.$router.push({path: '/pms/productCateTwo', query: {parentId: row.id}})
      },
      handleDelete(index, row) {
        this.$confirm('是否要删除该品牌', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteProductCate(row.id).then(response => {
            if(response.code=200){
              this.$message({
                message: '删除成功',
                type: 'success',
                duration: 1000
              });
              this.getList();
            }else {
              this.$message({
                message: '该小类下还有物品，请先做物品转移',
                type: 'fail',
                duration: 1000
              });
            }


          });
        });
      }
    },
    filters: {
      levelFilter(value) {
        if (value === 0) {
          return '一级';
        } else if (value === 1) {
          return '二级';
        }
      },
      disableNextLevel(value) {
        if (value === 0) {
          return false;
        } else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
