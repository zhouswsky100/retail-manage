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
                prop="name"
                label="角色名称">
            </el-table-column>
            <el-table-column
                prop="is_active"
                label="状态">
            </el-table-column>
            <el-table-column
                label="操作"
                width="180">
              <template slot-scope="scope">
                  <el-button @click=" editUser(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button>
                  <el-button @click="deleteUser(scope.row.id)"  type="danger" icon="el-icon-delete" circle size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="编辑角色" :visible.sync="dialogFormVisible">     
            <p>可修改角色菜单权限及角色名</p>
              <el-form ref="upform"  :rules="rules" :model="upform" label-position="left" label-width="150px" style="width: 400px;margin-left: 10px;">
                  <el-form-item label="角色名称" prop="username">
                    <el-input v-model="upform.username" />
                  </el-form-item> 
              </el-form>
              <el-tree
                ref="tree"
                :data="menuList"
                show-checkbox
                node-key="id"
                @check-change="handleCheckChange"
                :default-checked-keys="defaultTree"
                >
              </el-tree>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  取消
                </el-button>
                <el-button type="primary" @click="btnOk">
                  确认
                </el-button>
              </div>
          </el-dialog>
          <el-dialog title="添加角色" :visible.sync="dialogFormVisible2"> 
              <el-form ref="userForm" :rules="rules" :model="userAdd" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
                  <el-form-item label="角色名称" prop="username">
                    <el-input v-model="userAdd.username" />
                  </el-form-item> 
                  <el-form-item label="角色状态" >
                      <el-switch
                        v-model="isActive"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                      </el-switch>
                  </el-form-item> 
              </el-form>
             <el-tree
                ref="tree"
                :data="menuList"
                show-checkbox
                node-key="id"
                @check-change="handleCheckChange"
                >
              </el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">
                  取消
                </el-button>
                <el-button type="primary" @click="btnOk2">
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

  export default {
    data() {
      return {
        isActive:true,
        perData:{},
        userAdd:{},
        usersData:[],
        menuList:[],
        dialogStatus: 'create',
        dialogFormVisible:false,
        changeList:[],
        loading:false,
        rolesDetail:{},
        defaultTree:[],
        dialogFormVisible2:false,
        rules: {
          username:  [{ required: true, message: '角色名称必须输入', trigger: 'blur' }],
        },
        upform:{}
      }
    },
    components: {
      ToolBar,HelpHint
    },
    methods: {
      searchUser(){
      },
      editUser(data) {
           this.perData = data
           this.upform.username = data.name
           sessionStorage.id = data.id
           this.defaultTree = []
           this.getHttpPost({},'rolesDetail',true,'get').then(res => {
            if(res.code==0){
                let temp = res.data[0].children.concat(res.data[1].children)
                temp.forEach(item => {
                  if(item.enable){
                    this.defaultTree.push(item.id)
                  }
                });
              this.$nextTick(()=>{
              this.$refs.tree.setCheckedKeys(this.defaultTree);
              });
               this.dialogFormVisible = true
              }else{
                  this.$message.error(res.msg);
              }
            },error=>{
              this.$message.error('网络开小差了');
          })
      },
      addUser(){
           this.dialogFormVisible2 = true ;
      },
      deleteUser(id){
          sessionStorage.id = id
          this.getHttpPost({},'delRole',true,'DELETE').then(res => {
              this.loginLoading = false;
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
      },
      initData(){
          this.loading = true;
          this.getHttpPost({},'roleList',true,'get').then(res => {
            this.loading = false;
            if(res.code==0){
                  this.usersData = res.data
              }else{
                  this.$message.error(res.msg);
              }
            },error=>{
              this.$message.error('网络开小差了');
          })
          this.getHttpPost({},'menus',true,'get').then(res => {
              if(res.code==0){
                   this.menuList = res.data
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
          let param = {
             name:  this.upform.username,
             is_active: this.perData.is_active,
             menu_list:this.changeList
          }
          this.getHttpPost(param,'updateMenu',true,'PUT').then(res => {
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
      btnOk2(){
          let param = {
             name:  this.userAdd.username,
             is_active: this.isActive,
             permission_list:this.changeList.toString()
          }
          this.getHttpPost(param,'roleAdd',true,'post').then(res => {
              this.loginLoading = false;
              if(res.code==0){
                    this.$message({
                    message: '添加成功',
                    type: 'success'
                  }); 
                  this.initData()
              }else{
                  this.$message.error(res.msg);
              }
              },error=>{
                this.$message.error('网络开小差了');
          })
      }
    },
    mounted() {
      this.initData()
    },
  }
</script>
<style lang="less">

</style>
