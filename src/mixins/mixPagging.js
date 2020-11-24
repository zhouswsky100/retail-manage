export default{

  data(){
    return{
      pagging:{
        total:0,
        pageNo:1,
        pageSize:20,
      }
    }
  },
  methods:{
    handleSizeChange(val){

      this.pagging.pageSize = val;
      this.loadListData();

    }
  }

}