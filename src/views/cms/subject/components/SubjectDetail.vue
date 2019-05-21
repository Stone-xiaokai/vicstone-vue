<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="subject" :rules="rules" ref="subjectFrom" label-width="150px">

      <el-form-item label="分类：" prop="categoryId">
        <el-input v-model="subject.categoryId"></el-input>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="subject.title"></el-input>
      </el-form-item>
      <el-form-item label="专题主图：" prop="pic">
        <el-input v-model="subject.pic"></el-input>
      </el-form-item>
      <el-form-item label="关联产品数量：" prop="productCount">
        <el-input v-model="subject.productCount"></el-input>
      </el-form-item>
      <el-form-item label="推荐：" prop="recommendStatus">
        <el-input v-model="subject.recommendStatus"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-input v-model="subject.createTime"></el-input>
      </el-form-item>
      <el-form-item label="收藏量：" prop="collectCount">
        <el-input v-model="subject.collectCount"></el-input>
      </el-form-item>
      <el-form-item label="点击量：" prop="readCount">
        <el-input v-model="subject.readCount"></el-input>
      </el-form-item>
      <el-form-item label="评论量：" prop="commentCount">
        <el-input v-model="subject.commentCount"></el-input>
      </el-form-item>
      <el-form-item label="画册图片用逗号分割：" prop="albumPics">
        <el-input v-model="subject.albumPics"></el-input>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input v-model="subject.description"></el-input>
      </el-form-item>
      <el-form-item label="显示状态：" prop="showStatus">
        <el-input v-model="subject.showStatus"></el-input>
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <el-input v-model="subject.content"></el-input>
      </el-form-item>
      <el-form-item label="转发数：" prop="forwardCount">
        <el-input v-model="subject.forwardCount"></el-input>
      </el-form-item>
      <el-form-item label="专题分类名称：" prop="categoryName">
        <el-input v-model="subject.categoryName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('subjectFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('subjectFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createSubject, getSubject, updateSubject} from '@/api/cms/subject'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultSubject={
    name: ''
  };
  export default {
    name: 'SubjectDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        subject:Object.assign({}, defaultSubject),
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
        getSubject(this.$route.query.id).then(response => {
          this.subject = response.data;
        });
      }else{
        this.subject = Object.assign({},defaultSubject);
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
                updateSubject(this.$route.query.id, this.subject).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createSubject(this.subject).then(response => {
                  this.$refs[formName].resetFields();
                  this.subject = Object.assign({},defaultSubject);
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
        this.subject = Object.assign({},defaultSubject);
      }
    }
  }
</script>
<style>
</style>


