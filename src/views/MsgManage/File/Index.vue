<template>
  <div class="user-list">
    <ToolBar>
          <div class="g-ml-10 ">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="1"
                :before-upload="getFile"
                :file-list="fileList"
                :on-change="fileLength"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
              </el-upload>
          </div>
          <el-table
              :data="fileData"
              border
              v-loading="loading"
              ref="table"
              style="width: 100%">
            <el-table-column
                prop="file_name"
                label="文件名"
                >
            </el-table-column>
              <el-table-column
                prop="publisher"
                label="上传者"
            >
            </el-table-column>
            <el-table-column
                prop="file_path"
                label="文件路径"
            >
            </el-table-column>
             <el-table-column
                prop="create_time"
                label="上传时间"
              >
            </el-table-column>
            <el-table-column
                label="操作"
              >
              <template slot-scope="scope">
                  <el-button @click="down(scope.row)"  type="primary" icon="el-icon-download" circle size="small"></el-button>
                  <el-button @click="deleteUser(scope.row.id)"  type="danger" icon="el-icon-delete" circle size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
    </ToolBar>
  </div>
</template>

<script>
import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
        fileData:[],
        loading:false,
        fileList:[],
        formData:new FormData(),
        file:''
      }
    },
    components: {
      ToolBar
    },
    methods: {
      deleteUser(id){
          sessionStorage.file_id = id
          this.$confirm('您确定要删除文件吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getHttpPost({},'delFile',true,'delete').then(res => {
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
      down(row){
            let data = {
              file_path :row.file_path,
              file_name:row.file_name
            } 
            this.getHttpDown(data,'download',true,'get').then(res => {
              const url = window.URL.createObjectURL(new Blob([res]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', row.file_name);
              document.body.appendChild(link);
              link.click();
         
            },error=>{
              this.$message.error('网络开小差了');
        })
      },
      initData(){
          this.loading = true;
          this.getHttpPost({},'inform_file',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.fileData = res.data
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      fileLength(file, fileList){
        const isLt20M = file.size / 1024 / 1024 < 20;
        if(fileList){
           if (fileList.length > 1) {
              fileList.splice(0, 1);
            }
        }
      },
      getFile(file){
        this.formData.append('file', file);
        this.file = file
      },
      submitUpload(){
        this.$refs.upload.submit();
        if( this.file==''|| this.file==undefined|| this.file==null){
          this.$message.warning('请先选择一个文件');
          return
        }
        this.getHttpPost(this.formData,'createFile',true,'post','file').then(res => {
        if(res.code==0){
              this.$message({
              message: '上传成功',
              type: 'success'
            }); 
        }
        this.initData()
        },error=>{
          this.$message.error('网络开小差了');
        })  
      },
    },
    mounted() {
      this.initData()
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
