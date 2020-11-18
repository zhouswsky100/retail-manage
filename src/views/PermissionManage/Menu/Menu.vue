<template>
    <ToolBar>
      <div class="block">
          <el-table
            v-loading="loading"
            :data="menuList"
            row-key="id"
            border
            default-expand-all
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
          >
          <el-table-column
           prop="label" 
           label="菜单名称" 
           :show-overflow-tooltip="true"
            width="160">
          </el-table-column>
          <el-table-column prop="icon" label="图标" align="center" width="100">
            <template slot-scope="scope">
              <i  :class="scope.row.icon"></i>
            </template>
          </el-table-column>
          <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column prop="path" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
              <el-button size="mini" 
                type="text" 
                icon="el-icon-edit" 
                @click="showAppend(scope.row,'修改菜单'),title='修改菜单'"
              >修改</el-button>
              <el-button 
                size="mini" 
                type="text" 
                icon="el-icon-plus" 
                @click="showAppend(scope.row,'新增菜单'),title='新增菜单'"
              >新增</el-button>
              <el-button
                size="mini"
                type="text"
                icon="el-icon-delete"
                @click="remove(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :title="title" :visible.sync="dialogFormVisible"> 
          <el-form ref="userForm" :rules="rules" :model="menuData" label-position="left" label-width="150px" style="width: 400px; margin-left:50px;">
              <el-form-item label="菜单名称" prop="name">
                <el-input v-model="menuData.name" />
              </el-form-item> 
              <el-form-item label="菜单路径" prop="path">
                <el-input v-model="menuData.path" />
              </el-form-item> 
              <el-form-item label="菜单图标" >
                <el-input v-model="menuData.icon" />
              </el-form-item> 
           </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                  取消
                </el-button>
                <el-button type="primary" @click="postAppend">
                  确认
                </el-button>
            </div>
          </el-dialog>
    </ToolBar>
</template>
<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  import HelpHint from '~/components/HelpHint/HelpHint.vue';
  let id = 1000;

  export default {
    data() {
      return {
        menuList:[],
        value: [],
        loading:true,
        dialogFormVisible:false,
        treeData:'',
        rules: {
          name:  [{ required: true, message: '菜单名称必须填写', trigger: 'blur' }],
          path:  [{ required: true, message: '菜单路径必须填写', trigger: 'blur' }],
        },
        menuData:{
          icon:''
        },
        title:''
      }
    },

    methods: {
      initData(){
          this.loading = true;
          this.getHttpPost({},'menus',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.menuList =  this.$rkUtil.handleTree( res.data)   
                   //  this.menuList = res.data
                   console.log(  this.menuList)
                }else{
                  this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
              })
      },
      showAppend(data,title) {
        this.dialogFormVisible = true
        this.treeData = data
        if(title=='修改菜单'){
            this.menuData = {
              name: data.label,
              path: data.path,
              icon: data.icon
            }
        }
      },
      postAppend(){
          let data = this.treeData
          sessionStorage.menu_id = data.id;
          if(this.title=='新增菜单'){ 
             this.menuData.parent_id = data.id
             this.getHttpPost(this.menuData,'createMenus',true,'Post').then(res => {
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
          }else{
              this.menuData.parent_id = data.parent_id
              this.getHttpPost(this.menuData,'updateMenus',true,'Put').then(res => {
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
      remove(data) {
        sessionStorage.menu_id = data.id;
        this.getHttpPost({},'delectMenus',true,'DELETE').then(res => {
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
    },
    mounted() {
      this.initData()
    },
    components: {
      ToolBar, HelpHint
    }
  }
</script>
<style lang="less">

</style>
