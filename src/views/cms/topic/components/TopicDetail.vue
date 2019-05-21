<template> 
  <el-card class="form-container" shadow="never">
    <el-form :model="topic" :rules="rules" ref="topicFrom" label-width="150px">

      <el-form-item label="所属分类：" prop="categoryId">
        <el-input v-model="topic.categoryId"></el-input>
      </el-form-item>
      <el-form-item label="标题：" prop="name">
        <el-input v-model="topic.name"></el-input>
      </el-form-item>
      <el-form-item label="创建时间：" prop="createTime">
        <el-input v-model="topic.createTime"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" prop="startTime">
        <el-input v-model="topic.startTime"></el-input>
      </el-form-item>
      <el-form-item label="结束时间：" prop="endTime">
        <el-input v-model="topic.endTime"></el-input>
      </el-form-item>
      <el-form-item label="参与人数：" prop="attendCount">
        <el-input v-model="topic.attendCount"></el-input>
      </el-form-item>
      <el-form-item label="关注人数：" prop="attentionCount">
        <el-input v-model="topic.attentionCount"></el-input>
      </el-form-item>
      <el-form-item label="点击人数：" prop="readCount">
        <el-input v-model="topic.readCount"></el-input>
      </el-form-item>
      <el-form-item label="奖品名称：" prop="awardName">
        <el-input v-model="topic.awardName"></el-input>
      </el-form-item>
      <el-form-item label="参与方式：" prop="attendType">
        <el-input v-model="topic.attendType"></el-input>
      </el-form-item>
      <el-form-item label="话题内容：" prop="content">
        <el-input v-model="topic.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('topicFrom')">提交</el-button>
        <el-button v-if="!isEdit" @click="resetForm('topicFrom')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
  import {createTopic, getTopic, updateTopic} from '@/api/cms/topic'
  import SingleUpload from '@/components/Upload/singleUpload'
  const defaultTopic={
    name: ''
  };
  export default {
    name: 'TopicDetail',
    components:{SingleUpload},
    props: {
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        topic:Object.assign({}, defaultTopic),
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
        getTopic(this.$route.query.id).then(response => {
          this.topic = response.data;
        });
      }else{
        this.topic = Object.assign({},defaultTopic);
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
                updateTopic(this.$route.query.id, this.topic).then(response => {
                  this.$refs[formName].resetFields();
                  this.$message({
                    message: '修改成功',
                    type: 'success',
                    duration:1000
                  });
                  this.$router.back();
                });
              } else {
                createTopic(this.topic).then(response => {
                  this.$refs[formName].resetFields();
                  this.topic = Object.assign({},defaultTopic);
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
        this.topic = Object.assign({},defaultTopic);
      }
    }
  }
</script>
<style>
</style>


