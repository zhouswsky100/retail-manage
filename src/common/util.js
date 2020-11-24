import config from './config'

export default{
  install : function (Vue, options) {
    Vue.prototype.$rkUtil = {

    getWebServiceUrl : function(name) {
      let dev
      let webServiceUrls = {
        staticUrl: config.staticUrl,
        webSoket:config.webSoket,
        login:'/retailer-api/login', //登录
        reg : '/retailer-api/retailers/reg',//注册
        forgetPassword:'/retailer-api/retailers/forgetPassword',//找回密码
        myWorkbench: `/retailer-api/retailers/myWorkbench`,//图标
        prodReport: `/retailer-api/retailers/prodReport`,//图标2
        orderReport: `/retailer-api/retailers/orderReport`,//图标3
        queryByClassificationId:  `/retailer-api/brands/queryByClassificationId`,//商品列表
        classificationTree:`/retailer-api/classifications/classificationTree`,//商品类别
        queryByClassificationId: `/retailer-api/brands/queryByClassificationId`,//获取品牌列表
        querySaleProducts :'/retailer-api/retailers/querySaleProducts'//商品库的商品



       

       
      
      }
      if(process.env.NODE_ENV === 'production'){
         dev  = config.interface.prod ;
      }else{//开发
         dev  = config.interface.dev ;
      }   
      return dev + webServiceUrls[name];
    },
    handleTree:function(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parent_id'
      children = children || 'children'
      rootId = rootId || 0
      //对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data))
      //循环所有项
      const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
          //返回每一项的子级数组
          return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
      });
      return treeData != '' ? data : data;
    },
    getNextDate:function (date, days) {
      if(days == undefined || days == '') {
        days = 1;
      }
      var date = new Date(date);
      date.setDate(date.getDate() + days);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var mm = "'" + month + "'";
      var dd = "'" + day + "'";
      
      //单位数前面加0
      if(mm.length == 3) {
          month = "0" + month;
      }
      if(dd.length == 3) {
          day = "0" + day;
      }

      var time = date.getFullYear() + "-" + month + "-" + day
      return time
    },
   };
  }
};