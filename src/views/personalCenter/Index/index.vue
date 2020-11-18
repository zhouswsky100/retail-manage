<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span>{{ $route.meta.title}}</span>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="基本信息" name="index">
           <div v-if="flg">
            <div class="panel-heading">
              <img :src="imgBase+'/'+ selfData.avatar">
              <span class="title"><p class="role">Admin</p><span class="name">{{selfData.name}}</span> </span>
              <i class="el-icon-edit-outline" style="font-size: 28px; position: absolute; right: 31px; cursor: pointer;" @click="flg = false"></i>
            </div>
            <div class="panel-body">
              <ul>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-id-card"></i></el-col>
                    <el-col :span="12">ID</el-col>
                    <el-col :span="6">{{selfData.id_num}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-envelope"></i></el-col>
                    <el-col :span="12">EMAIL</el-col>
                    <el-col :span="6">{{selfData.email}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-female"></i></el-col>
                    <el-col :span="12">性别</el-col>
                    <el-col :span="6">{{selfData.gender}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-birthday-cake"></i></el-col>
                    <el-col :span="12">证件号</el-col>
                    <el-col :span="6">{{selfData.id_num}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-birthday-cake"></i></el-col>
                    <el-col :span="12">职务</el-col>
                    <el-col :span="6">{{selfData.remark}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-phone"></i></el-col>
                    <el-col :span="12">手机</el-col>
                    <el-col :span="6">{{selfData.mobile}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa fa-phone"></i></el-col>
                    <el-col :span="12">办公电话</el-col>
                    <el-col :span="6">{{selfData.tel}}</el-col>
                  </el-row>
                </li>
                <li>
                  <el-row :gutter="20">
                    <el-col :span="6"><i class="fa el-icon-tickets"></i></el-col>
                    <el-col :span="12">个人简介</el-col>
                    <el-col :span="6">{{selfData.remark}}</el-col>
                  </el-row>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="!flg">
            <div class="panel-heading">
              <img :src="imgBase+'/'+ selfData.avatar">
               <span class="title"><p class="role">Admin</p><span class="name">{{selfData.name}}</span> </span>
              <i class="el-icon-circle-close-outline" style="font-size: 28px; position: absolute; right: 31px; cursor: pointer;" @click="flg = true"></i>
              <input @change="chooseImg($event)" type="file" class="file">
            </div>
             <el-form ref="form"  :rules="rules" :model="form" label-width="80px">
                <el-form-item label="登录账号">
                   <p>{{selfData.username}}</p>
                </el-form-item>
                <el-form-item label="所属组织">
                  <p>暂无</p>
                </el-form-item>
               <el-form-item label="性别">
                  <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="真实姓名"  prop="name">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号码"  prop="mobile">
                   <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="证件号码"  prop="id_num">
                    <el-input v-model="form.id_num"></el-input>
                </el-form-item>
                <el-form-item label="职务">
                    <el-input v-model="form.position"></el-input>
                </el-form-item>
                <el-form-item label="办公电话">
                    <el-input v-model="form.tel"></el-input>
                </el-form-item>
                <el-form-item label="个人邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="登录类型">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                 <el-form-item label="个人简介">
                    <el-input v-model="form.remark" type="textarea" :rows="2"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">修改</el-button>
                  <el-button @click="flg = true"> 取消</el-button>
                </el-form-item>
           </el-form>
          </div>
        </el-tab-pane>
        <el-tab-pane label="密码修改" name="third">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="旧密码" prop="oldpassword">
                <el-input type="password" v-model="ruleForm2.oldpassword" auto-complete="off" placeholder="必填，请输入旧密码"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="必填，6-32个字符，支持大小写，数字，符号"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="与新密码保持一致"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item>
            </el-form>
       </el-tab-pane>
       <el-tab-pane label="登录历史" name="second">
            <el-table
                :data="selfLog"
                style="width: 100%">
                <el-table-column
                  prop="ip_addr"
                  label="登录ip"
                >
                </el-table-column>
                <el-table-column
                  prop="login_time"
                  label="登录时间"
                  >
                </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 30, 50, 100]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
       </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  var validatePass = (rule, value, callback) => {
      sessionStorage.tempP = value
      if (value === '') {
        callback(new Error('请输入密码'));
      }
      if(value.length<6||value.length>32){
        callback(new Error('长度不符合规范'));
      } 
        callback();
  };
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== sessionStorage.tempP) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  export default {
    data() {
      return {
        activeName: 'index',
        currentPage:1,
        form:{
        },
        total:0,
        ruleForm2: {
          pass: '',
          checkPass: '',
          oldpassword: ''
        },
        imgBase:this.$rkUtil.getWebServiceUrl('img'),
        rules2: {
          pass: [
            { required: true,validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true,validator: validatePass2, trigger: 'blur' }
          ],
          oldpassword:[
            { required: true, trigger: 'blur',message: '请输入旧密码' }

          ]
        },
        rules: {
          name: [
            { required: true, trigger: 'blur',message: '请输入姓名' }
          ],
          mobile: [
            { required: true, trigger: 'blur',message: '请输入手机号' }
          ],
          id_num:[
            { required: true, trigger: 'blur',message: '请输入证件号' }

          ]
        },
        selfLog:[],
        selfData:{},
        flg:true,
        avatar:'',
        pageNum:1,
        pageSize:10,
      }
    },
    methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
               let param = {
                 old_password:this.ruleForm2.oldpassword,
                 password1:this.ruleForm2.pass,
                 password2:this.ruleForm2.checkPass
               }
               this.getHttpPost(param,'selfUpdw',true,'Put').then(res => {
                  if(res.code==0){
                    this.selfData = res.data
                    }else{
                      this.$message.error(res.msg);
                    }
                  },
                  error => { 
                    this.$message.error('网络开小差了');
                    console.log(error); 
                  })
            } else {
              return false;
            }
          });
        },
        update_avatar() {
            this.loginLoading = true;
            let param = {
              avatar: this.userNmae,
            } 
            this.getHttpPost(param,'selfupdateAvatar',false,'Put').then(res => {
            this.loginLoading = false;
                  if(res.code==0){
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                  }else{
                    this.$message.error('修改失败');
                  }
                },
                error => { 
                  this.loginLoading = false;
                  this.$message.error('网络开小差了');
                  console.log(error); 
                })
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val
          this.getLog()
        },
        handleCurrentChange(val) {
            this.pageNum = val
            this.getLog()
            console.log(`当前页: ${val}`);
        },
        ininData() {
            let param = {
              avatar: this.userNmae,
            } 
            this.getHttpPost(param,'selfDetail',true,'get').then(res => {
                if(res.code==0){
                     this.selfData = res.data
                  }else{
                     this.$message.error(res.msg);
                  }
                },
                error => { 
                  this.$message.error('网络开小差了');
                  console.log(error); 
                })
        },
        getLog(){
            let data = {
               page :this.pageNum,
               page_size:this.pageSize,
               avatar: this.userNmae,

            }
            this.getHttpGet(data,'selfLog',true,'get').then(res => {
                if(res.code==0){
                     this.selfLog = res.data
                     this.total = res.count
                  }else{
                  }
                },
                error => { 
                  this.$message.error('网络开小差了');
                  console.log(error); 
                })
        },
        onSubmit(){
          this.$refs['form'].validate((valid) => {
            if (valid) {
               this.getHttpPost(this.form,'selfUpdate',true,'Put').then(res => {
                  if(res.code==0){
                     this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.flg = true;
                    this.ininData()
                    }else{
                      this.$message.error(res.msg);
                    }
                  },
                  error => { 
                    this.$message.error('网络开小差了');
                    console.log(error); 
                  })
                  if(this.avatar!=''){
                      this.getHttpPost({ avatar:this.avatar},'selfUpdate_avatar',true,'Put').then(res => {
                      if(res.code==0){
                        this.flg = true;
                        this.ininData()
                        }else{
                          this.$message.error(res.msg);
                        }
                      },
                      error => { 
                        this.$message.error('网络开小差了');
                        console.log(error); 
                      })
                  }
            } else {
              return false;
            }
          });

        },
        chooseImg(event){
          let imgData =event.target.files[0]
           if(!['png','jpg','jpeg'].includes(event.target.files[0].name.split('.')[1])){
              this.$message.error('请选择图片');
              return
           }else{
            var url = URL.createObjectURL(imgData);
            var base64 = this.blobToDataURL(imgData,(base64Url)=> {
               this.avatar= base64Url
            })

           }     
        },
        blobToDataURL(blob,cb) {
          let reader = new FileReader();
          reader.onload = function (evt) {
            var base64 = evt.target.result
            cb(base64)
          };
          reader.readAsDataURL(blob);
        }
    },
    mounted() {
      this.ininData();
      this.getLog()
    },
  }
</script>
<style lang="less">
  .box-card {
    border-radius: 0;
    .panel-heading{
      display: flex;
      text-align: left;
      width: 100%;
      border-bottom: 1px solid #eeeff1;
      padding: 15px;
      font-weight: bold;
      img{
        margin-right: 15px;
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
      .title{
        display: flex;
        flex-direction: column;
        justify-content: center;
        .name{
          color: #367fa9;
          font-size: 18px;
        }
        .role{
          color: #99a9c0;
        }
      }
    }
    .panel-body{
      color: #3c8dbc;
      ul{
        li{
          border-bottom: 1px solid #eeeff1;
          padding: 0 15px;
          height: 45px;
          line-height: 45px;
        }
      }
    }
    .file{
      opacity: 0;
      position: relative;
      width: 100px;
      height: 100px;
      left: -100px
    }
  }
  
</style>