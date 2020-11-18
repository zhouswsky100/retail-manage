<template>
  <div>
    <div  v-if="flg">
    <ToolBar>
      <div  class="menu">
        <el-input
                placeholder="业务编号"
                size="small"
                style="width: 140px"
                v-model="searchParams.postTitle"
                clearable>
        </el-input>
        <el-input
                placeholder="信件编号"
                size="small"
                style="width: 140px"
                v-model="searchParams.postTitle"
                clearable>
        </el-input>
        <el-input
                placeholder="关键字"
                size="small"
                style="width: 140px"
                v-model="searchParams.postTitle"
                clearable>
        </el-input>
        <el-input
                placeholder="处理单位"
                size="small"
                style="width: 140px"
                v-model="searchParams.postTitle"
                clearable>
        </el-input>
         <el-date-picker
            v-model="date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="success" icon="el-icon-search" size="small" ></el-button>
          <el-button type="info" icon="el-icon-refresh" size="small"></el-button>
          <el-button type="primary" size="small" @click="exportExcl">导出信件</el-button>
          <div id="menu">
          <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-submenu index="2">
              <template slot="title"> <span class="ae8 h-dc g-pl-10 " > 更多</span></template>
              <el-menu-item index="2-1" @click="drawer= true">高级查询</el-menu-item>
            </el-submenu>
          </el-menu>
          </div>
      </div>
    </ToolBar>
     <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        v-loading="loading"
        style="width: 100%"
        @row-click="openDetails" 
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
           type="index"
          >
        </el-table-column>
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
          <!-- <el-table-column
          prop="address"
          label="处理单位"
          show-overflow-tooltip>
        </el-table-column>
         <el-table-column
          prop="address"
          label="转交时间"
          show-overflow-tooltip>
        </el-table-column>
          <el-table-column
          prop="address"
          label="经办人"
          show-overflow-tooltip>
        </el-table-column> -->
        <el-table-column
          prop="expire_time"
          label="处理期限"
          show-overflow-tooltip>
        </el-table-column>
         <el-table-column
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button  type="text" size="small">处理</el-button>
            </template>
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
     <div class="drwaerCont g-cf">
        <el-drawer
          title="高级查询"
          :visible.sync="drawer"
          :direction="direction"
          size="100%"
          :modal='true'
          :show-close='true'
          :wrapperClosable='true'
          >
          <div class="search">
          </div>
          <div class="res">
           <div class="g-pl-10 ">
              <span class="h-dc">查询</span>
              <span class="h-dc g-pl-10">重置</span>
            </div>
          </div>
        </el-drawer>
     </div>
    </div>
    <ToolBar v-if="!flg">
      <div style="height: 50px;">
      <i class="el-icon-circle-close gb h-dc" v-if="!flg" @click="flg=true"></i>
      </div>
      <el-collapse v-model="activeNames">
          <div class="h-dc" > 
            <el-steps :active="active" align-center  >
              <el-step v-for="item in listPros" :title="item.name"    @mouseleave.native="showFlg=false" @mouseover.native="getData(item)" :description="item.deal_idea" ></el-step>
          </el-steps>
        </div>
        <div class="box2" v-if="showFlg">
              <div class="item2">   
                  <p class="title">{{showData.name}} 详情</p>
                  <p>操作人：{{showData.deal_man}}</p>
                  <p> 处理方式：{{showData.deal_method}}</p>
                  <p>处理结果：{{showData.deal_idea}}</p>
              </div>
        </div>
        <el-collapse-item title="受访人信息" name="1" style="margin-top: -20px">
          <el-form :inline="true"   :model="pform" ref="msgForm"  label-position ="right" class="demo-form-inline">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="pform.name" placeholder="姓名" :disabled="true" ></el-input>
              </el-form-item>
              <el-form-item label="性别" prop="sex">
                <el-select v-model="pform.sex" placeholder="请选择性别" :disabled="true">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件类型" prop="cret_type">
                <el-select v-model="pform.cret_type" placeholder="请选择证据类型" :disabled="true">
                  <el-option label="身份证" value="身份证"></el-option>
                  <el-option label="护照" value="护照"></el-option>
                  <el-option label="军官证" value="军官证"></el-option>
                  <el-option label="士官证" value="士官证"></el-option>
                  <el-option label="港澳通行证" value="港澳通行证"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件号码" prop="cret_num">
                <el-input v-model="pform.cret_num" placeholder="证件号码" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="固定电话">
                <el-input v-model="pform.phone" placeholder="固定电话" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="pform.mobile" placeholder="手机号" :disabled="true"></el-input>
              </el-form-item>
                <el-form-item label="电子邮箱" 
                prop="email">
                <el-input v-model="pform.email" :disabled="true" placeholder="电子邮箱"
                ></el-input>
              </el-form-item>
                <el-form-item label="详细地址" prop="addressDetail">
                  <el-input v-model="pform.addressDetail" style=" width: 300px;" :disabled="true"  placeholder="详细地址">"></el-input>
                </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="信件信息" name="2" >
          <el-form :inline="true" :model="pform"  label-position ="right" ref="msgForm2" class="demo-form-inline">
              <el-form-item label="信访人数"  prop="pnum" >
                <el-input v-model="pform.pnum" placeholder="信访人数" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="信访日期"  prop="begind">
                  <el-date-picker
                      v-model="pform.begind"
                      type="date"
                      disabled
                      @change="initEnd"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                  </el-date-picker>
              </el-form-item>
              <el-form-item label="信访形式" prop="style">
                <el-select v-model="pform.style" :disabled="true" placeholder="请选择信访形式">
                  <el-option label="来访" value="来访"></el-option>
                  <el-option label="来电" value="来电"></el-option>
                  <el-option label="来信" value="来信"></el-option>
                  <el-option label="系统来件" value="系统来件"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="所属系统" prop="sys">
                <el-select v-model="pform.sys" :disabled="true"  placeholder="请选择所属系统">
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
              <el-form-item label="限办日期">
                  <el-date-picker
                      v-model="endd"
                      type="date"
                      disabled
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd-ss"
                      placeholder="限办日期">
                  </el-date-picker>
              </el-form-item>
              <span id="up">
                <el-form-item label="上级交办">
                  <el-radio-group v-model="pform.radio" :disabled="true">
                          <el-radio label="1">是</el-radio>
                          <el-radio label="2">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              </span>
              <el-form-item label="涉事机构">
                <el-input v-model="pform.refer_dp" :disabled="true"  placeholder="涉事机构"></el-input>
              </el-form-item>
              <el-form-item label="涉事机构地址" >
                <el-input v-model="pform.refer_dp_addr" :disabled="true" placeholder="涉事机构地址"></el-input>
              </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="信访事项信息" name="3">
          <el-form :inline="true" :model="pform" ref="msgForm3"  :disabled="true"  label-position ="right" class="demo-form-inline">
              <div id="address">
                <el-form-item label="问题属地" >
                  <el-input v-model="pform.faqa" style=" width: 400px;" disabled placeholder="龙华">"></el-input>
                </el-form-item>
                <el-form-item label="信访性质" prop="xfxz">
                  <el-select v-model="pform.xfxz" :disabled="true">
                    <el-option label="投诉" value="投诉"></el-option>
                    <el-option label="咨询" value="咨询"></el-option>
                    <el-option label="举报" value="举报"></el-option>
                    <el-option label="意见建议" value="意见建议"></el-option>
                    <el-option label="其它" value="其它"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="性质分类" prop="cfl" >  
                  <el-select v-model="pform.cfl" :disabled="true" >
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
                <el-form-item label="涉法涉诉标志" prop="sfss">
                      <el-radio-group v-model="pform.sfss" :disabled="true">
                          <el-radio label="1">是</el-radio>
                          <el-radio label="2">否</el-radio>
                      </el-radio-group>
                </el-form-item>
              </div>
              <div id="address">
                <el-form-item label="概况信息"  prop="gkxx">
                  <el-input v-model="pform.gkxx" style=" width: 400px;" :disabled="true" placeholder="概况信息">"></el-input>
                </el-form-item>
              </div>
              <div id="address2">   
                <el-form-item label="内容摘要" prop="nrzy">
                      <el-input type="textarea" rows="4" v-model="pform.nrzy" :disabled="true"></el-input>
                </el-form-item>
              </div>
              <div id="address2">   
                <el-form-item label="备注">
                      <el-input type="textarea" rows="4" v-model="pform.desc" :disabled="true"></el-input>
                </el-form-item>
              </div>
          </el-form>
        </el-collapse-item>
        <el-collapse-item title="告知内容" name="4">
          <el-form :inline="true" :model="pform" ref="msgForm3"  :disabled="true"  label-position ="right" class="demo-form-inline">
            <div id="address">   
              <el-form-item label="告知形式" prop="inform_type" :disabled="true">
                <el-radio v-model="pform.inform_type"  label="1">回访答复</el-radio>
                <el-radio v-model="pform.inform_type"  label="2">当面送达</el-radio>
                <el-radio v-model="pform.inform_type"  label="3">其他</el-radio>
                <el-radio v-model="pform.inform_type"  label="4">电话通知</el-radio>
                <el-radio v-model="pform.inform_type"  label="5">短信</el-radio>
                <el-radio v-model="pform.inform_type" label="6">邮件方式</el-radio>
              </el-form-item>
            </div>
            <div id="address2">   
              <el-form-item label="告知信息" :disabled="true">
                <el-input type="textarea" rows="4" v-model="pform.inform_info" style="width:880px"></el-input>
              </el-form-item>
              <el-form-item label="办理情况信息" :disabled="true">
                <el-input type="textarea" rows="4" v-model="pform.deal_report_info" style="width:880px"></el-input>
              </el-form-item>
            </div>
             <div id="address">   
                <el-form-item label="报告文件" >
                  <p class="h-dc" @click="down(pform.answer_report_path,pform.answer_report_name)">{{pform.answer_report_name}}</p>
                </el-form-item>
            </div>
             <div id="address">   
                <el-form-item label="意见书文件" >
                  <p class="h-dc" @click="down(pform.deal_report_path,pform.deal_report_name)">{{pform.deal_report_name}}</p>
                </el-form-item>
            </div>
            <div id="address">   
                <el-form-item label="附件" >
                  <p>{{pform.encls}}</p>
                </el-form-item>
            </div>
          </el-form>
        </el-collapse-item>
        <div class="btnflx">
          <el-button type="primary" @click="revoke">驳回</el-button>
          <el-button type="primary" @click="goUrl('/msg_examine')">办结</el-button>
          <span style="position: absolute;right: 25px;" >处理期限:{{endd}}</span>
        </div>
      </el-collapse>
    </ToolBar>
  </div>
