<template>
<div id="home">
  <div class="box">
      <el-input type="text"  style="width:60%" autosize placeholder="Please enter the Manager Code to get your client manager" v-model="code"></el-input>
      <el-button type="primary" style="margin-left:10px">Submit</el-button>
  </div>
  <div class="item">
    <div class="ibg" style="margin-left: 0px;">
        <div class="g-f-s">
          <img src="../../assets/imgs/ord.png">
          <span>Orders</span>
        </div>
        <div class="hr"></div>
        <div class="txt">
          0
        </div>
    </div>
    <div class="ibg">
        <div class="g-f-s">
          <img src="../../assets/imgs/income.png">
          <span>Income</span>
        </div>
        <div class="hr"></div>
        <div class="txt">
          0
        </div>
    </div>
    <div class="ibg">
        <div class="g-f-s">
          <img src="../../assets/imgs/balance.png">
          <span>Balance</span>
        </div>
        <div class="hr"></div>
        <div class="txt">
          0
        </div>
    </div>
    <div class="ibg">
        <div class="g-f-s">
          <img src="../../assets/imgs/credit.png">
          <span>Credit</span>
        </div>
        <div class="hr" style="margin-bottom:0px"></div>
        <div class="txt">
          <span>Used</span>
          <span>0</span>
        </div>
         <div class="txt">
          <span>Limit</span>
          <span>0</span>
        </div>
    </div>
  </div>
  <div class="box" style="padding:10px">
     <div class="g-f-s">
       <img src="../../assets/imgs/chart.png">
       <span>Chart</span>
     </div>
     <div class="char">
        <el-form
          :model="productSearchForm"
          label-width="100px"
          inline>
          <el-form-item label="Order Type">
            <el-select
              v-model="productSearchForm.orderType"
             
              clearable> 
              <el-option
                :value="1"
                label="Platform orders"></el-option>
              <el-option
                :value="2"
                label="3rd App orders"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="120px"
            label="Statistical date">
            <el-date-picker
              v-model="productSearchForm.daterange"
              type="daterange"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loadProductReport()">
              Search
            </el-button>
          </el-form-item>
        </el-form>
        <div class="echarts" id="echarts"></div>
     </div>
     <div class="char g-mt-20">
        <el-form
          :model="orderSearchForm"
          label-width="100px"
          inline>
          <el-form-item label="Order Type">
            <el-select
              v-model="orderSearchForm.orderType"
             
              clearable> 
              <el-option
                :value="1"
                label="Platform orders"></el-option>
              <el-option
                :value="2"
                label="3rd App orders"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label-width="120px"
            label="Statistical date">
            <el-date-picker
              v-model="orderSearchForm.daterange"
              type="daterange"></el-date-picker>
          </el-form-item>
          <el-form-item label="Pay Status">
            <el-select
              v-model="orderSearchForm.payStatus"
              clearable>
              <el-option
                :value="1"
                label="Unpaid"></el-option>
              <el-option
                :value="1"
                label="Paid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Order Status" label-width="120px" > 
            <el-select
              v-model="orderSearchForm.orderStatus"
              clearable>
              <el-option 
                v-for="(item,index) in orderStatusMap" 
                :key="index" 
                :value="item.value">
                {{ item.name }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="loadOrderReport()">
              Search
            </el-button>
          </el-form-item>
        </el-form>
       <div class="echarts" id="echarts2"></div>
     </div>
  </div>
  <div class="tab">
    <div class="tab-list">
     <div class="g-f-s">
       <img src="../../assets/imgs/Unpaid.png">
       <span>Unpaid Order</span>
     </div>
      <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="Date"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="Unpaid Order"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="Amount">
      </el-table-column>
       <el-table-column
        prop="PlaceOrder"
        label="Place Order">
      </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5,10,20,100]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <div class="tab-list">
     <div class="g-f-s">
       <img src="../../assets/imgs/System.png">
       <span>System Notification</span>
     </div>
      <el-table
      :data="tableData1.slice((this.page - 1) * this.size, (this.page - 1) * this.size + this.size)"
      style="width: 100%">
      <el-table-column
        prop="type"
        label="Type"
       >
      </el-table-column>
      <el-table-column
        prop="content"
        label="content"
        width="380"
        :formatter="formatter">
      </el-table-column>
       <el-table-column
        label="Date"
        prop="createTime"
        :formatter="formatter2">
      </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5,10,20,100]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>

