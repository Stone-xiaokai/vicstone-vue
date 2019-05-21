<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="topicComment" :rules="rules" ref="topicCommentFrom" label-width="150px">
      
      <el-form-item label="用户名：" prop="memberNickName">
        <el-input v-model="topicComment.memberNickName"></el-input>
      </el-form-item>
      <el-form-item label="主题：" prop="topicId">
        <el-input v-model="topicComment.topicId"></el-input>
      </el-form-item>
      <el-form-item label="图标：" prop="memberIcon">
        <el-input v-model="topicComment.memberIcon"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input v-model="topicComment.content"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-input v-model="topicComment.createTime"></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="showStatus">
        <el-input v-model="topicComment.showStatus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('topicCommentFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('topicCommentFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTopicComment, getTopicComment, updateTopicComment} from '@/api/cms/topicComment'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTopicComment={
    name: ''
  };
  export default {
    name: 'TopicCommentDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        topicComment:Object.assign({}, defaultTopicComment),
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
        getTopicComment(this.$route.query.id).then(response => {
          this.topicComment = response.data;
        });
      }else{
        this.topicComment = Object.assign({},defaultTopicComment);
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
                updateTopicComment(this.$route.query.id, this.topicComment).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTopicComment(this.topicComment).then(response => {
                  this.$refs[formName].resetFields();
                  this.topicComment = Object.assign({},defaultTopicComment);
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
        this.topicComment = Object.assign({},defaultTopicComment);
      }
    }
  }
</script>
<style>
</style>