</template>
<script>
  import ToolBar from '~/components/ToolBar/ToolBar.vue';
  import HelpHint from '~/components/HelpHint/HelpHint.vue';
import TreeDetailsVue from '../../CategoryManage/TreeDetails.vue';
  export default {
    data() {
      return {
        searchParams:{
            postTitle:'',
            postType:'',
            postStatus:'published',
        },
        activeNames: ['1'],
        flg:true,
        active:0,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [],
        date:"",
        pform:{checkList:[]},
        drawer: false,
        direction: 'ttb',
        loading:'',
        total:0,
        endd:"",
        pageNum:1,
        pageSize:10,
        pform:{},
        listPros:[],
        showData:{},
        showFlg:false
      }
    },
    mounted(){
        this.initData()
    },
    methods: {
      initData(){
          this.loading = true;
          let data = {
            page :this.pageNum,
            page_size:this.pageSize
          }
          this.getHttpGet(data,'dbj',true,'get').then(res => {
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
      revoke(){
          this.$prompt('请输入驳回原有', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
            this.getHttpPost({"deal_idea":value},'reback',true,'post').then(res => {
              if(res.code==0){
                  this.$message({
                    message: '驳回成功',
                    type: 'success'
                  });
                  this.flg = true
                  this.initData()
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
        }).catch(() => {
             
        });
      },
      down(file_path,file_name){
            let data = {
              file_path :file_path,
              file_name:file_name
            } 
            this.getHttpDown(data,'download',true,'get').then(res => {
              const url = window.URL.createObjectURL(new Blob([res]));
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', file_name);
              document.body.appendChild(link);
              link.click();
         
            },error=>{
              this.$message.error('网络开小差了');
        })
      },
     exportExcl() {
            let template = []
            let list = ['医疗管理服务','公共卫生','卫生监督','人事管理','计生','家妇','扫黑除恶','其它']
            let tableList = this.$refs.multipleTable.selection
            if(tableList.length<1){
               tableList = this.tableData
            }
            for(let i =0; i<tableList.length;i++){
              let num = i
              num++
              let temp=
                  ` <tr>
                      <td>${num}</td>
                      <td>${tableList[i].petitioner}</td>
                      <td>${tableList[i].ywbm}</td>
                      <td>${tableList[i].xf_time}</td>
                      <td>${tableList[i].expire_time}</td>
                      <td>社康</td>
                      <td>${tableList[i].manage_dp}</td>
                      <td>${tableList[i].complete_time}</td>
                       <td></td>
                      <td>${tableList[i].xf_origin}</td>
                      <td>${tableList[i].xf_nature}</td>
                      <td>${tableList[i].category1==""?'暂无分类':list[tableList[i].category1]}</td>
                      <td>${tableList[i].category2==""?'暂无分类':this.alllist[tableList[i].category1][tableList[i].category2].label }</td>
                    </tr>`
              template.push(temp)
              }
            let thtml = `
            	<tr>
		              <td class="hs" >序号</td>
                  <td class="hs" >标题</td>
                  <td class="hs" >信件编号</td>
                  <td class="hs" >来件日期</td>
                  <td class="hs" >期限</td>
                  <td class="hs" >涉及社康</td>
                  <td class="hs" >主管单位</td>
                  <td class="hs" >单位回复时间</td>
                  <td class="hs" >应急办回复时间</td>
                  <td class="hs" >来源</td>
                  <td class="hs" >内容分类</td>
                  <td class="hs" >一级分类</td>
                  <td class="hs" >二级分类</td>
                </tr>
            `
            let html = "<style>.shs{ background:#ff9900}.fl td{color:red} .rs{background:#f2dcdb} .tls{background:#8ea9db} .ts{background:#f4b084} .ls{background:#92d050} .hs{backbround:#ff9900}  .sr{background:#f2dcdb}  .ls{background:#00ccff}  .hs{ background: #d0cece;} table {text-align: center;font-size:18px;border:1px solid #ddd;line-height:40px }table,table  td{border: 1px solid #000;text-align: center} </style><body><table> 	"+thtml+''+ template.join('')+"</table></body></html>";
            let blob = new Blob([html], { type: "application/vnd.ms-excel" });
            // window.location.href = URL.createObjectURL(blob);
            const downloadElement = document.createElement('a')
            const href = window.URL.createObjectURL(blob)
            downloadElement.href = href
            downloadElement.download = '信访登记' + '.xlsx'
            document.body.appendChild(downloadElement)
            downloadElement.click()
            document.body.removeChild(downloadElement) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
      },
      goUrl(url,type){
          this.$router.push({path:url, query:{ endd:this.endd,type:type}})
      },
      openDetails(row){
          sessionStorage.msg_id = row.id
          this.getHttpGet({},'list_pros',true,'get').then(res => {
              if(res.code==0){ 
                  this.listPros = res.data
                  this.listPros.forEach(item => {
                    if(item.is_complete){
                      ++this.active 
                    }
                  });
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
          this.getHttpPost({},'msgDetail',true,'get').then(res => {
              this.loading = false;
               this.flg = true
              if(res.code==0){
                    this.flg = false
                    this.$set(this.pform,'name',res.data.petitioner)
                    this.$set(this.pform,'sex',res.data.gender)
                    this.$set(this.pform,'cret_type',res.data.cret_type)
                    this.$set(this.pform,'cret_num',res.data.cret_num)
                    this.$set(this.pform,'phone',res.data.tel)
                    this.$set(this.pform,'mobile',res.data.mobile)
                    this.$set(this.pform,'email',res.data.email)
                    this.$set(this.pform,'addressDetail',res.data.address)
                    this.$set(this.pform,'relate_users',res.data.relate_users)
                    this.$set(this.pform,'pnum',res.data.people_num)
                    this.$set(this.pform,'style',res.data.xf_type)
                    this.$set(this.pform,'sys',res.data.xf_origin)
                    this.$set(this.pform,'radio',res.data.is_sjzb?'1':'2')
                    this.$set(this.pform,'dhradio',res.data.is_dhqj)
                    this.$set(this.pform,'begind',res.data.xf_time)
                    this.endd = this.$rkUtil.getNextDate(res.data.xf_time,15)
                    this.$set(this.pform,'xfxz',res.data.xf_nature)
                    this.$set(this.pform,'cfl',res.data.category_by_nature)
                    this.$set(this.pform,'ls',res.data.is_lawyer_joined)
                    this.$set(this.pform,'istot',res.data.is_threat)
                    this.$set(this.pform,'sfss',res.data.is_law_related?'1':'2')
                    this.$set(this.pform,'ccbz',res.data.is_first)
                    this.$set(this.pform,'gkxx',res.data.abstract)
                    this.$set(this.pform,'nrzy',res.data.desc)
                    this.$set(this.pform,'refer_dp',res.data.refer_dp)
                    this.$set(this.pform,'desc',res.data.remark)
                    this.$set(this.pform,'refer_dp_addr',res.data.refer_dp_add)
                    this.$set(this.pform,'answer_idea',res.data.refer_dp_add)
                    this.$set(this.pform,'answer_report_name',res.data.result.answer_report_name)
                    this.$set(this.pform,'answer_report_path',res.data.result.answer_report_path)
                    this.$set(this.pform,'deal_report_name',res.data.result.deal_report_name)
                    this.$set(this.pform,'deal_report_path',res.data.result.deal_report_path)
                    this.$set(this.pform,'encls',res.data.result.encls)
                    this.$set(this.pform,'inform_info',res.data.result.inform_info)
                    this.$set(this.pform,'deal_report_info', JSON.parse(res.data.result.deal_report_info))                    
                }else{
                  this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
              })
      },
      handleClick(row) {
        this.$alert(row, '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
          }
        });
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
      handleSelect(){

      },
      getData(item){
        this.showData = item
        this.showFlg = true
      },
      initEnd(){
          this.endd = this.getNextDate(this.pform.begind,15)
      },
    },
    components: {
        ToolBar,HelpHint
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
    background: #3c8dbc;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .ebtn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
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
  .exmsg{ 
    background: #3c8dbc;
    color: #fff;
    padding: 5px;
    border-radius: 5px;
    margin-right: 10px;
  }
  .ebtn{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
  }
  #menu /deep/  .el-menu  {
    display: inline-block;
    position: relative;
    width: 0px;
    top: 20px;
  }
  #menu /deep/  .el-submenu.is-active .el-submenu__title{
    border-bottom-color: #fff
  }
  #menu{
    display: inline-block;
  }
  .menu .el-menu{
    border: none;
  }
  .flx{
     display: flex
  }
  .flx /deep/ .el-form-item__content{
     display: flex;
  } 
  .flx /deep/  .el-form-item{
     display: flex;
  }
   .flx /deep/  .el-form-item__label{
     padding:  0px 5px 0px 0px;
  }
 
  .flx /deep/  .el-input{
    display: flex;
   }
  .drwaerCont /deep/.el-drawer__header {
      font-size: 14px;
      background-color: #3c8dbc;
      color: #fff;
      line-height: 45px;
      padding-left: 10px;
   }
   .drwaerCont /deep/ button{
      border: none;
      outline: none; 
    }
    .drwaerCont /deep/ .el-drawer__body {
      display: block;
      padding-left: 15px;
      background:#f9f9f9;
    
    }
    .drwaerCont /deep/ .el-divider--horizontal {
      margin: 10px 0;
    }
    .drwaerCont /deep/ .el-drawer__wrapper {
      z-index: 2001;
      top: 100px;
      position: absolute;
    }
    .drwaerCont /deep/ .el-drawer {
       width: 100%;
       overflow: auto;
       height: 300px;
    }
    .search{
      padding-top: 10px;
    }
    .drwaerCont /deep/ .el-drawer__close-btn{
      background: none;
      float: right;
      color: #fff;
      position: relative;
      left: -14px;
      top: 15px;
      cursor: pointer;

    }
    .res{
      background-color: #367fa9;
      color: #fff;
      position: fixed;
      width: 100%;
      padding: 10px 0px;
      top: 400px;
      margin-left: -15px;
    }
       .msg   /deep/ .el-form-item__label{
     width: 100px;
   }
   .msg /deep/ .el-input__inner{
     width: 191px;
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
  .gb{
    position: relative;
    top: 10px;
    font-size: 22px;
    left: -10px;
    float: right;
  }
  #address2  /deep/ .el-form-item__label{
      width: 68px;
   }
  .box2{
    background: #fff;
    min-width: 150px;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    padding: 12px;
    z-index: 2000;
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    word-break: break-all;
    width: 400px;
    height: atuo;
    position: fixed;
    text-align: center;
    .title{
       color: #303133;
       font-size: 16px;
       text-align: center;
    }
    .item2{
      line-height: 32px;
      text-align: left;
      padding-top: 10px;
    }
  }
</style>