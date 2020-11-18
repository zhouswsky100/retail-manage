<template>
  <div class="msg">
    <ToolBar>
        <el-radio-group v-model="stat" style="margin-bottom: 30px;" @change="showTab">
          <el-radio-button label="1"  > 信息录入</el-radio-button>
          <el-radio-button label="2"  >判重</el-radio-button>
          <el-radio-button label="3"  >联名名单</el-radio-button>
        </el-radio-group>
        <div v-show="stat=='1'">
          <el-collapse v-model="activeNames">
            <el-collapse-item title="受访人信息" name="1" style="margin-top: -20px">
              <el-form :inline="true" :rules="rules"  :model="pform" ref="msgForm"  label-position ="right" class="demo-form-inline">
                  <el-form-item label="姓名" prop="name">
                    <el-input v-model="pform.name" placeholder="姓名" style="width:192px"></el-input>
                  </el-form-item>
                  <el-form-item label="性别" prop="sex">
                    <el-select v-model="pform.sex" placeholder="请选择性别" style="width:192px">
                      <el-option label="男" value="男"></el-option>
                      <el-option label="女" value="女"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件类型" >
                    <el-select v-model="pform.cret_type" placeholder="请选择证据类型">
                      <el-option label="身份证" value="身份证"></el-option>
                      <el-option label="护照" value="护照"></el-option>
                      <el-option label="军官证" value="军官证"></el-option>
                      <el-option label="士官证" value="士官证"></el-option>
                      <el-option label="港澳通行证" value="港澳通行证"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="证件号码" >
                    <el-input v-model="pform.cret_num" placeholder="证件号码"></el-input>
                  </el-form-item>
                  <el-form-item label="固定电话">
                    <el-input v-model="pform.phone" placeholder="固定电话" style="width:192px"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="pform.mobile" placeholder="手机号" style="width:208px"></el-input>
                  </el-form-item>
                    <el-form-item label="电子邮箱"
                       prop="email"
                       :rules="[
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                  ]">
                    <el-input v-model="pform.email" placeholder="电子邮箱"></el-input>
                  </el-form-item>
                    <el-form-item label="详细地址">
                      <el-input v-model="pform.addressDetail" style=" width: 515px;"   placeholder="详细地址">"></el-input>
                    </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="信件信息" name="2" >
              <el-form :inline="true" :model="pform" :rules="rules" label-position ="right" ref="msgForm2" class="demo-form-inline">
                  <el-form-item label="信访人数"  prop="pnum" >
                    <el-input v-model="pform.pnum" placeholder="信访人数"  style="width:208px"></el-input>
                  </el-form-item>
                  <el-form-item label="信访日期"  prop="begind">
                      <el-date-picker
                      style="width:208px"
                          v-model="pform.begind"
                          type="date"
                          @change="initEnd"
                          :picker-options="pickerOptions"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd"
                          placeholder="选择日期">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="信访形式" prop="style">
                    <el-select v-model="pform.style" placeholder="请选择信访形式">
                      <el-option label="来访" value="来访"></el-option>
                      <el-option label="来电" value="来电"></el-option>
                      <el-option label="来信" value="来信"></el-option>
                      <el-option label="系统来件" value="系统来件"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="所属系统" prop="sys">
                    <el-select v-model="pform.sys" placeholder="请选择所属系统" style="width:208px">
                      <el-option label="深圳市12345" value="深圳市12345"></el-option>
                      <el-option label="区信访信息系统" value="区信访信息系统"></el-option>
                      <el-option label="来电" value="来电"></el-option>
                      <el-option label="来信" value="来信"></el-option>
                      <el-option label="来访" value="来访"></el-option>
                      <el-option label="网格通" value="网格通"></el-option>
                      <el-option label="市卫生健康委" value="市卫生健康委"></el-option>
                      <el-option label="书记信箱" value="书记信箱"></el-option>
                      <el-option label="区长信箱" value="区长信箱"></el-option>
                      <el-option label="广东省卫生健康委" value="广东省卫生健康委"></el-option>
                      <el-option label="深圳市网上信访信息系统" value="深圳市网上信访信息系统"></el-option>
                      <el-option label="其它" value="其它"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="一级分类" >
                    <el-select v-model="pform.category1" placeholder="请选择一级分类" @change="showSelect">
                      <el-option label="医疗管理服务" value="0"></el-option>
                      <el-option label="公共卫生" value="1"></el-option>
                      <el-option label="卫生监督" value="2"></el-option>
                      <el-option label="人事管理" value="3"></el-option>
                      <el-option label="计生" value="4"></el-option>
                      <el-option label="家妇" value="5"></el-option>
                      <el-option label="扫黑除恶" value="6"></el-option>
                      <el-option label="其它" value="7"></el-option>
                    </el-select>
                  </el-form-item>
                   <el-form-item label="二级分类" >
                    <el-select v-model="pform.category2" placeholder="请选择二级分类" style="width:208px">
                     <el-option v-for="item in slist" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="限办日期">
                      <el-date-picker
                          v-model="endd"
                          style="width:208px"
                          type="date"
                          value-format="yyyy-MM-dd"
                          format="yyyy 年 MM 月 dd 日"
                          placeholder="限办日期">
                      </el-date-picker>
                  </el-form-item>
                  <el-form-item label="受理时间">
                      <el-date-picker
                          v-model="handd"
                          style="width:208px"
                          type="date"
                          value-format="yyyy-MM-dd"
                          format="yyyy 年 MM 月 dd 日"
                          placeholder="受理时间">
                      </el-date-picker>
                  </el-form-item>
                  <span id="up">
                    <el-form-item label="上级交办" >
                     <el-radio-group v-model="pform.radio">
                              <el-radio label="true">是</el-radio>
                              <el-radio label="false">否</el-radio>
                     </el-radio-group>
                    </el-form-item>
                  </span>
                    <el-form-item label="涉事机构列表" >
                      <el-select v-model="pform.refer_dp2"  style=" width: 200px;" @change="getAddress()">
                        <el-option label="龙华区人民医院"    value="龙华区人民医院"></el-option>
                        <el-option label="龙华区中心医院"    value="龙华区中心医院"></el-option>
                        <el-option label="龙华区妇幼保健院"  value="龙华区妇幼保健院"></el-option>
                        <el-option label="龙华区疾控中心"    value="龙华区疾控中心"></el-option>
                        <el-option label="龙华区慢病中心"    value="龙华区慢病中心"></el-option>
                        <el-option label="龙华区卫生监督所"  value="龙华区卫生监督所"></el-option>
                      </el-select>
                    </el-form-item>
                  <el-form-item label="涉事机构">
                    <el-input v-model="pform.refer_dp"  style="width:208px"  placeholder="涉事机构"></el-input>
                  </el-form-item>
                  <el-form-item label="涉事机构地址" >
                    <el-input v-model="pform.refer_dp_addr" style="width:230px"  placeholder="涉事机构地址"></el-input>
                  </el-form-item>
              </el-form>
            </el-collapse-item>
            <el-collapse-item title="信访事项信息" name="3">
              <el-form :inline="true" :model="pform" ref="msgForm3"  :rules="rules" label-position ="right" class="demo-form-inline">
                    <el-form-item label="问题属地" >
                      <el-input v-model="pform.faqa" style=" width: 200px;" disabled placeholder="龙华">"></el-input>
                    </el-form-item>
                    <el-form-item label="信访性质" prop="xfxz">
                      <el-select v-model="pform.xfxz"  style=" width: 200px;" >
                        <el-option label="投诉" value="投诉"></el-option>
                        <el-option label="咨询" value="咨询"></el-option>
                        <el-option label="举报" value="举报"></el-option>
                        <el-option label="意见建议" value="意见建议"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="性质分类" prop="cfl">
                      <el-select v-model="pform.cfl"  style=" width: 200px;" >
                        <el-option label="医疗管理服务" value="医疗管理服务"></el-option>
                        <el-option label="公共卫生" value="公共卫生"></el-option>
                        <el-option label="卫生监督" value="卫生监督"></el-option>
                        <el-option label="人事管理" value="人事管理"></el-option>
                        <el-option label="计生" value="计生"></el-option>
                        <el-option label="家妇" value="家妇"></el-option>
                        <el-option label="扫黑除恶" value="扫黑除恶"></el-option>
                        <el-option label="其它" value="其它"></el-option>
                      </el-select>
                    </el-form-item>    -->
                      <el-form-item label="涉法涉诉标志"  prop="sfss" label-width="130px">
                          <el-radio-group v-model="pform.sfss"  style=" width: 170px;">
                            <el-radio label="true">是</el-radio>
                            <el-radio label="false">否</el-radio>
                          </el-radio-group>
                      </el-form-item>
                      <el-form-item label="概况信息" prop="gkxx">
                            <el-input v-model="pform.gkxx" style=" width: 515px;"  placeholder="概况信息">"></el-input>
                      </el-form-item>
                  <div id="address">   
                    <el-form-item label="内容摘要" prop="nrzy">
                          <el-input type="textarea" rows="4" v-model="pform.nrzy" placeholder="内容摘要"></el-input>
                    </el-form-item>
                  </div>
                  <div id="address2">   
                    <el-form-item label="备注">
                          <el-input type="textarea" rows="4" v-model="pform.desc" ></el-input>
                    </el-form-item>
                  </div>
                  <div id="address">   
                    <el-form-item label="附件">
                    <div class="g-ml-10 ">
                      <el-upload
                        class="upload-demo"
                        ref="upload1"
                        action="1"
                        :before-upload="getFile3"
                        :file-list="FileList"
                        :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                      </el-upload>
                    </div>
                    <div class="g-ml-10 "> <span class="toas">（温馨提示：只能上传jpg/png文件，且不超过5mb）</span></div>
                    </el-form-item>
                  </div>
              </el-form>
            </el-collapse-item>
            <div class="btnflx">
              <el-button type="primary" @click="addMsg">保存</el-button>
              <span >处理期限:{{endd}}</span>
            </div>
          </el-collapse>
        </div>
        <div v-show="stat=='2'">
          <div style="border-bottom: solid 1px #ddd;" class="table">
            <el-form  :inline="true"  :model="searchParams"  label-position ="right" class="demo-form-inline" >
                <el-form-item label="信访人">
                  <el-input v-model="searchParams.petitioner" placeholder="信访人" ></el-input>
                </el-form-item>
                <el-form-item label="信访形式" >
                  <el-select v-model="searchParams.xf_type" placeholder="请选择信访形式">
                    <el-option label="来访" value="来访"></el-option>
                    <el-option label="来电" value="来电"></el-option>
                    <el-option label="来信" value="来信"></el-option>
                    <el-option label="系统来件" value="系统来件"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="信访来源" >
                  <el-select v-model="searchParams.xf_origin" placeholder="请选择信访来源">
                    <el-option label="深圳市12345" value="深圳市12345"></el-option>
                    <el-option label="区信访信息系统" value="区信访信息系统"></el-option>
                    <el-option label="来电" value="来电"></el-option>
                    <el-option label="来信" value="来信"></el-option>
                    <el-option label="来访" value="来访"></el-option>
                    <el-option label="网格通" value="网格通"></el-option>
                    <el-option label="市卫生健康委" value="市卫生健康委"></el-option>
                    <el-option label="书记信箱" value="书记信箱"></el-option>
                    <el-option label="区长信箱" value="区长信箱"></el-option>
                    <el-option label="广东省卫生健康委" value="广东省卫生健康委"></el-option>
                    <el-option label="深圳市网上信访信息系统" value="深圳市网上信访信息系统"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="涉事机构">
                      <el-input v-model="searchParams.refer_dp"   placeholder="涉事机构"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="showTable('0')">查询</el-button>
                  <el-button  @click="showTable('1')">重置</el-button>
                </el-form-item>
            </el-form>
           </div>
            <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                v-loading="loading"
              >
              <el-table-column
                prop="petitioner"
                label="信访人"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="ywbm"
                label="业务编号"
                show-overflow-tooltip>
              </el-table-column>
                <el-table-column
                prop="xf_type"
                label="信访形式"
                show-overflow-tooltip>
              </el-table-column>
              <el-table-column
                prop="expire_time"
                label="处理期限"
                show-overflow-tooltip>
              </el-table-column>
            </el-table>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNum"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
        </div>
        <div v-show="stat=='3'">
          <div class="h-dc g-mb-10" @click="addPlist">
            <i class="el-icon-plus icos"></i>
              <span class="ctext">添加人员</span>
          </div>
          <div class="d-fx">
            <el-form  :inline="true"  ref="tempForm" :model="tempForm" :rules="rules" label-position ="right" class="demo-form-inline" >
               <el-form-item label="姓名"   prop="name">
                <el-input v-model="tempForm.name" placeholder="姓名"></el-input>
              </el-form-item>
               <el-form-item label="证件号码"  >
                <el-input v-model="tempForm.cret_num" placeholder="证件号码"></el-input>
              </el-form-item>
               <el-form-item label="地址">
                <el-input v-model="tempForm.address" placeholder="地址"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-left: 50px;">
           <el-table
              :data="pform.relate_users"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="姓名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="cret_num"
                label="证件号码"
                width="180">
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址">
              </el-table-column>
            </el-table>
          </div>
        </div>
    </ToolBar>
  </div>
