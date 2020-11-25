<template>
<div id="marketplace"    
    v-loading="loadingP" 
    element-loading-text="add product loading"   
>
    <div class="box">
            Product category:&nbsp;&nbsp;
            <el-cascader
                :options="classificationList"
                :props="classificationProps"
                placeholder="Please select product category"
                clearable
                style="width:160px" 
                @change="handleChange">
            </el-cascader>
            <el-input v-model="input"  style="width:160px" placeholder="Enter Keywords"></el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;Sort:
            <el-radio-group v-model="radio">
                <el-radio-button label="Best Seller"></el-radio-button>
                <el-radio-button label="New Arrival"></el-radio-button>
                <el-radio-button label="Best Feedback"></el-radio-button>
            </el-radio-group>
            <div class="price">
                <div class="item">
                    <span>Price</span>
                    <div class="icon">
                        <span class="h-dc" @click="getPrice('up')"><i class="fa fa-caret-up" aria-hidden="true"></i></span>
                        <span class="h-dc" @click="getPrice('down')"><i class="fa fa-caret-down" aria-hidden="true"></i></span>
                    </div>
                </div>
            </div>
          
        <div class="productList" v-show="productList.length>0" 
             v-loading="loading" 
             element-loading-text="loading"   
             element-loading-spinner="el-icon-loading"
        >
            <div class="item" v-for="(item,index) in productList" :key="index">
                <div> <img :src="item.spuMainImg"></div>
                <p class="money">  ${{ item.skuList ? item.skuList[0].settlement : item.settlement }}</p>
                <p class="itxt">{{item.prodName}}</p>
                <div class="button_bottom">
                    <el-button
                        :type="item.retailerProductSpuId ? 'success' : 'primary'"
                        @click.stop="sealProduct(item.retailerProductSpuId,item.id)">
                        {{ item.retailerProductSpuId ? 'View sale' :'Select Sales' }}
                    </el-button>
                </div>
            </div>
        </div>
        <div class="g-f-c" style="height:200px" v-show="productList.length==0" v-loading="loading"  element-loading-text="loading">
               <i class="fa fa-circle-o-notch" aria-hidden="true"></i> 
               <p class="nodata g-pl-10 ">No matches</p>
        </div>
        <el-pagination
            v-show="pagging.total"
            :current-page="pagging.pageNo"
            :page-sizes="[10,20, 50, 100]"
            :page-size="pagging.pageSize"
            layout="prev, pager, next,sizes,total"
            :total="pagging.total"
            style="text-align:right"
            @size-change="handleSizeChange"
            @current-change="loadListData">
        </el-pagination>

    </div>
</div>
</template>

<script>
import mixPagging from '~/mixins/mixPagging';
export default {
mixins:[mixPagging],
data(){
    return{
      searchKey:'',
      input:'',
      loadingP:false,
      loading:true,
      radio:{},
      brandId:'',
      productInfo:{},
      showDialog:false,
      sealPriductId:null,  //发布销售的产品
      classificationList:[],  //类别
      classificationProps:{
        label:'classificationName',
        value:'id'
      },
      productList:[], //商品哦
      brandList:[],  //品牌
      dialogVisible: false,
      searchForm: {
        goodsName: "",
        mallName:"",
        goodsUrl:"",
        orderSize:"",
        remark:""
      },
      imgs:[],
      spuImgs:'',
      formData:{},
      count:0
    }
  },
  methods:{
        handleChange(idArr){
            let id = idArr[idArr.length - 1];
            this.brandId = '';
            this.queryByClassificationId(id);
            this.loadListData(1,id);
        },
        initPtype(){    
             this.getHttpGet({rootId: -1},'classificationTree',true,'get').then(res => {
                if(res.status==200){
                    this.classificationList = res.data
                }else{
                    this.$message.error(res.error);
                }
                },error=>{
                    this.$message.error('There is a problem with the network');
                })
        },
        sealProduct(retailerProductSpuId,id) {
            if (sessionStorage.access_token ==undefined) {
                this.$message.warning('Please Log in');
                return false;
            }
            if(retailerProductSpuId){//有添加直接去列表
                this.$router.push({ name:'sellingproducts',query:{ productId:retailerProductSpuId }});
                return false;
            }else{//没添加进行添加

                this.addProduct(id)
            }
        },
        addProduct(id) {
            //设计奇葩 添加需要商品详情！
            sessionStorage.productId = id
            this.getHttpGet({},'getProductDetail',true,'get').then(res => {
                if(res.status==200){
                    this.productInfo = res.data;
                    this.formData.spuId =  res.data.id;
                    this.formData.prodName =  res.data.prodName;
                    this.formData.spuDes =  res.data.spuDes;
                    this.formData.spuImgs =  res.data.spuMainImg;
                    this.formData.retailerProductSkuList =  res.data.skuList.map(ele=>{
                        return {
                            skuCode:ele.skuCode,
                            settlement:ele.settlement,
                            freight:ele.freight,
                        }
                    })
                    this.addProduct2()
                }else{
                    this.$message.error(res.error);
                }
                },error=>{
                     this.$message.error('There is a problem with the network');
            })
        },
        addProduct2(){
              let postData = {
                ...this.formData,
                spuImgs:this.imgs.join(';')
            }
            this.getHttpPost(postData,'addSaleProduct',true,'Post').then(res => {
                    this.loadingP = false
                    if(res.status==200){
                        this.$message({
                            message: 'add success',
                            type: 'success'
                        });
                        this.loadListData()
                    }else{
                        this.$message.error(res.msg);
                    }
                },
                error => { 
                    this.$message.error('There is a problem with the network');
                    console.log(error); 
            })
        },
        getPrice(){

        },
        queryByClassificationId(id){    
             this.getHttpGet({classificationId:id},'queryByClassificationId',true,'get').then(res => {
                if(res.status==200){
                   this.brandList = res.data;
                }else{
                    this.$message.error(res.error);
                }
                },error=>{
                    this.$message.error('There is a problem with the network');
                })
        },
        loadListData(pageNo = 1,thirdClassification = ''){
            let params={
                brandId:this.brandId,
                thirdClassification,
                pageNo,
                pageSize:this.pagging.pageSize,
            }
            this.getHttpGet(params,'querySaleProducts',true,'get').then(res => {
                this.loading = false
            if(res.status==200){
                this.productList = res.data.records;
                this.pagging.total = res.data.total;
                this.pagging.pageNo = res.data.current;
            }else{
                this.$message.error(res.error);
            }
            },error=>{
                this.$message.error('There is a problem with the network');
            })
        }
  },
  mounted(){
      this.initPtype()
      this.loadListData()
  }

}
</script>

