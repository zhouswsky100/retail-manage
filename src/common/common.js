import axios from 'axios'
import qs from 'qs';
export default {
    install(Vue,options)
    {
        // 参数 请求路径  需要登录 类型 id
      Vue.prototype.getHttpPost= function(param,url,needToken,type,file){  
        let token =  needToken == true?   sessionStorage.token_type +' '+sessionStorage.access_token : ''
        let ContentType ='application/x-www-form-urlencoded'
        if(file=='file'){
           ContentType ='multipart/form-data'
        }
        if(url=='loginSystem'){
          return new Promise((resolve, reject) => {
            axios({
                  traditional:true,
                  url: this.$rkUtil.getWebServiceUrl(url),
                  method: type,
                  data :qs.stringify(param),
                 // data:param
                  headers: { 
                      'Content-Type':ContentType  ,
                      'Authorization':token
                  }
                })
                .then((res) => {
                  resolve(res.data);
                })
                .catch(function (error) {
                  reject(error);
                });
            
         });

        }else{
          return new Promise((resolve, reject) => {
            axios({
                  traditional:true,
                  url: this.$rkUtil.getWebServiceUrl(url),
                  method: type,
                  data :param,
                  headers: { 
                    'Authorization':token
                  }
                })
                .then((res) => {
                  resolve(res.data);
                })
                .catch(function (error) {
                  reject(error);
                });
            
         });

        }
      };
      Vue.prototype.getHttpGet= function(param,url,needToken,type){  
        let token =  needToken == true?   sessionStorage.token_type +' '+sessionStorage.access_token : ''
          return new Promise((resolve, reject) => {
            axios({
                  url: this.$rkUtil.getWebServiceUrl(url),
                  method: type,
                  params: param,
                  headers: { 
                      'Content-Type': 'application/x-www-form-urlencoded' ,
                      'Authorization':token
                  }
                })
                .then((res) => {
                  resolve(res.data);
                })
                .catch(function (error) {
                  reject(error);
                });
         });
      };
      Vue.prototype.getHttpDown = function(param,url,needToken,type){  
        let token =  needToken == true?   sessionStorage.token_type +' '+sessionStorage.access_token : ''
          return new Promise((resolve, reject) => {
            axios({
                  url: this.$rkUtil.getWebServiceUrl(url),
                  method: type,
                  params: param,
                  responseType: 'blob', 
                  headers: { 
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization':token,
                     Accept: 'application/json',
                     withCredentials: true,
                  }
                })
                .then((res) => {
                  resolve(res.data);
                })
                .catch(function (error) {
                  reject(error);
                });
         });
      };
    }
  }
  