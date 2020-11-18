<template>
<div>
  <div class="box">
    <div class="item">
      <p class="pti">即将到期信件</p>
     
    </div>
  </div>
  <div class="itme2">
    <el-tabs v-model="activeName2" @tab-click="handleClick">
      <el-tab-pane label="待处理" name="first">
            <el-table
          :data="msgData.todos"
          style="width: 100%"
          @row-click="goDetails" 
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
      </el-tab-pane>
      <el-tab-pane label="已处理" name="third">
            <el-table
          :data="msgData.finishedes"
          style="width: 100%"
          @row-click="goDetails2" 
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
      </el-tab-pane>
      <el-tab-pane label="已办结" name="fourth">
            <el-table
          :data="msgData.dones"
          style="width: 100%"
          @row-click="goDetails3" 
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
      </el-tab-pane>
    </el-tabs>
  </div>
</div>
</template>
<script>
import ToolBar from '~/components/ToolBar/ToolBar.vue';

  export default {
    data() {
      return {
         activeName: 'first',
         activeName2:'first',
         file_list:[],
         pol_list:[],
         pub_notice_list:[],
         sys_notice_list:[],
         loading:false,
         noticData:[],
         dateIn:'',
         dateEd:'',
         msgData:{
            done_count1: '0',
            done_count2: '0',
            todo_count1: '0',
            todo_count2: '0',
            dones: [],
            finishedes: [],
            todos: [],
            sdate:''
         }
      }
    },
    methods: {
        handleClick(tab, event) {
          console.log(tab, event);
        },
        initData(){
          this.getHttpPost({},'home',true,'get').then(res => {
              if(res.code==0){
                   this.file_list = res.data.file_list
                   this.pol_list = res.data.pol_list
                   this.pub_notice_list = res.data.pub_notice_list
                   this.sys_notice_list = res.data.sys_notice_list
                   this.msgData = res.data
                   console.log( this.msgData.todos)
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
        },
        goUrl(url,pdate,type){
           this.$router.push({path:url, query:{ sdate:this.sdate,pdate:pdate,type:type}})
        },
        goDetails(row){
           this.$router.push({path:'/msg_todo', query:{ row:JSON.stringify(row)}})
        },
        goDetails2(row){
           this.$router.push({path:'/msg_hadled', query:{ row:JSON.stringify(row)}})
        },
        goDetails3(row){
           this.$router.push({path:'/msg_finished', query:{ row:JSON.stringify(row)}})
        }
    },
    components: {
      ToolBar
    },
    mounted: function () {
      this.initData()
      let nowDate = new Date();
      let year = nowDate.getFullYear();
      let month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
      let day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
      this.sdate  = year + "-" + month + "-" + day;
      this.dateIn = this.$rkUtil.getNextDate(this.sdate,5)

    }
  }
</script>
<style lang="less">
  .itme2{
    background: #fff;
    margin: 0px 15px 10px 15px
  }
  img{
    max-width: 100%;
  }
  .box{
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
  }
  .item{
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 20px 10px 20px 10px;
    margin: 15px;
  }
  .item-bg{
    background: #fff;
    padding: 10px 40px 10px 0px;
  }
  .w90{
    width: 90%;
  }
  .title{
    font-size: 16px;
    font-weight: bold;
  }
  .box2{
    display: flex;
  }
  .m20{
    margin: 20px;
  }
  .ct{
    position: relative;
    top: -32px;
    left: 140px;
    color: #fff;
    font-weight: bold;
  }
  .pti{
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-left: 15px;
  }
  .itme2 /deep/ .el-tabs__nav-scroll{
    font-weight: bold;
    padding-left: 10px;
  }
  .itme2 /deep/ .el-tabs__item {
    font-weight: bold;
  }

</style>