<style lang="less" scoped>
#marketplace{
    .box{
        padding: 20px;
        border: 1px solid #e6ebf5;
        background-color: #fff;
        border-radius: 8px;
        height: auto;
        margin: 10px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
//   .box /deep/  .el-loading-spinner{
//         background: url(../../assets/imgs/balance.png) no-repeat;
//         background-size: 48px 48px;
//         width: 100%;
//         height: 100%;
//         position: relative;
//         top: 50%;
//         left: 45%;
//     }
//    .box /deep/  .el-loading-spinner .circular{
//         width: 42px;
//         height: 42px;
//         animation: loading-rotate 2s linear infinite;
//         display: none;
//     }
   .box /deep/ .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        color: #916BFF;;
        background-color: #fff;;
        border-color: #916BFF;;
        box-shadow: -1px 0 0 0 #916BFF;;
    }
    .box /deep/ .el-radio-button__inner {
        line-height: 1;
        white-space: nowrap;
        background: #fff;
        font-weight: 500;
        color: #606266;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        margin: 0;
        cursor: pointer;
        transition: all .3s cubic-bezier(.645,.045,.355,1);
        padding: 12px 12px;
        font-size: 14px;
        border-radius: 5px;
    }
    .box /deep/.el-radio-button,.el-radio-button__inner {
            display: inline-block;
            position: relative;
            outline: 0;
            margin-left: 10px;
    }
    .box /deep/ .el-radio-button .el-radio-button__inner {
        border-left: 1px solid #dcdfe6;
        border-radius: 4px 0 0 4px;
        box-shadow: none!important
    }
    .price{
        padding: 3px 15px 3px 15px;
        border-radius: 5px;
        display: flex;
        margin-left: 10px;
        display: inline-block;
        border: solid 1px #dcdfe6;
        .item{
            display: flex;
            align-items: center;
            margin: 0px;
        }
        .icon{
            flex-direction: column;
            align-items: center;
            display: flex;
            margin-left: 10px;
        }
    }
    .productList{
        display: flex;
        flex-wrap: wrap;
        .item{
            display: flex;
            margin: 14px;
            background: #f9f9fa;
            padding: 10px;
            width: 22%;
            flex-direction: column;
            box-shadow: 0 0 15px 0 rgba(72,73,121,.15);
        }
        img{
            height: 200px;
            width: 100%;
            margin: 0 auto;
            border-radius: 5px 5px 0 0;
        }
        .itxt{
            font-weight: 400;
            color: #333;
            line-height: 20px;
            padding-top: 5px;
            overflow: hidden;
            min-height: 45px;
            font-size: 13px;
            padding-left: 10px;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;/*超出3行部分显示省略号，去掉该属性 显示全部*/
            -webkit-box-orient: vertical;
        }
        .money{
            color: #FF0200;
            padding-left: 10px;
            padding-top: 5px;
            font-size: 14px;
            font-weight: bold;
        }
        .button_bottom{
            text-align: center;
            margin-top: 10px;
            margin-bottom: 10px;
        }
    }
    .nodata{
        font-size: 18px;
        color: #c0c4cc;
        font-weight: 500;
    }
}

</style>