import { aliyunOSSConfig,uploadFileUrl } from '@/config/apis';
import OSS from 'ali-oss'
import axios from './ajax';
import uuid from 'uuid/v4';

// let client = null;

// async function getOSSConfig(){

//   let { error,data } = await axios.get(aliyunOSSConfig);
//   if(error)return false;
//   return data;

// }

// export default async function uploadFile(file){

//   if(!client){

//     let data = await getOSSConfig();
//     client = new OSS({
//       region: data.region,
//       accessKeyId: data.accessKeyId,
//       accessKeySecret: data.accessKeySecret,
//       bucket: data.bucket,
//       stsToken: data.securityToken
//     });

//   }

//   let ext = file.name.slice(file.name.lastIndexOf('.'));
//   let { url } = await client.put(uuid() + ext, file);
//   return url;

// }


export default async function uploadFile(file){

  let formData = new FormData();
  formData.append('file',file);
  let { data,error } = await axios.post(uploadFileUrl,formData);
  if(error)return false;
  return data.url;

}