</div>
</template>
<script>
import echarts from 'echarts'
import moment from 'moment';
  export default {
    data() {
      return {
        tableData:[],
        total:0,
        currentPage:1,
        tableData1:[],
        total1:0,
        createTime:'',
        page:1,
        size:5,
        noticeOverview:'',
        code:'',
        orderStatusMap:[],
        productSearchForm:{
          orderType:'',
          daterange:[this.$moment().add(-6,'days').format('YYYY-MM-DD'),new Date()]
       },
       dialog:{
        visible:false,
        title:'',
        list:[],
        type:'',
        pagging:{
          pageSize:10,
          pageNo:1,
          total:0
        }
        },
        orderSearchForm:{
          orderType:'',
          payStatus:'',
          orderStatus:'',
          daterange:[this.$moment().add(-6,'days').format('YYYY-MM-DD'),new Date()]
        },
        productSearchForm:{
          orderType:'',
          daterange:[this.$moment().add(-6,'days').format('YYYY-MM-DD'),new Date()]
       },
       chartProductData:[],
       chartOrderData:[],
      }
    },
    methods: {
        getMyWorkbenchIfo(){
          this.getHttpGet({},'myWorkbench',true,'get').then(res => {
            if(res.status==200){
                let temp = []
                res.data.newProdPage.records.forEach(item => {
                   item.type = 'new'
                   temp.push(item)
                });
                res.data.sendOrderPage.records.forEach(item => {
                   item.type = 'send'
                   temp.push(item)
                });
                res.data.toResolveOrder.records.forEach(item => {
                   item.type = 'resolve'
                   temp.push(item)
                });
                this.tableData1 = temp
                this.total = temp.length
              }else{
                this.$message.error(res.error);
              }
            },error=>{
                this.$message.error('There is a problem with the network');
            })
        },
        handleSizeChange(val) {
           this.size = val;
        },
        handleCurrentChange(val) {
          this.page = val;
        },
        loadProductReport(){
          let params={
            orderType:this.productSearchForm.orderType,
            beginDate: this.productSearchForm.daterange && this.productSearchForm.daterange[0],
            endDate:this.productSearchForm.daterange && this.productSearchForm.daterange[1]
          }
          this.getHttpGet(params,'prodReport',true,'get').then(res => {
            if(res.status==200){
                this.chartProductData = res.data;
                let myChart = echarts.init(document.getElementById('echarts'));
                    myChart.setOption({
                      grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                      },
                      dataZoom: [{
                        type: 'inside'
                      }],
                      xAxis : [
                        {
                          type : 'category',
                          data : this.chartProductData.map(ele=> ele.DB_DATE),
                          axisTick: {
                            alignWithLabel: true
                          }
                        }
                      ],
                      yAxis : [
                        {
                          type : 'value'
                        }
                      ],
                      series : [
                        {
                          name:'直接访问',
                          type:'bar',
                          barWidth: '60%',
                          data:this.chartProductData.map(ele=> ele.TOTAL)
                        }
                      ]
                })
              }else{
                this.$message.error(res.error);
              }
            },error=>{
                this.$message.error('There is a problem with the network');
            })
        },
        loadOrderReport(){
          let params={
            orderType:this.orderSearchForm.orderType,
            payStatus:this.orderSearchForm.payStatus,
            orderStatus:this.orderSearchForm.orderStatus,
            beginDate: this.orderSearchForm.daterange && this.orderSearchForm.daterange[0],
            endDate: this.orderSearchForm.daterange && this.orderSearchForm.daterange[1]
          }
          this.getHttpGet(params,'orderReport',true,'get').then(res => {
            if(res.status==200){
                this.chartOrderData = res.data;
                let myChart = echarts.init(document.getElementById('echarts2'));
                    myChart.setOption({
                        tooltip : {
                          trigger: 'axis',
                        },
                        grid: {
                          left: '3%',
                          right: '4%',
                          bottom: '3%',
                          containLabel: true
                        },
                        dataZoom: [{
                          type: 'inside'
                        }],
                        xAxis : [
                          {
                            type : 'category',
                            data : this.chartOrderData.map(ele=> ele.DB_DATE),
                            axisTick: {
                              alignWithLabel: true
                            }
                          }
                        ],
                        yAxis : [
                          {
                            type : 'value'
                          }
                        ],
                        series : [
                          {
                            name:'直接访问',
                            type:'bar',
                            barWidth: '60%',
                            data:this.chartOrderData.map(ele=> ele.TOTAL)
                          }
                        ]
                })
              }else{
                this.$message.error(res.error);
              }
            },error=>{
                this.$message.error('There is a problem with the network');
            })
        },
        formatter(row){
          return `The platform added ${ row.prodName } products on ${ moment(row.createTime).format('YYYY-MM-DD') },`

        },
        formatter2(row){
          return moment(row.createTime).format('YYYY-MM-DD')
        }
    },
    filters:{
      formatProNotice(data){
     

        return `The platform added ${ data.prodName } products on ${ moment(data.createTime).format('YYYY-MM-DD') },`

      },
      formatOrderNotice(data){

        return `Order number ${ data.orderNo } was shipped on ${ moment(data.updateTime).format('YYYY-MM-DD') },`

      },
      formatAfterSaleNotice(data){

        return `The after-sales order number ${ data.orderNo } was approved on ${ moment(data.updateTime).format('YYYY-MM-DD') },`

      },
      formatToResolveNotice(data){

        return `${moment(data.createTime).format('YYYY-MM-DD')} Received order ${ data.orderNo },`

      }
    },
    created(){
      this.getMyWorkbenchIfo();
      this.loadProductReport();
      this.loadOrderReport();
    },
    mounted: function () {
     
    }
  }
</script>
<style lang="less" scoped>
#home{
  .box{
    padding: 20px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    border-radius: 8px;
    margin: 10px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .item{
    display: flex;
    margin: 10px;
    justify-content: space-between;
  }
  .ibg{
    background: #fff;
    width: 24%;
    margin-bottom: 18px;
    padding: 10px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 8px;
    height: 152px;
  }
  .g-f-s span{
    padding-left: 10px;
    color: #666;
    font-size: 18px;
  }
  .hr{
      align-items: center;
      border-bottom: 1px solid #eee;
      display: flex;
      padding-bottom: 16px;
      margin-bottom: 10px;;
  }
  .txt{
    font-size: 32px;
    color: #222;
    font-weight: bold;
    span{
      color: #666;
      margin-right: 50px;
      font-size: 16px
    }
  }
  .char{
      margin-left: 5px;
  }
  .echarts{
    width:100%;
    max-width:1000px;
    margin:auto;
    height:200px
  }
  .tab{
      display: flex;
      justify-content: space-between;
  }
  .tab-list{
    padding: 10px;
    border: 1px solid #e6ebf5;
    background-color: #fff;
    border-radius: 8px;
    margin: 10px;
    width: 50%;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
}
</style>