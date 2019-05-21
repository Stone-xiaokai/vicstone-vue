<template> 
  <el-card class="form-container" shadow="never">
    <!--<el-form :model="memberParam" :rules="rules" ref="brandFrom" label-width="150px">-->

    <el-form :model="memberParam" ref="brandFrom" label-width="150px">
      <el-form-item label="用户密码：">
        <el-input v-model="memberParam.password"></el-input>
      </el-form-item>
      <el-form-item label="用户联系方式：">
        <el-input v-model="memberParam.phone"></el-input>
      </el-form-item>
      <el-form-item label="用户地址：">
        <el-input v-model="memberParam.city"></el-input>
      </el-form-item>
      <!--<el-form-item label="排序：" prop="sort">-->
        <!--<el-input v-model.number="brand.sort"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="是否显示：">-->
        <!--<el-radio-group v-model="brand.showStatus">-->
          <!--<el-radio :label="1">是</el-radio>-->
          <!--<el-radio :label="0">否</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="品牌制造商：">-->
        <!--<el-radio-group v-model="brand.factoryStatus">-->
          <!--<el-radio :label="1">是</el-radio>-->
          <!--<el-radio :label="0">否</el-radio>-->
        <!--</el-radio-group>-->
      <!--</el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="onSubmit('brandFrom')">确认修改</el-button>
        <el-button v-if="!isEdit" @click="resetForm('brandFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {getMember,updateMember} from '@/api/member';
  const defaultMember={
    id: 0,
    username: '',
    password: 0,
    phone: '',
    city: ''
  };
  export default {
    name: 'MemberDetail',
    components:{},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        memberParam: Object.assign({}, defaultMember),
        // brand:Object.assign({}, defaultMember),
        // rules: {
        //   name: [
        //     {required: true, message: '请输入品牌名称', trigger: 'blur'},
        //     {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
        //   ],
        //   logo: [
        //     {required: true, message: '请输入品牌logo', trigger: 'blur'}
        //   ],
        //   sort: [
        //     {type: 'number', message: '排序必须为数字'}
        //   ],
        // }
      }
    },
    created() {
      if (this.isEdit) {

        getMember(this.$route.query.id).then(response => {
          this.memberParam = response.data;
        });
      }else{
        this.brand = Object.assign({},defaultBrand);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateMember(this.$route.query.id, this.memberParam).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                // createBrand(this.brand).then(response => {
                //   this.$refs[formName].resetFields();
                //   this.brand = Object.assign({},defaultBrand);
                //   this.$message({
                //     message: '提交成功',
                //     type: 'success',
                //     duration:1000
                //   });
                // });
              }
            });

          } else {
            this.$message({
              message: '验证失败',
              type: 'error',
              duration:1000
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.brand = Object.assign({},defaultBrand);
      }
    }
  }
</script>
<style>
</style>


