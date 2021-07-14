/**
 * books 控制器
 * Created by hyw 
 */
 const { compose } = require('async');
 const { isTypedArray, toInteger } = require('lodash');
 const Mock = require('mockjs');
 ordersModel = require('../models/order_model')
 let overviewController = {};
 
 /**
  * 获取customer列表
  * @param req
  * @param res
  */
  overviewController.find = async function (req, res) {
   let rltBooks = [];
     //获取数据
     let sql="select t1.S_ID,user_name,customernum,ordernum from (select S_ID,user_name,(select count(*) from servers c1 where c1.P_ID=c2.S_ID) customernum from servers c2 where POLE_NAME ='服务商')t1 left  join (select s_id,SUM(num) ordernum from orders group by s_id) t2 on t1.S_ID= t2 .s_id;"
     rltBooks =await ordersModel.mysql(sql)
     console.log("查询一次");
     res.json({
     books: rltBooks
   })
 };

 module.exports = overviewController;
 