<template>
     <ToolBar>
       <div id="notice">
        <el-form :inline="true"   :model="pform"  label-position ="right" class="demo-form-inline">
          <el-form-item label="办理部门" >
              <span>龙华区卫生健康局</span>
          </el-form-item>
          <el-form-item label="经办人">
               <span>张三</span>
          </el-form-item>
          <el-form-item label="联系电话" >
              <span>153124323</span>
          </el-form-item>
          <el-form-item label="办理时间">
              <span>2020-1-2</span>
          </el-form-item>
           <div id="address">   
            <el-form-item label="办理情况">
              <el-input type="textarea" rows="4" v-model="pform.nrzy"></el-input>
            </el-form-item>
          </div>
         <div id="address">   
            <el-form-item label="办理附件">
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
             <div class="ml-10"> <span class="toas">（温馨提示：上传附件个数每次不超过5个，每个附件最大10M，只支持上传后缀名包含（jpg/jpeg/gif/png/doc/docx/xls/xlsx/txt/pdf/ppt/pptx）的附件。图片数量过多时，可通过“合并图片”合并。）</span></div>
            </el-form-item>
          </div>
         <el-form-item label="答复部门" >
              <span>龙华区卫生健康局</span>
          </el-form-item>
          <el-form-item label="经办人">
               <span>张三</span>
          </el-form-item>
          <el-form-item label="答复时间" >
              <span>20120-1-1</span>
          </el-form-item>
          <div id="address">   
            <el-form-item label="答复情况">
              <el-input type="textarea" rows="4" v-model="pform.nrzy"></el-input>
            </el-form-item>
          </div>
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
        activeNames: ['1'],
        date:"",
        radio:"",
        pform:{},
        stat:'1',
        tableData:[]
      }
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
      btnOk(){
        this.$router.push({path: '/msg_examine'});
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
 #address  /deep/ .el-form-item{
    display: flex;
}

</style>