<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="subjectCategory" :rules="rules" ref="subjectCategoryFrom" label-width="150px">

      <el-form-item label="标题：" prop="name">
        <el-input v-model="subjectCategory.name"></el-input>
      </el-form-item>
      <el-form-item label="分类图标：" prop="icon">
        <el-input v-model="subjectCategory.icon"></el-input>
      </el-form-item>
      <el-form-item label="专题数量：" prop="subjectCount">
        <el-input v-model="subjectCategory.subjectCount"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="showStatus">
        <el-input v-model="subjectCategory.showStatus"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model="subjectCategory.sort"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectCategoryFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectCategoryFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSubjectCategory, getSubjectCategory, updateSubjectCategory} from '@/api/cms/subjectCategory'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSubjectCategory={
    name: ''
  };
  export default {
    name: 'SubjectCategoryDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        subjectCategory:Object.assign({}, defaultSubjectCategory),
        rules: {
          name: [
            {required: true, message: '请输入品牌名称', trigger: 'blur'},
            {min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur'}
          ],
          logo: [
            {required: true, message: '请输入品牌logo', trigger: 'blur'}
          ],
          sort: [
            {type: 'number', message: '排序必须为数字'}
          ],
        }
      }
    },
    created() {
      if (this.isEdit) {
        getSubjectCategory(this.$route.query.id).then(response => {
          this.subjectCategory = response.data;
        });
      }else{
        this.subjectCategory = Object.assign({},defaultSubjectCategory);
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$cconfirm('是否提交数据', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              if (this.isEdit) {
                updateSubjectCategory(this.$route.query.id, this.subjectCategory).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSubjectCategory(this.subjectCategory).then(response => {
                  this.$refs[formName].resetFields();
                  this.subjectCategory = Object.assign({},defaultSubjectCategory);
                  this.$message({
                    message: '提交成功',
                    type: 'success',
                    duration:1000
                  });
                });
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
        this.subjectCategory = Object.assign({},defaultSubjectCategory);
      }
    }
  }
</script>
<style>
</style>


