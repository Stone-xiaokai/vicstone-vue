<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="help" :rules="rules" ref="helpFrom" label-width="150px">

      <el-form-item label="类别：" prop="categoryId">
        <el-input v-model="help.categoryId"></el-input>
      </el-form-item>
      <el-form-item label="图片：" prop="icon">
        <el-input v-model="help.icon"></el-input>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="help.title"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="showStatus">
        <el-input v-model="help.showStatus"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-input v-model="help.createTime"></el-input>
      </el-form-item>
      <el-form-item label="点击量：" prop="readCount">
        <el-input v-model="help.readCount"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input v-model="help.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('helpFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('helpFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createHelp, getHelp, updateHelp} from '@/api/cms/help'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultHelp={
    name: ''
  };
  export default {
    name: 'HelpDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        help:Object.assign({}, defaultHelp),
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
        getHelp(this.$route.query.id).then(response => {
          this.help = response.data;
      });
      }else{
        this.help = Object.assign({},defaultHelp);
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
              updateHelp(this.$route.query.id, this.help).then(response => {
                this.$refs[formName].resetFields();
              this.$message({
                message: '修改成功',
                type: 'success',
                duration:1000
              });
              this.$router.back();
            });
            } else {
              createHelp(this.help).then(response => {
                this.$refs[formName].resetFields();
              this.help = Object.assign({},defaultHelp);
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
        this.help = Object.assign({},defaultHelp);
      }
    }
  }
</script>
<style>
</style>


