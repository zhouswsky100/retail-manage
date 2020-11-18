<template>
<div style="background: #fff;">
  <div style="    padding-top: 20px; padding-left: 10px;">
      <el-form :inline="true" :model="pform" ref="msgForm"  label-position ="right" class="demo-form-inline">
        <el-form-item label="信件拉取" >
          <el-select v-model="pform.stat" placeholder="请选择要拉取的平台"  value-key="key"  style="width:350px" @change="getMsg();codeFlg=true">
            <el-option v-for="item in msgList" :label="item.name" :value="item.val" :key="item.val.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="验证码"  v-if="flg">
          <div style="display: flex;">
            <div style="margin-top: 10px;width:140px;height:40px" v-loading="loading"><img :src="src"></div><div @click="getMsg();codeFlg=true"   class="h-dc" style="margin-top: 6px;margin-left: 10px;"><i class="fa fa-refresh fa-2x"  style="color:#3C8DBC;" aria-hidden="true" ></i></div>
            <div style=""><el-input v-model="pform.code" placeholder="验证码"  style="width:192px;margin-left: 10px;"></el-input></div>
          </div>
        </el-form-item>
        <el-button  element-loading-spinner="el-icon-loading" element-loading-background="#d4d4d4" v-loading="bloading" element-loading-text="拉取中" type="primary" size="small" @click="send();codeFlg=false"  style="margin-left: 10px;margin-top: 10px"> 拉取信件</el-button>
      </el-form>
  </div>
</div>
</template>
<script>

  export default {
    data() {
      return {
          msgList:[],
          pform:{},
          flg:false,
          spider_key:"",
          src:"",
          codeFlg:false,
          bloading:false,
          loading: true

      }
    },
    methods: {
        initData(){
          this.getHttpPost({},'spiderall',true,'get').then(res => {
              if(res.code==0){
                     this.msgList = Object.keys(res.data).map(val => ({
                          val:{"needCode": res.data[val].need_img_code, "key" :val},
                          name:res.data[val].name
                      }))
                      console.log(this.msgList)
                }else{
                   this.$message.error(res.msg);
                }
              },error=>{
                this.$message.error('网络开小差了');
          })
        },
        getMsg(){
            this.flg =  this.pform.stat.needCode
            this.loading = true
            sessionStorage.spider_id =this.pform.stat.key

            this.socket = new WebSocket('ws://121.36.72.101:8000/longhua-xf/spider/1/catch')
            // 监听socket连接
            this.socket.onopen = this.open
            // 监听socket错误信息
            this.socket.onerror = this.error
            // 监听socket消息
            this.socket.onmessage = this.getMessage
            
            // if(this.flg ){
            //     this.getHttpPost({},'get_img_code',true,'get').then(res => {
            //       if(res.code==0){
            //           this.loading = false
            //           this.src = this.$rkUtil.getWebServiceUrl('img')+res.data.img
            //           this.spider_key = res.data.spider_key
            //         }else{
            //           this.$message.error(res.msg);
            //         }
            //       },error=>{
            //         this.$message.error('网络开小差了');
            //   })
            // }
        },
        open: function () {
          if(!this.codeFlg){
              this.socket.send(this.pform.code)
          }
            console.log("socket连接成功")
        },
        error: function () {
            console.log("连接错误")
        },
        getMessage: function (msg) {
            this.loading = false
            let res = JSON.parse(msg.data)
            console.log(res)
            if(this.codeFlg){
               if(res.code==0){
                    this.src = this.$rkUtil.getWebServiceUrl('staticUrl')+res.data.img+'?1='+Math.random()
                }else{
                  this.$message.error(res.msg);
                }   
            }else{
                this.bloading = false
                if(res.code==0){
                  this.$message({
                  message: '拉取成功',
                  type: 'success'
                });
                }else{
                  this.$message.error(res.msg);
                } 

            }
        },
        send: function () {
            this.bloading = true
            if(this.socket.readyState !=1){            
              this.socket = new WebSocket('ws://121.36.72.101:8000/longhua-xf/spider/1/catch')
              this.socket.onopen = this.open
            }else{
              this.socket.send(this.pform.code)
            }
        },
        close: function (msg) {
            console.log(msg)
        },
        getData(){
          this.getHttpPost({'spider_key': this.spider_key,"img_code":this.pform.code},'catch',true,'post').then(res => {
            if(res.code==0){
                this.$message({
                  message: '拉取成功',
                  type: 'success'
                }); 
            }else{
                this.$message.error(res.msg);

            }
            },error=>{
              this.$message.error('网络开小差了');
          })

        }
    },
    components: {
    },
    mounted: function () {
      this.initData()
    }
  }
</script>
<style lang="less">


</style>