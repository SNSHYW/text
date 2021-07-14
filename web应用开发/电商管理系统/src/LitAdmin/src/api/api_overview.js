/**
 * Created by hyw
 * 图书相关api
 */
 import * as API from './'

 export default {
 
   //查寻
   findList: params => {
     return API.GET('/api/v1/overview', params)
   }
 }
 