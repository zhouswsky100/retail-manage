<template>
  <div class="user-list">
    <ToolBar>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser()">添加</el-button>
          <el-table
              :data="usersData"
              border
              v-loading="loading"
              ref="table"
              style="width: 100%">
            <el-table-column
                prop="username"
                label="账号">
            </el-table-column>
              <el-table-column
                prop="name"
                label="姓名"
                width="120">
            </el-table-column>
              <el-table-column
                prop="email"
                label="邮箱"
                width="120">
            </el-table-column>
              <el-table-column
                prop="mobile"
                label="手机号"
                width="120">
            </el-table-column>
              <el-table-column
                prop="gender"
                label="性别"
                width="50">
            </el-table-column>
              <el-table-column
                prop="department"
                label="所属单位">
            </el-table-column>
              <el-table-column
                prop="id_num"
                label="证件号">
            </el-table-column>
              <el-table-column
                prop="position"
                label="职务">
            </el-table-column>
             <el-table-column
                prop="tel"
                label="办公电话">
            </el-table-column>
             <el-table-column
                prop="remark"
                label="简介"
                width="150">
            </el-table-column>
              <el-table-column
                label="状态"
                width="50">
              <template slot-scope="scope">
                   {{scope.row.is_active | filterStat}}
              </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="160">
              <template slot-scope="scope">
                  <el-button @click=" editUser(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
                  <el-button @click="deleteUser(scope.row.id)"  type="danger" icon="el-icon-delete" circle size="small"></el-button>
                  <el-button @click='refreshPass(scope.row.id)' type="primary" icon="el-icon-refresh" circle size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="编辑用户" :visible.sync="dialogFormVisible">     
              <el-form ref="userForm" :rules="rules" :model="userAdd" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
                  <el-form-item label="登录账号" prop="username">
                    <el-input v-model="userAdd.username" />
                  </el-form-item> 
                  <el-form-item label="真实姓名" prop="name">
                    <el-input v-model="userAdd.name" />
                  </el-form-item> 
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userAdd.email" />
                  </el-form-item> 
                  <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="userAdd.mobile" />
                  </el-form-item> 
                  <el-form-item label="性别">
                      <el-select v-model="userAdd.gender" placeholder="请选择性别" prop="sex">
                        <el-option label="男" value="男"></el-option>
                        <el-option label="女" value="女"></el-option>
                      </el-select>
                  </el-form-item>
                   <el-form-item label="用戶角色">
                      <el-select v-model="userAdd.role" placeholder="请选择用戶角色" >
                        <el-option v-for="item in roleList" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="所属单位" >
                    <el-input v-model="userAdd.department" />
                  </el-form-item> 
                  <el-form-item label="证件号" >
                    <el-input v-model="userAdd.id_num" />
                  </el-form-item> 
                  <el-form-item label="职务" >
                    <el-input v-model="userAdd.position" />
                  </el-form-item> 
                <el-form-item label="办公电话" >
                    <el-input v-model="userAdd.tel" />
                  </el-form-item> 
                <el-form-item label="个人简介">
                    <el-input v-model="userAdd.remark" type="textarea" :rows="2"></el-input>
                </el-form-item> 
                <el-form-item label="角色状态" >
                      <el-switch
                        v-model="isActive"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                </el-form-item> 
            </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  取消
                </el-button>
                <el-button type="primary" @click="btnOk">
                  确认
                </el-button>
              </div>
          </el-dialog>
          <el-dialog title="添加用户" :visible.sync="dialogFormVisible2"> 
            <el-form ref="userForm" :rules="rules" :model="userAdd" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
              <el-form-item label="登录账号" prop="username">
                <el-input v-model="userAdd.username" />
              </el-form-item> 
              <el-form-item label="真实姓名" prop="name">
                <el-input v-model="userAdd.name" />
              </el-form-item> 
              <el-form-item label="密码" prop="password1">
                <el-input v-model="userAdd.password1" />
              </el-form-item> 
              <el-form-item label="确认密码" prop="password2">
                <el-input v-model="userAdd.password2" />
              </el-form-item> 
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="userAdd.email" />
              </el-form-item> 
              <el-form-item label="手机号码" prop="mobile">
                <el-input v-model="userAdd.mobile" />
              </el-form-item> 
              <el-form-item label="性别">
                  <el-select v-model="userAdd.gender" placeholder="请选择性别" prop="sex">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
              </el-form-item>
               <el-form-item label="用戶角色">
                  <el-select v-model="userAdd.role" placeholder="请选择用戶角色" >
                    <el-option v-for="item in roleList" :label="item.name" :value="item.id"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="所属单位" >
                <el-input v-model="userAdd.department" />
              </el-form-item> 
               <el-form-item label="证件号" >
                <el-input v-model="userAdd.id_num" />
              </el-form-item> 
              <el-form-item label="职务" >
                <el-input v-model="userAdd.position" />
              </el-form-item> 
             <el-form-item label="办公电话" >
                <el-input v-model="userAdd.tel" />
              </el-form-item> 
             <el-form-item label="个人简介">
                <el-input v-model="userAdd.remark" type="textarea" :rows="2"></el-input>
             </el-form-item> 
             <el-form-item label="角色状态" >
                  <el-switch
                    v-model="isActive"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
             </el-form-item> 
            </el-form>
           <!-- <el-tree
              ref="tree"
              :data="menuList"
              show-checkbox
              node-key="id"
              @check-change="handleCheckChange"
              >
            </el-tree> -->
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">
                  取消
                </el-button>
                <el-button type="primary" @click="submitForm">
                  确认
                </el-button>
            </div>
          </el-dialog>
    </ToolBar>
  </div>
