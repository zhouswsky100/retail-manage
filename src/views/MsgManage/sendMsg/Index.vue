<template>
     <ToolBar>
       <div>
          <p class="title">您的信件已暂存到草稿箱</p>
           <el-button type="primary" @click="goUrl('/msg_notice')">申请办结</el-button>
           <el-button type="primary" @click="goUrl('/msg_refuse')">不予处理</el-button>
           <el-button type="primary" @click="goUrl('/msg_zb','1')">转办</el-button>

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
        tableData:[],
        endd:this.$route.query.endd,

      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      goUrl(url,type){
          this.$router.push({path:url, query:{ endd:this.endd,type:type}})
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
.title{
    font: bold 16px Verdana;
    color: #4a8f00;
    padding: 20px;
    text-align: center;
}

</style>