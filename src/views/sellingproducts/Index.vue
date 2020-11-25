<template>
<div id="sellingproducts">
    <div class="box">
        <el-table
            :data="productList"
            v-loading="loading" 
            align="center"
            header-align="center"
            element-loading-text="loading"   
            style="width: 100%">
        <el-table-column
            label="Pictures"
            align="center"
            width="130">
            <template #default="{ row }">
                <div>
                    <img
                        :src="row.productSpu.spuMainImg"
                        height="120px"
                        width="120px"
                        alt=""
                    >
                </div>
            </template>
        </el-table-column>
        <el-table-column
            label="name"
            prop="createTime"
            width="300"
            align="center"
        >
            <template #default="{ row }">
                <router-link :to="{ name:'product-detail2',params:{ id:row.id },query:{ isSeal:true } }">
                <span class="name"> {{ row.prodName }}</span>
                </router-link>
            </template>
        </el-table-column>
        <el-table-column
            label="Price"
            align="center"
            width="100"
        >
            <template #default="{ row }">
                 <span>{{ row.retailerProductSkuList[0].settlement }}</span>
            </template>
       </el-table-column>
        <el-table-column
            label="Unit"
            width="100"
        >
            <template #default="{ row }">
                {{ row.productSpu.unit }}
            </template>
        </el-table-column>
        <el-table-column
            label="Operating"
            align="center"
        >
        <template #default="{ row }">
            <el-button size="mini"  type="success" @click="()=>{ activeProductId = row.id;showDialog=true }">Edit</el-button>
            <el-button size="mini" type="primary" @click="publishButOnclick(row)"> Import to store</el-button>
            <el-button size="mini" type="danger" @click="removeSaleProduct(row.id)">Delete</el-button>
        </template>
        </el-table-column>
        </el-table>
        <el-pagination
            v-show="pagging.total"
            :current-page="pagging.pageNo"
            :page-sizes="[10,20, 50, 100]"
            :page-size="pagging.pageSize"
            layout="prev, pager, next,sizes,total"
            :total="pagging.total"
            style="text-align:right"
            @size-change="handleSizeChange"
            @current-change="initData">
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
      productList:[],
      showDialog:false,
      showDialog2:false,
      showDialog3:false,
      activeProductId:'',
      loading:true,
      publishProduct:{},  //将要发布的商品
      checkedIds:[],
      publishStores:[],  //商品以及发布的店铺
      notPublishStores:[], //商品未发布的店铺
      publishStoreIds:[] //准备发布的商铺
    }
  },
  methods:{
        initData() {
            let params={
                prodName:this.searchKey,
                pageNo:1,
                pageSize:this.pagging.pageSize,
            }
            this.getHttpGet(params,'queryRetailerProductSpuPage',true,'get').then(res => {
                this.loading = false
            if(res.status==200){
                this.productList = res.data.records.filter(ele=> ele.prodName);
                this.pagging.total = res.data.total;
                this.pagging.pageNo = res.data.current;

            }else{
                this.$message.error(res.error);
            }
            },error=>{
                this.$message.error('There is a problem with the network');
            })
        },
        removeSaleProduct(id){
          this.$confirm('Are you sure you want to delete？', 'Promotion', {
              confirmButtonText: 'ok',
              cancelButtonText: 'close',
              type: 'warning'
            }).then(() => {
              this.getHttpGet({retailerProductSpuId:id},'removeSaleProduct',true,'delete').then(res => {
                if(res.status==200){
                    this.$message({
                      message: 'remove success',
                      type: 'success'
                    }); 
                    this.initData()
                }
                },error=>{
                     this.$message.error('There is a problem with the network');
                })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: 'Delete Close'
              });          
            });
        }
  },
  mounted(){
      this.initData()
  }

}
</script>

<style lang="less" scoped>
#sellingproducts{
    .box{
        padding: 20px;
        border: 1px solid #e6ebf5;
        background-color: #fff;
        border-radius: 8px;
        height: auto;
        margin: 10px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
}

</style>