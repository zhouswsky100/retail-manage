<template>
     <ToolBar>
       <div id="notice">
        <el-form :inline="true"   :model="pform"  ref="msgForm" :rules="rules" label-position ="right" class="demo-form-inline">
          <div id="address">   
            <el-form-item label="告知形式" prop="inform_type">
             <el-radio v-model="pform.inform_type"  label="1">回访答复</el-radio>
             <el-radio v-model="pform.inform_type"  label="2">当面送达</el-radio>
              <el-radio v-model="pform.inform_type" label="3">其他</el-radio>
             <el-radio v-model="pform.inform_type"  label="4">电话通知</el-radio>
              <el-radio v-model="pform.inform_type" label="5">短信</el-radio>
             <el-radio  v-model="pform.inform_type"  label="6">邮件方式</el-radio>
            </el-form-item>
          </div>
          <div id="address">     
            <el-form-item label="告知信息"  prop="inform_info">
              <el-input type="textarea" rows="4" v-model="pform.inform_info"></el-input>
            </el-form-item>
         </div>
         <div id="address">   
            <el-form-item label="办理情况信息" >
              <el-input type="textarea" rows="4" v-model="pform.deal_report_info"></el-input>
            </el-form-item>
              <el-form-item label="办理情况报告文件" > 
                <div class="g-pl-10 "><el-button @click="dialogVisible=true" size="small" type="primary">选取模板</el-button></div>
               <div class="g-pl-10 "><p>{{pname}}</p></div>
             <div class="g-ml-10 ">
              <el-upload
                class="upload-demo"
                ref="upload1"
                 action="1"
                :on-change="fileLength"
                :file-list="pform.deal_report"
                :before-upload="getFile"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
             </div>
            </el-form-item>
         </div>
         <div id="address">   
            <el-form-item label="答复意见信息">
              <el-input type="textarea" rows="4" v-model="pform.answer_idea "></el-input>
            </el-form-item>
              <el-form-item label="答复意见信息文件" > 
             <div class="g-ml-10 ">
              <el-upload
                class="upload-demo"
                ref="upload2"
                 action="1"
                :on-change="fileLength"
                :file-list="pform.answer_report"
                :before-upload="getFile2"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
             </div>
            </el-form-item>
         </div>    
         <div id="address">   
            <el-form-item label="附件">
             <div class="g-ml-10 ">
              <el-upload
                class="upload-demo"
                ref="upload3"
                action="1"
                :before-upload="getFile3"
                :file-list="pform.encls"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              </el-upload>
             </div>
             <div class="g-ml-10 "> <span class="toas">（温馨提示：只能上传jpg/png文件，且不超过500kb）</span></div>
            </el-form-item>
          </div>
          <el-dialog
              title="选取模板"
              :visible.sync="dialogVisible"
              width="60%"
              >
              <el-select v-model="index" placeholder="请选取模板"  @change="getName">
                <el-option  v-for="(item,index) in selectList" :label="item.label" :value="item.value" :key="index"></el-option>
              </el-select>
              <div v-show="xFlg">
                  <p class="ptitle">信访事项不予受理告知书</p>
                  <p  class="red">{{wordData.name}}:</p>
                  <div>
                    你(们) <span class="red">{{wordData.time.split(' ')[0]}}</span> 来信反映 <span  class="red"> {{wordData.name}}</span> 来访表示：其于<span  class="red"> {{wordData.time.split('-')[0]}}</span> 年  {{wordData.xfList[index]}}
                    <p class="g-tac">特此告知。感谢你（们）对我局工作的支持</p>
                  </div>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog> 
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
        selectList:[        
          {label:"公民、法人、其他组织之间的民事纠纷",value:"0"},
          {label:"行政机关的具体行政行为不服农村土地承包经营纠纷",value:"1"},
          {label:"人民政府工作部门的具体行政不服",value:"2"},
          {label:"法律效力的行政、刑事判决、裁定、决定不服",value:"3"},
          {label:"法律效力的民事判决裁定调解书不服",value:"4"},
          {label:"劳动纠纷",value:"5"},
          {label:"人民大会及常务委员会",value:"6"},
          {label:	"土地、林地、林木所有权和使用权纠纷",value:"7"},
          {label:	"仲裁裁决不服",value:"8"},
          {label:	"已完成核查程序",value:"9"},
          {label:	"办理且还在规定办理期限内",value:"10"},
          {label:	"已完成处理、复查、复核程序的信访事项，该信访事项已终结",value:"11"},
          {label:	"越级到省走访",value:"12"}
        ],
        activeNames: ['1'],
        date:"",
        fileList:[],
        xFlg:false,
        radio:"",
        pform:{"inform_info":'','deal_report_info':'','inform_info':''},
        stat:'1',
        tableData:[],
        dialogVisible:false,
        endd:this.$route.query.endd,
        rules: {
          inform_type:[
            { required: true, trigger: 'blur',message: '告知形式必须选择' }
          ],
          inform_info:[
            { required: true, trigger: 'blur',message: '告知信息必须填写' }
          ],
          deal_report_info :[
            { required: true, trigger: 'blur',message: '处理信息必须填写' }

          ],
          deal_report:[
            { required: true, trigger: 'blur',message: '办理情况报告必须上传' }
          ],
          answer_report:[
            { required: true, trigger: 'blur',message: '答复意见书文件必须上传' }
          ],
           answer_idea:[
            { required: true, trigger: 'blur',message: '答复信息必须填写' }
          ],
          
        },
        formData:new FormData(),
        wordData:{
          "time":"2020-10-21",
          "name":"张三",
          "xfList":[
            "信访事项,属公民、法人、其他组织之间的民事纠纷/国家机关参与民事活动引起的民事纠纷。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此项事项不予受理。你（们）可依照《中华人民共和国仲裁法》/《中华人民共和国民事诉讼法》的规定向仲裁协议约定的仲裁委员会申请仲裁/向有管辖权的人民法院提起诉讼。",
            "信访事项,属对行政机关的具体行政行为不服的事项。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此项事项不予受理。你（们）可依照《中华人民共和国行政复议法》/《中华人民共和国行政诉讼法》的规定，向作出该行政行为的部门的上一级主管部门申请行政复议，或向有管辖权的人民法院提起诉讼。",
            "信访事项,属农村土地承包经营纠纷。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此项事项不予受理。你（们）可依照《中华人民共和国农村土地承包经营纠纷调解仲裁法》的规定，请求村民委员会、所在地乡（镇）人民政府等调解，或向所在地的农村土地承包仲裁委员会申请仲裁，或向有管辖权的人民法院提起诉讼。",
            "信访事项,属人民政府/人民政府工作部门的具体行政行为不服。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此项事项不予受理。你（们）可依照《中华人民共和国行政复议法》、《中华人民共和国行政诉讼法》的规定，向作出该行政行为的人民政府的上一级人民政府/作出该行政行为的部门的本级人民政府或者上一级主管部门申请行政复议，或向有管辖权的人民法院提前诉讼。",
            "信访事项,属对人民法院已经发生法律效力的行政/刑事判决/裁定/决定不服的事项。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此事项不予受理。请你（们）依照《中华人民共和国行政诉讼法》/《中华人民共和国刑事诉讼法》的规定向作出该行政/刑事判决/裁定/决定的人民法院的上一级人民法院或者其同级人民检察院提出申诉。",
            "信访事项,属对人民法院已经发生法律效力的民事判决/裁定/调解书不服的事项。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此事项不予受理。请你（们）依照《中华人民共和国民事诉讼法》的规定向作出该民事判决/裁定/调解书的人民法院的上一级人民法院申请再审。 ",
            "信访事项,属劳动者与用人单位之间的劳动纠纷。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此事项不予受理。请你（们）依照《中华人民共和国劳动争议调解仲裁法》的规定，向所在地人民调解组织申请调解，或向有处理权的劳动争议仲裁委员会申请仲裁，如不服仲裁裁决，请向有管辖权的人民法院提起诉讼。 ",
            "信访事项,属人民代表大会及其常务委员会、人民法院、人民检察院职权范围内的信访事项。根据《信访条例》第十五条、第二十一条和《广东省信访条例》第二十五条、第三十四条规定，我局对此事项不予受理，请向依法有权处理的人民代表大会及其常务委员会/人民法院/人民检察院提出。",
            "信访事项,属土地/林地/林木所有权和使用权纠纷。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此事项不予受理。对该纠纷，可由涉及纠纷的双方协商解决，如协商不成，可依照《中华人民共和国土地管理法》/《中华人民共和国森林法》的规定，提请有处理权的人民政府作出处理；如对该人民政府的处理决定不服，可依照《中华人民共和国行政复议法》、《中华人民共和国行政诉讼法》的规定，向其上一级人民政府申请行政复议，或向有管辖权的人民法院提起诉讼。",
            "信访事项,属对仲裁委员会作出的仲裁裁决不服的事项。根据《信访条例》第二十一条和《广东省信访条例》第三十条、第三十四条规定，我局对此事项不予受理。请你（们）依照《中华人民共和国仲裁法》、《中华人民共和国民事诉讼法》的规定，向有管辖权的人民法院提起诉讼。",
            "信访事项,属已完成核查程序的信访事项，该信访事项已终结。根据《广东省信访条例》第五十条规定，我局不再受理. ",
            "信访事项,属正由办理且还在规定办理期限内的信访事项。根据《信访条例》第十六条和《广东省信访条例》第六十四条规定，我局对你（们）本次提出的信访事项不予重复受理，请你（们）耐心等候的办理结果。",
            "信访事项,属已完成处理、复查、复核程序的信访事项，该信访事项已终结。根据《信访条例》第三十五条和《广东省信访条例》第四十九条规定，我局不再受理。",
            "信访事项,属应首先向提出而未提出的越级到省走访事项。根据《广东省信访条例》第三十二条、第六十四条规定，我局对此事项不予受理，请你（们）到本人居住地或事情发生地信访部门反映有关诉求。",
            "信访事项," ]
        },
        index:"",
        pname:"",
        deal_report:'',
        deal_report2:''
      }
    },
    methods: {
      submitUpload() {
        this.$refs.upload1.submit();
        this.$refs.upload2.submit();
        this.$refs.upload3.submit();
      },
      btnOk(){
          this.$refs['msgForm'].validate((valid) => {
            if(valid){
                this.submitUpload()
                this.formData.append('inform_type',this.pform.inform_type);
                this.formData.append('inform_info', this.pform.inform_info);
                this.formData.append('answer_idea', this.pform.answer_idea);
                // this.wordData.xfList = this.wordData.xfList[this.index]
                // this.wordData.pname = this.pname
                // this.pform.deal_report_info =  '你(们)'+this.wordData.time.split(' ')[0]+'来信反映'+this.wordData.name+'来访表示其于'+this.wordData.time.split('-')[0]+'年'+this.wordData.xfList[this.index]+
                this.formData.append('deal_report_info', this.pform.deal_report_info);
                this.formData.append('deal_report_demo',JSON.stringify(this.wordData.xfList[this.index]));     
                if(this.deal_report!='1'){ //有文件选择
                  if(this.pform.deal_report_info==undefined){
                    this.$message.error('必须选择文件或填写文案');
                    return false
                  }
                }
                if(this.deal_report2=='2'){//有文件选择
                  if(this.pform.answer_idea==undefined){
                    this.$message.error('必须选择文件或填写文案');
                    return false
                  }
                }
                this.getHttpPost(this.formData,'inform',true,'post','file').then(res => {
                if(res.code==0){
                      this.$message({
                      message: '提交成功',
                      type: 'success'
                    }); 
                    this.$router.push({path:'/msg_success', query:{ name:'您的信件已处理完成'}})
                }
                },error=>{
                  this.$message.error('网络开小差了');
                })
              
            }
          });
      },
      getName(val){
        this.xFlg = true
        this.pname = this.selectList[val].label
        this.wordData.pname = this.pname
        this.pform.deal_report_info =  '你(们)'+this.wordData.time.split(' ')[0]+'来信反映'+this.wordData.name+'来访表示其于'+this.wordData.time.split('-')[0]+'年'+this.wordData.xfList[this.index]+''

      },
      fileLength(file, fileList){
        const isLt20M = file.size / 1024 / 1024 < 20;
        if(fileList){
           if (fileList.length > 1) {
              fileList.splice(0, 1);
            }
        }
        this.pform.deal_report = file
      },
      initData(){
        this.getHttpPost({},'msgDetail',true,'get').then(res => {
          if(res.code==0){
              this.wordData.time = res.data.xf_time
              this.wordData.name = res.data.petitioner
            }else{
              this.$message.error(res.msg);
            }
          },error=>{
            this.$message.error('网络开小差了');
          })
      },
      fileLength2(file, fileList){
        const isLt20M = file.size / 1024 / 1024 < 20;
        if(fileList){
           if (fileList.length > 1) {
              fileList.splice(0, 1);
            }
        }
       this.pform.answer_report = file
      },
      getFile(file){
        this.formData.append('deal_report', file);
        this.deal_report = '1'
      },
      getFile2(file){
        this.formData.append('answer_report', file);
        this.deal_report2 = '2'
      },
      getFile3(file){
        this.formData.append('encls', file);
      }
    },
    mounted() {               
      this.initData()
      this.pform.inform_info = this.$route.query.xfname+'：您反映的业务编号为'+this.$route.query.ywbm+'的信访事项已收悉，请耐心等待回复。【龙华区卫生健康局】' 
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
    width: 130px;
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
.ptitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
}
.red{
  color: red;
}
</style>