</template>

<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  export default {
    data() {
      return {
        pickerOptions: {
            disabledDate(time) {
              return time.getTime() < Date.now()- 24 * 60 * 60 * 1000;
            }
        },
        searchParams:{},
        activeNames: ['1'],
        date:"",
        radio:"",
        total:0,
        FileList:[],
        formData:new FormData(),
        pageNum:1,
        loading:false,
        pageSize:10,
        pform:{relate_users:[],cret_type:"",cret_num:"",addressDetail:"",refer_dp:'',refer_dp_addr:''},
        rules: {
          name:[
            { required: true, trigger: 'blur',message: '姓名必须输入' }
          ],
          sex:[
            { required: true, trigger: 'blur',message: '性别必须选择' }
          ],
          // cret_type:[
          //   { required: true, trigger: 'blur',message: '证件类型必须选择' }
          // ],
          // cret_num:[
          //   { required: true, trigger: 'blur',message: '证件号必须熟人' }
          // ],
          mobile:[
            { required: true, trigger: 'blur',message: '手机号必须输入' },
            { min: 11,  message: '请输入正确的手机号', trigger: 'blur' }

          ],
          // addressDetail:[
          //   { required: true, trigger: 'blur',message: '地址必须输入' }
          // ],
          pnum:[
            { required: true, trigger: 'blur',message: '信访人数必须输入' }

          ],
          begind:[
            { required: true, trigger: 'blur',message: '信访日期必须选择' }

          ],
          endd:[
            { required: true, trigger: 'blur',message: '限办日期必须选择' }

          ],
          sys:[
            { required: true, trigger: 'blur',message: '所属系统必须选择' }

          ],
          style:[
            { required: true, trigger: 'blur',message: '信访形式必须选择' }

          ],
          cfl:[
            { required: true, trigger: 'blur',message: '性质分类必须选择' }

          ] ,
          faqa:[
            { required: true, trigger: 'blur',message: '问题属地的必须输入' }

          ],
          contsys:[
            { required: true, trigger: 'blur',message: '内容分类必须选择' }

          ] ,
          ls:[
            { required: true, trigger: 'blur',message: '律师参与必须选择' }

          ] ,
          xfxz:[
            { required: true, trigger: 'blur',message: '信访性质必须选择' }

          ] ,
          istot:[
            { required: true, trigger: 'blur',message: '是否扬言必须选择' }
          ] ,
          sfss:[
            { required: true, trigger: 'blur',message: '涉法涉诉必须选择' }

          ] ,
          ccbz:[
            { required: true, trigger: 'blur',message: '初次标志是否选择' }

          ]  ,
          gkxx:[
            { required: true, trigger: 'blur',message: '概况信息是否选择' }
          ] ,
          nrzy:[
            { required: true, trigger: 'blur',message: '内容摘要必须选择' }
          ],
        },
        stat:'1',
        tableData:[],
        endd:'',
        handd:'',
        FileFlg:false,
        tempForm:{},
        slist:[],
         alllist:{
          0:[{label:"医疗纠纷",value:"0"},{label:"诊疗操作规范",value:"1"},{label:"医院管理（社康人员、设备、制度",value:"2"},{label:"规划设置",value:"3"},{label:"其他",value:"4"}],
          1:[{label:"预防接种",value:"0"},{label:"体检",value:"1"},{label:"办证",value:"2"},{label:"制度流程",value:"3"},{label:"其他",value:"4"}],
          2:[{label:"无证行医",value:"0"},{label:"超范围经营",value:"1"},{label:"过度医疗",value:"2"},{label:"医疗欺诈",value:"3"},{label:"强迫交易",value:"4"},{label:"一般纠纷举报",value:"5"},{label:"医托",value:"6"},{label:"职业卫生",value:"7"},{label:"诊疗操作规范",value:"8"},{label:"控烟",value:"9"},{label:"公共场所无证经营",value:"10"},{label:"其他",value:"11"}],
          3:[{label:"职称职务",value:"0"},{label:"工资福利",value:"1"},{label:"服务态度（医德医风）",value:"2"},{label:"纪检",value:"3"},{label:"其他",value:"4"}],
          6:[{label:"计生",value:"0"}],
          7:[{label:"家妇",value:"0"}],
          8:[{label:"医学美容",value:"0"},{label:"口腔诊所",value:"1"},{label:"医学两非美容",value:"2"},{label:"黑诊所",value:"3"},{label:"无证公共场所",value:"4"}],
          9:[{label:"其他",value:"0"}],
        } 
      }
    },
    methods: {
      addMsg(){
         this.$refs['msgForm'].validate((valid) => {
            if (valid) {
                this.$refs['msgForm2'].validate((valid) => {
                   if (valid) {
                      this.$refs['msgForm3'].validate((valid) => {
                        if(valid){
                            let param ={
                                "petitioner": this.pform.name,
                                "gender": this.pform.sex,
                                "cret_type": this.pform.cret_type,
                                "cret_num": this.pform.cret_num,
                                "tel": this.pform.phone,
                                "mobile": this.pform.mobile,
                                "email": this.pform.email,
                                "address": this.pform.addressDetail,
                                "relate_users":this.pform.relate_users,
                                "people_num": this.pform.pnum,
                                "xf_type": this.pform.style,
                                "xf_origin": this.pform.sys,
                                "is_sjzb": this.pform.radio,
                                "is_dhqj": this.pform.dhradio,
                                "xf_time": this.pform.begind+' '+'00:00:00',
                                "expire_time": this.endd+' '+'00:00:00',
                                "xf_area": '龙华',
                                "xf_nature": this.pform.xfxz,
                                // "category_by_nature": this.pform.cfl,
                                "is_lawyer_joined": this.pform.ls,
                                "is_threat": this.pform.istot,
                                "is_law_related": this.pform.sfss,
                                "is_first": this.pform.ccbz,
                                "abstract": this.pform.gkxx,
                                "desc": this.pform.nrzy,
                                "refer_dp":this.pform.refer_dp,
                                "remark": this.pform.desc,
                                "refer_dp_addr":this.pform.refer_dp_addr,
                                "category1":this.pform.category1,
                                "category2":this.pform.category2,
                                "receive_time":this.handd+' '+'00:00:00',
                              }
                            this.getHttpPost(param,'msgAdd',true,'Post').then(res => {
                                  if(res.code==0){
                                    this.$message({
                                      message: '登记成功',
                                      type: 'success'
                                    });
                                    sessionStorage.msg_id = res.data.id
                                    this.$refs.upload1.submit();
                                    if(this.FileFlg){
                                          this.getHttpPost(this.formData,'uploadfile',true,'post','file').then(res => {

                                          },error=>{
                                            this.$message.error('网络开小差了');
                                          }) 
                                    }
                                    this.$router.push({path:'/msg_send', query:{ endd:this.endd}})


                                  }else{
                                    this.$message.error('登记失败');
                                  }
                                },
                                error => { 
                                  this.loginLoading = false;
                                  this.$message.error('网络开小差了');
                                  console.log(error); 
                                })
                        }
                      });
                   } 
                });
            } 
         });
      },
      getAddress(){
         this.pform.refer_dp = this.pform.refer_dp2 
        if(this.pform.refer_dp =='龙华区人民医院'){
          this.pform.refer_dp_addr = '深圳市龙华区建设东路'
        }else if(this.pform.refer_dp =='龙华区中心医院'){
          this.pform.refer_dp_addr = '深圳市龙华区观澜大道187号'
        }else if(this.pform.refer_dp =='龙华区妇幼保健院'){
          this.pform.refer_dp_addr = '深圳市龙华区大浪街道华旺路68号'
        }else if(this.pform.refer_dp =='龙华区疾控中心'){
          this.pform.refer_dp_addr = '深圳龙华区龙观东路96号'
        }else if(this.pform.refer_dp =='龙华区慢病中心'){
          this.pform.refer_dp_addr = '广东省深圳市龙华区观澜街道观澜大道118号'
        }else if(this.pform.refer_dp =='龙华区卫生监督所'){
          this.pform.refer_dp_addr = '深圳市龙华办事处清湖社区华清路325号'
        }
      },
      initEnd(){
        this.endd = this.$rkUtil.getNextDate(this.pform.begind,60)
        this.handd = this.$rkUtil.getNextDate(this.pform.begind,15)
      },
      getFile3(file){
        if(file==undefined||file==null||file==null){
            return
        }
        this.FileFlg = true
        this.formData.append('file', file);
      },
      showSelect(index){
        this.slist = this.alllist[index]
      },
      showTable(type){
          if(type==0){
            this.initData()
            this.drawer = false
          }else{
            this.searchParams={}
            this.tableData = []
          }
      },
      initData(){
          this.loading = true;
          let data = {
            page :this.pageNum,
            page_size:this.pageSize
          }
          if(this.searchParams.time){
            this.searchParams.start_time = this.searchParams.time[0]
            this.searchParams.end_time = this.searchParams.time[1]
          }
          delete this.searchParams.time
          data = Object.assign(data,this.searchParams)
          this.getHttpGet(data,'allmsg',true,'get').then(res => {
              this.loading = false;
              if(res.code==0){
                   this.tableData = res.data
                   this.total = res.count
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
      },
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          this.pageSize = val
          this.initData()
      },
      handleCurrentChange(val) {
          this.pageNum = val
          this.initData()
          console.log(`当前页: ${val}`);
      },
      showTab(index){
        this.stat = index
      },
      addPlist(){
        this.$refs['tempForm'].validate((valid) => {
            if (valid) {
              let data = JSON.stringify(this.tempForm)   
              this.pform.relate_users.push(JSON.parse(data))
              this.tempForm ={}
            }
          });
      }
    },
    components: {
        ToolBar
    }
  }
</script>
<style lang="less" scoped>
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
  .menu /deep/ .el-range-editor .el-range-input{
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
    width: 140px;
   }
   #address  /deep/ .el-input__inner{
     width:270px;
   }
 
   #address  /deep/ .el-textarea__inner{
     width: 880px;
   }
   .el-collapse-item__header{
     font-weight: bold;
   }
   .el-form-item__label{
     width: 100px;
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
   .msg   /deep/ .el-form-item__label{
     width: 100px;
   }
   #address2  /deep/ .el-textarea__inner{
      width: 880px;
   }
  .dh3  /deep/ .el-form-item__label{
      width:260px;
   }
  .icos{
      margin-left: 20px;
      color: #0084fd;
      border-radius: 2px;
      box-sizing: border-box;
      font-weight: bold;
      border: solid 1px #0084fd;
      font-size: 18px;
    }
 .ctext{
    color: #0084fd;
    padding-left: 5px;
  }
</style>