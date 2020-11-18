<template>
  <div class="user-list">
    <ToolBar>
          <el-button type="primary" icon="el-icon-plus" size="small" @click="addUser()">添加</el-button>
          <el-table
              :data="noticData"
              border
              v-loading="loading"
              ref="table"
              style="width: 100%">
            <el-table-column
                prop="publisher_name"
                label="发布角色"
                >
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题"
                >
            </el-table-column>
            <el-table-column
                prop="type_name"
                label="公告类型"
                >
            </el-table-column>
             <el-table-column
                prop="department"
                label="发布单位"
               >
            </el-table-column>
              <el-table-column
                prop="create_time"
                label="发布时间"
               >
            </el-table-column>
            <el-table-column
                label="操作"
                width="160">
              <template slot-scope="scope">
                  <el-button @click=" showDetail(scope.row.id)" type="success" icon="el-icon-tickets" size="small" circle></el-button>
                 <!--  <el-button @click=" editUser(scope.row)" type="primary" icon="el-icon-edit" size="small" circle></el-button> -->
                  <el-button @click="deleteUser(scope.row.id)"  type="danger" icon="el-icon-delete" circle size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="dig">
            <el-dialog title="公告详情" :visible.sync="dialogFormVisible">     
              <p><span  class="title">公告标题 : </span>&nbsp;&nbsp;<span>{{noticDetail.title}}</span></p>
              <p><span  class="title">公告类型 :</span>&nbsp;&nbsp; <span>{{noticDetail.type_name}}</span></p>
              <p><span  class="title">发布角色 : </span>&nbsp;&nbsp;<span>{{noticDetail.publisher_name}}</span></p>
              <p><span  class="title">发布单位 : </span>&nbsp;&nbsp;<span>{{noticDetail.department}}</span></p>
              <p><span  class="title"> 发布内容 :</span>&nbsp;&nbsp;<span v-html="noticDetail.content"> </span></p>
            </el-dialog>
          </div>
          <el-dialog title="添加公告"  width="80%"  :visible.sync="dialogFormVisible2"> 
            <el-form ref="noticForm" :rules="rules" :model="noticForm" label-position="left" label-width="150px" style="width: 400px;">
              <el-form-item label="标题" prop="title">
                <el-input v-model="noticForm.title" />
              </el-form-item> 
              <el-form-item label="公告类型">
                  <el-select v-model="noticForm.type" placeholder="请选择">
                    <el-option
                      v-for="item in typeList"
                      :key="item.id"
                      :label="item.type_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="通知内容" prop="email">
                <quill-editor ref="myTextEditor" 
                    v-model="noticForm.content" 
                    :options="editorOption" 
                    style="height:150px;width:670px">
                </quill-editor>
              </el-form-item> 
            </el-form>
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
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import * as Quill from 'quill'; // 富文本基于quill
import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
        isActive:true,
        noticForm:{},
        noticData:[],
        dialogStatus: 'create',
        dialogFormVisible:false,
        changeList:[],
        loading:false,
        dialogFormVisible2:false,
        type:"",
        formLabelWidth: '120px',
        noticDetail:{},
        rules: {
          title:  [{ required: true, message: '标题必须输入', trigger: 'blur' }],
        },
        typeList:[],
        editorOption: {
          placeholder: '请编辑通知内容'
        },
      }
    },
    components: {
      ToolBar,quillEditor
    },
    methods: {
      onEditorChange({ editor, html, text }) {
           this.content = html;
      },
      editUser(data) {
           this.userAdd = data
           sessionStorage.id = data.id
           this.dialogFormVisible = true
      },
      addUser(){
           this.getNoticType()
           this.dialogFormVisible2 = true ;
      },
      deleteUser(id){
          sessionStorage.notice_id = id
          this.$confirm('您确定要删除这条通知吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getHttpPost({},'noticeDel',true,'delete').then(res => {
                if(res.code==0){
                      this.$message({
                      message: '删除成功',
                      type: 'success'
                    }); 
                    this.initData()
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
      initData(){
          this.loading = true;
          this.getHttpPost({},'noticeList',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.noticData = res.data
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      getNoticType(){
          this.getHttpPost({},'noticeType',true,'get').then(res => {
              if(res.code==0){
                   this.typeList = res.data
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
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
          this.$refs['noticForm'].validate((valid) => {
            if (valid) {
               this.getHttpPost(this.noticForm,'noticeCreate',true,'Post').then(res => {
                  if(res.code==0){
                      this.$message({
                        message: '发布公告成功',
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
      showDetail(id){
        this.dialogFormVisible = true
        sessionStorage.notice_id = id
        this.getHttpPost({},'noticeDetail',true,'get').then(res => {
          if(res.code==0){
              this.noticDetail = res.data
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
    filters:{
      splCont(val){
        let regex = /(<([^>]+)>)/ig
        if(val.length>10){
          return val.replace(regex, "").substring(0,9)+'...'
        }else{
          return val
        }
      }
    },
  }
</script>
<style lang="less">
.dig /deep/ .el-dialog__body{
  padding-top: 0px;
  p{
    color: #272D3D;
    font-family: PingFang-SC-Medium;
  }
}
.title{
    color: #272D3D;
    font-weight: bold;
}
</style>
