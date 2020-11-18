<template>
     <ToolBar>
       <div id="notice">
        <el-form :inline="true"   :model="pform"  label-position ="right" class="demo-form-inline">
             <!-- <el-form-item label="拟办部门"  prop="pnum" >
              <el-select v-model="pform.style" placeholder="请选择部门">
                  <el-option v-for="item in group" :label="item.name" :value="item.name"></el-option>
                </el-select>
           </el-form-item> -->
            <el-form-item label="拟办人"  prop="pid" >
                <el-select v-loading="loading" v-model="pform.pid" placeholder="请选择拟办人" @change="currentSel" > 
                  <el-option  v-for="(item,index) in group" :label="item.name" :value="item.id" :key="index"  ></el-option>
                </el-select>          
            </el-form-item>
            <!-- <el-form-item label="联系电话"  prop="pnum" >
                  <el-input v-model="pform.pnum" placeholder="联系电话"></el-input>
           </el-form-item> -->
           <!-- <el-form-item label="办理部门"  prop="pnum" >
                  <el-input v-model="pform.pnum" placeholder="办理部门"></el-input>
           </el-form-item> -->
          <el-form-item label="拟办时间">
            <el-date-picker
                v-model="endd"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="限办日期">
            </el-date-picker>
           </el-form-item>
         <div id="address">   
            <el-form-item label="办理意见">
              <el-input type="textarea" rows="4" v-model="pform.idea"></el-input>
            </el-form-item>
         </div>
         <!-- <div id="address">   
            <el-form-item label="附件">
             <div class="g-ml-10 ">
              <el-upload
                class="upload-demo"
                ref="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
             </div>
             <div class="g-ml-10 "> <span class="toas">（温馨提示：上传附件个数每次不超过5个，每个附件最大10M，只支持上传后缀名包含（jpg/jpeg/gif/png/doc/docx/xls/xlsx/txt/pdf/ppt/pptx）的附件。）</span></div>
            </el-form-item>
          </div>
          <div id="address">   
            <el-form-item label="告知情况">
              <el-input type="textarea" rows="4" v-model="pform.nrzy"></el-input>
            </el-form-item>
          </div> -->
        </el-form>
        <div class="btnflx">
            <el-button type="primary" @click="btnOk">确认</el-button>
        </div>
       </div>
    </ToolBar>
</template>
<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
        pid:"",
        idea:"",
        pform:{},
        group:[],
        loading:true,
        endd:this.$route.query.endd,
        type:this.$route.query.type,
        role:sessionStorage.role,
        intype:''

      }
    },
    mounted(){
      this.initGroup()
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      currentSel(index){
        this.group.forEach(item => {
          if(item.type=='1'){
            this.type = 2
          }
        });
      },
      initGroup(){
        let url
        if(this.type==1){
          url ='msgOdp'
        }else{
          url ='subdp'
        }
        this.getHttpPost({},url,true,'get').then(res => {
          this.loading = false
          if(res.code==0){
            this.group = res.data
            if(sessionStorage.role=="信访室登记用户"){
              this.addGroup()
            }
          }
        },
        error => { 
          this.loginLoading = false;
          this.$message.error('网络开小差了');
          console.log(error); 
        })
        
      },
      addGroup(){
          this.getHttpPost({},'subdp',true,'get').then(res => {
          this.loading = false
          if(res.code==0){
            let temp = []
            res.data.forEach(item => {
              item.type = 1
              temp.push(item)
            });
             this.group = this.group.concat(temp)
            console.log( this.group)
          }
        },
        error => { 
          this.loginLoading = false;
          this.$message.error('网络开小差了');
          console.log(error); 
        })

      },
      btnOk(){
        let data = {
          deal_man_id:this.pform.pid,
          deal_idea:this.pform.idea,
          expire_time:this.endd.split(' ')[0]+' '+'00:00:00',
        }
        let url
        if(this.type==1){
          url ='msgzb'
        }else{
          url ='flow_sub_dp'
        }
        this.getHttpPost(data,url,true,'post').then(res => {
          if(res.code==0){
            this.$router.push({path:'/msg_success', query:{ name:'您的信件已转办完成'}})
          }else{
            this.$message.error('转办失败');
          }
        },
        error => { 
          this.loginLoading = false;
          this.$message.error('网络开小差了');
          console.log(error); 
        })

      }
   
    },
    components: {
        ToolBar
    }
  }
</script>
<style lang="less">
 #address  /deep/ .el-textarea__inner{
    width: 880px;
}
 #address  /deep/ .el-form-item{
    display: flex;
}

#notice  /deep/ .el-form-item__label{
    width: 90px;
    font-size: 14px;
    color: #606266;
}
.toas {
    color: #fe5c5c;
    font-size: 12px;
    line-height: 0px;
}
.ml-50{
    margin-left: 50px;
}
#notice  /deep/ .el-select>.el-input{
  width: 200px;
}
#notice  /deep/ .el-input__inner {
  width: 200px;
}
</style>