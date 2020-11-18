<template>
     <ToolBar>
       <!-- <p class="g-fz-16 ">信访办理结果审核呈批表</p> -->
      <div id="notice">
        <el-form :inline="true"   :model="pform"  :rules="rules"   label-position ="right" class="demo-form-inline">
          <!-- <el-form-item label="业务编号" >
              <span>深常信[2019]0060号</span>
          </el-form-item>
          <el-form-item label="信访人" >
              <span>测试</span>
          </el-form-item> -->
          <!-- <el-form-item label="受理日期">
              <span>{{endd}}</span>
          </el-form-item> -->
          <div id="address">   
            <el-form-item label="经办人意见" prop="deal_idea">
              <el-input type="textarea" rows="4" v-model="pform.deal_idea"></el-input>
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
       pform:{ expire_time:this.$route.query.endd,},
       rules: {
          deal_idea:[
            { required: true, trigger: 'blur',message: '经办人意见必须填写' }
          ],
        }
      }
    },
    methods: {
      btnOk(){
       this.getHttpPost(this.pform,'complete',true,'post').then(res => {
          if(res.code==0){
              this.$router.push({path:'/msg_success', query:{ name:'您的信件已处理完成'}})
          }
          },error=>{
            this.$message.error('网络开小差了');
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
    width: 100px;
    font-size: 14px;
    color: #7d7d7d
}
.toas {
    color: #fe5c5c;
    font-size: 12px;
    line-height: 0px;
}
.ml-50{
    margin-left: 50px;
}

</style>