</template>

<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  import HelpHint from '~/components/HelpHint/HelpHint.vue';
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
  var validateMobile = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入手机号'));
    }
   if(!(/^1[3456789]\d{9}$/.test(value))){ 
      callback(new Error('请输入正确的手机号!'));
    }else {
      callback();
    }
  };
  var validateEmail = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入邮箱'));
    }
    if(!( /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value))){ 
      callback(new Error('请输入正确的邮箱地址!'));
    } else {
      callback();
    }
  };
  export default {
    data() {
      return {
        isActive:true,
        userAdd:{},
        usersData:[],
        menuList:[],
        dialogStatus: 'create',
        dialogFormVisible:false,
        changeList:[],
        loading:false,
        dialogFormVisible2:false,
        roleList:[],
        rules: {
          username:  [{ required: true, message: '账号必须输入', trigger: 'blur' }],
          password1: [ { required: true,validator: validatePass, trigger: 'blur' }],
          password2: [  { required: true,validator: validatePass2, trigger: 'blur' } ],
          mobile: [{ required: true,validator: validateMobile, trigger: 'blur' }],
          sex: [{ required: true, message: '性别必须选择',trigger: 'blur' }],
          email: [{ required: true,validator: validateEmail, trigger: 'blur' }],
        },
      }
    },
    components: {
      ToolBar,HelpHint
    },
    methods: {
      searchUser(){
      },
      editUser(data) {
           this.userAdd = data
           sessionStorage.id = data.id
           this.dialogFormVisible = true
      },
      addUser(){
           this.dialogFormVisible2 = true ;
      },
      deleteUser(id){
          sessionStorage.id = id
          this.$confirm('您确定要注销用户吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getHttpPost({},'switch',true,'get').then(res => {
                if(res.code==0){
                      this.$message({
                      message: '删除成功',
                      type: 'success'
                    }); 
                    this.initData()
                }else{
                    this.$message.error(res.msg);
                }
                },error=>{
                  this.$message.error('网络开小差了');
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
      },
      refreshPass(id){
          sessionStorage.id = id
          this.$confirm('您确定要重置密码吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
               this.loginLoading = true;
                this.getHttpPost({},'resetPwd',true,'get').then(res => {
                this.loginLoading = false;
                  if(res.code==0){
                        this.$message({
                        message: '重置成功，密码为6个8',
                        type: 'success'
                      }); 
                      this.initData()
                  }else{
                      this.$message.error(res.msg);
                  }
                },error=>{
                  this.$message.error('网络开小差了');
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消重置'
              });          
            });
      },
      initData(){
          this.loading = true;
          this.getHttpPost({},'userList',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.usersData = res.data
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
          this.getHttpPost({},'roleList',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.roleList = res.data
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      handleCheckChange () {
        this.changeList = []
        let res = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        this.changeList = res
     
         console.log(res)
      },
      btnOk(){
          this.loginLoading = true;
          this.getHttpPost(this.userAdd,'update',true,'PUT').then(res => {
              this.loginLoading = false;
              if(res.code==0){
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
              }else{
                   this.$message.error(res.msg);
              }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      submitForm() {
          this.$refs['userForm'].validate((valid) => {
            if (valid) {
               this.getHttpPost(this.userAdd,'addUser',true,'Post').then(res => {
                  if(res.code==0){
                      this.$message({
                        message: '新增成功',
                        type: 'success'
                      });
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
    },
    mounted() {
      this.initData()
    },
    filters:{
      filterStat(val){
        if(val){
          return '正常'
        }else{
          return '注销'
        }
      }
    },
  }
</script>
<style lang="less">

</style>
