<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="subjectComment" :rules="rules" ref="subjectCommentFrom" label-width="150px">

      <el-form-item label="所属专题：" prop="subjectId">
        <el-input v-model="subjectComment.subjectId"></el-input>
      </el-form-item>
      <el-form-item label="用户名：" prop="memberNickName">
        <el-input v-model="subjectComment.memberNickName"></el-input>
      </el-form-item>
      <el-form-item label="用户图标：" prop="memberIcon">
        <el-input v-model="subjectComment.memberIcon"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input v-model="subjectComment.content"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-input v-model="subjectComment.createTime"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="showStatus">
        <el-input v-model="subjectComment.showStatus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectCommentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectCommentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSubjectComment, getSubjectComment, updateSubjectComment} from '@/api/cms/subjectComment'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSubjectComment={
    name: ''
  };
  export default {
    name: 'SubjectCommentDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        subjectComment:Object.assign({}, defaultSubjectComment),
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
        getSubjectComment(this.$route.query.id).then(response => {
          this.subjectComment = response.data;
        });
      }else{
        this.subjectComment = Object.assign({},defaultSubjectComment);
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
                updateSubjectComment(this.$route.query.id, this.subjectComment).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSubjectComment(this.subjectComment).then(response => {
                  this.$refs[formName].resetFields();
                  this.subjectComment = Object.assign({},defaultSubjectComment);
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
        this.subjectComment = Object.assign({},defaultSubjectComment);
      }
    }
  }
</script>
<style>
</style>


