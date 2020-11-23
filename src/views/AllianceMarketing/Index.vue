<template>
  <div >
   <div class="bgimg"></div>
   <div class="box">
      <el-collapse v-model="activeNames">
       <el-form :inline="true" :rules="rules"  :model="pform" ref="msgForm"  label-position ="top" class="demo-form-inline">
        <el-collapse-item title="Contact Information" name="1" style="margin-top: 20px;padding-left: 30px;">
              <el-form-item label="First Name" prop="fname">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Last Name" prop="lname">
                  <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Email" prop="Email"
                :rules="[
                    { type: 'email', message: 'Please enter the correct email address', trigger: ['blur', 'change'] }
                  ]"
              >
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Legal Entity Type" prop="ltype">
                <el-select v-model="pform.sex" placeholder="" style="width:440px">
                  <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
                </el-select>
              </el-form-item>
                <el-form-item label="Company/Individua/" prop="ci">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Website/Social Med" prop="wsm">
                 <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
        </el-collapse-item>
        <el-collapse-item title="Mailing Address" name="2" style="margin-top: 20px;padding-left: 30px;">
              <el-form-item label="Address Line 1" prop="name">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Address Line 2" prop="sex">
                  <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="City" prop="name">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
              <el-form-item label="Zip/Postal Code" prop="sex">
                <el-select v-model="pform.sex" placeholder="" style="width:440px">
                  <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
                </el-select>
              </el-form-item>
                <el-form-item label="Country" prop="name">
                    <el-select v-model="pform.sex" placeholder="Select Country" style="width:440px">
                      <el-option label="?" value="?"></el-option>
                    </el-select>              
                </el-form-item>
              <el-form-item label="Phone Number" prop="sex">
                 <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
        </el-collapse-item>
         <el-collapse-item title="Billing" name="3" style="margin-top: 20px;padding-left: 30px;">
              <el-form-item label="Tax ID / VAT or SSN" prop="name">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
        </el-collapse-item>
         <el-collapse-item title="Additional Informati" name="4" style="margin-top: 20px;padding-left: 30px;">
              <el-form-item label="Referral Code" prop="name">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
               <el-form-item label="PayPal Email" prop="name">
                <el-input v-model="pform.name" placeholder="" style="width:440px"></el-input>
              </el-form-item>
        </el-collapse-item>
         <el-collapse-item title="Billing" name="5" style="margin-top: 20px;padding-left: 30px;">
              <el-form-item label="Describe the sites and methods used to advertise" prop="name">
                  <el-input type="textarea" style="width:900px" rows="7" v-model="pform.nrzy" placeholder=""></el-input>
              </el-form-item>
        </el-collapse-item>
         </el-form>
      </el-collapse>
   </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pform:{},
        activeNames: ['1','2','3','4','5'],
        rules: {
          username:  [{ required: true, message: '账号必须输入', trigger: 'blur' }],
          sex: [{ required: true, message: '性别必须选择',trigger: 'blur' }],
        },
      }
    },
    components: {
    },
    methods: {    
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
    },
    filters:{
 
    },
  }
</script>
<style lang="less">
.bgimg{
    display: inline-block;
    background: url("../../assets/imgs/almk.png") center no-repeat;
    background-size: contain;
    height: 300px;
    width: 100%;
    margin-top: -50px;
}
.box{
    width: 80%;
    margin: 0 auto;
    box-shadow: 0px 0px 30px 0px rgba(101, 101, 101, 0.14);
    padding: 20px;
}
.box /deep/ .el-collapse-item__header{
      height: 42px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #0D253E;
}
.box /deep/ .el-collapse{
  border: none;
}
</style>
