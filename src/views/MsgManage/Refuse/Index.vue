<template>
     <ToolBar>
      <el-form :inline="true"  ref="msgForm" :rules="rules" :model="pform"  label-position ="right" class="demo-form-inline">
          <el-form-item label="不予受理的类型" prop="refuse_type" >
             <div>  <el-radio v-model="pform.refuse_type" label="1">1公民、法人、其他组织之间的民事纠纷。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="2">2行政机关的具体行政行为不服。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="3">3农村土地承包经营纠纷。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="4">4人民政府工作部门的具体行政不服。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="5">5法律效力的行政、刑事判决、裁定、决定不服。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="6">6法律效力的民事判决裁定调解书不服。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="7">7劳动纠纷。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="8">8人民大会及常务委员会。</el-radio></div>
             <div>  <el-radio v-model="pform.refuse_type" label="9">9土地、林地、林木所有权和使用权纠纷。</el-radio></div>
             <div> <el-radio v-model="pform.refuse_type"  label="10">10仲裁裁决不服。</el-radio></div>
             <div> <el-radio v-model="pform.refuse_type"  label="11">11已完成核查程序</el-radio></div>
             <div> <el-radio v-model="pform.refuse_type"  label="12">12办理且还在规定办理期限内</el-radio></div>
             <div> <el-radio v-model="pform.refuse_type"  label="13">13已完成处理、复查、复核程序的信访事项，该信访事项已终结</el-radio></div>
             <div> <el-radio v-model="pform.refuse_type"  label="14">14越级到省走访</el-radio></div>
          </el-form-item>
           <!-- <div> 
              <el-form-item label="不予受理的原因" prop="refuse_reason">
                  <el-select v-model="pform.refuse_reason" placeholder="请选择办理方式">
                      <el-option label="办理1" value="办理1"></el-option>
                  </el-select>
              </el-form-item>
          </div> -->
          <div id="address">   
            <el-form-item label="不予受理依据" prop="refuse_basic">
                  <el-input type="textarea" rows="4" v-model="pform.refuse_basic"></el-input>
            </el-form-item>
          </div>
      </el-form>
      <div class="btnflx">
            <el-button type="primary" @click="btnOk">确认</el-button>
            <span >处理期限:{{endd}}</span>
      </div>
    </ToolBar>
</template>
<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
        radio:"",
        pform:{refuse_method:"不予受理",refuse_reason:"不予受理"},
        stat:'1',
        endd:this.$route.query.endd,
        tableData:[],
        rules: {
          refuse_type:[
            { required: true, trigger: 'blur',message: '不予受理的类型必须选择' }
          ],
          refuse_reason:[
            { required: true, trigger: 'blur',message: '不予受理的原因必须选择' }
          ],
          refuse_basic:[
            { required: true, trigger: 'blur',message: '不予受理依据必须选择' }
          ],
        }
      }
    },
    methods: {
          btnOk(){
              this.$refs['msgForm'].validate((valid) => {
                if(valid){
                   this.getHttpPost(this.pform,'refuse',true,'post').then(res => {
                    if(res.code==0){
                          this.$message({
                          message: '提交成功',
                          type: 'success'
                        }); 
                        this.$router.push({path:'/msg_notice', query:{ endd:this.endd}})
                    }
                    },error=>{
                      this.$message.error('网络开小差了');
                    })
                  
                }
             });
          }
    },
    components: {
        ToolBar
    }
  }
</script>
<style lang="less">
  .menu /deep/ .el-range-separator {
    width: 8%;

  }
  .menu /deep/  .el-range-editor.el-input__inner {
    height: 36px;
    padding: 0px;
    width: 240px;
  }
  .menu /deep/  .el-input--small .el-input__inner{
    height: 36px;
  }
  .meun /deep/ .el-range-editor .el-range-input{
    font-size: 13px;
  }
  .menu2{
    display: flex;
    padding: 10px;
    color: #9AAAAC;
    span{
      font-size:12px;
    }
  }
  .exmsg{ 
    background: #ecf5ff;
    color: #409eff;
    border: 1px solid #d9ecff;
    padding: 0px 8px 0px 8px;
    border-radius: 5px;
    margin-right: 5px;
    font-size: 10px;
  }
  .ebtn{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;
    position: relative;
    top: 20px;
    right: -65px;
    margin-left: 35px;
  }
  .menu2 img{
    height: 18px;
    width:18px;
  }

  .menu /deep/  .el-date-editor .el-range-input{
    width:30%
  }

   .menu /deep/  .el-date-editor .el-range__icon{
     margin-left: 20px;
   }
   .ae8{
    color: #356AE8;
   }
   .el-input__inner{
    width:150px;
   }
   #address   .el-input__inner{
     width:700px;
   }
   
   .el-collapse-item__header{
     font-weight: bold;
   }
   .el-form-item__label{
     width: 130px;
   }
   #address  textarea{
     width: 700px;
   }
   .dh  .el-form-item__label{
      width: 100px;
      margin-left: -70px;
    }
    .dh2  .el-form-item__label{
      width: 110px;
   }
   #up .el-form-item__label{
      width: 100px;
      margin-left: -100px;
   }
   .btnbg{
      background: #AEB4C2;
      opacity: 0.7;
      width: 100%;
      position: fixed;
      bottom: 50px;
   }
   .btn{
      color: #fff;
      background-color: #3c8dbc;;
      border-color: #3c8dbc;;
      z-index: 115;
      padding: 5px 10px 5px 10px;
      border-radius: 6px;
      margin-left: 10px;
      margin: 5px 10px;
   }
   .fff{
      color: #fff;
      background-color: #409eff;
      border: 1px solid #409eff;
      position: relative;
      left: -45px;
   }
   .f40{
     position: relative;
     left: -45px;
   }
   .btnflx{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
   }
</style>