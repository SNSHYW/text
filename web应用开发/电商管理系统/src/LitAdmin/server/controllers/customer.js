/**
 * books 控制器
 * Created by hyw on 2017/11/2.
 */
 const { compose } = require('async');
 const { isTypedArray, toInteger } = require('lodash');
 const Mock = require('mockjs');
 ordersModel = require('../models/order_model')
 let customerController = {};
 
 /**
  * 获取customer列表
  * @param req
  * @param res
  */
  customerController.find = async function (req, res) {
   let page = parseInt(req.query.page || 1); //页码（默认第1页）
   let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
   let name = req.query.name || ''; //图书名称
   let total1 = 0;
   let rltBooks = [];
   
   if (name.length > 0) {
     let SqlParams = [name,(page-1)*limit,limit];
     //获取数据
     rltBooks =await ordersModel.mysql("select * from service1 where NAME=? limit ?,?;",SqlParams)
     total1 = rltBooks.length; //总条数
   } else {
     let SqlParams = [(page-1)*limit,limit];
     rltBooks =await ordersModel.mysql("select * from service1 limit ?,?;",SqlParams)
     var totalObj  = await ordersModel.mysql("select count(*) total from service1;",SqlParams)
     total1 = totalObj[0].total
     
   }
   res.json({
     total: total1,
     limit: limit,
     books: rltBooks
   })
 };
 
 /**
  * 通过id获取某一条订单
  * @param req
  * @param res
  */
  customerController.findById = function (req, res) {
   let id = _.trim(req.params.id || '');
   if (!id) {
     return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
   }
   let SqlParams = [id];
   let order = ordersModel.mysql("select * from service1 where C_ID =?",SqlParams)
   res.json(order || null)
 };
 
 /**
  * 添加一条图书信息
  * @param req
  * @param res
  */
  customerController.create = function (req, res) {
   let P_ID = req.body.P_ID;
   if(P_ID==''){
    let POLE_NAME = req.body.POLE_NAME;
    let USER_NAME = req.body.USER_NAME;
    let USER_TEL = req.body.USER_TEL;
    let SqlParams=[POLE_NAME,USER_NAME,USER_TEL]
    let status = ordersModel.mysql("insert into service1(P_NAME,USER_NAME,USER_TEL) values(?,?,?);",SqlParams)
    if(!status)  return res.json({"errcode": 40002, "errmsg": "增添失败"});
    res.json({"errcode": 0, "errmsg": "新增成功"})
   }else{
    let POLE_NAME = req.body.POLE_NAME;
    let USER_NAME = req.body.USER_NAME;
    let USER_TEL = req.body.USER_TEL;
    let SqlParams=[P_ID,POLE_NAME,USER_NAME,USER_TEL]
    let status = ordersModel.mysql("insert into servers(P_ID,POLE_NAME,USER_NAME,USER_TEL) values(?,?,?,?);",SqlParams)
    if(!status)  return res.json({"errcode": 40002, "errmsg": "增添失败"});
    res.json({"errcode": 0, "errmsg": "新增成功"})

   }
   
 };
 
 /***
  * 更新一条订单记录
  * @param req
  * @param res
  */
  customerController.update = function (req, res) {
   let id = _.trim(req.params.id || '');
   if (!id) {
     return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
   }
   let S_ID =req.body.S_ID;
   let P_ID = req.body.P_ID;
   let POLE_NAME = req.body.POLE_NAME;
   let USER_NAME = req.body.USER_NAME;
   let USER_TEL = req.body.USER_TEL;
   let SqlParams=[P_ID,POLE_NAME,USER_NAME,USER_TEL,S_ID]
   var status = ordersModel.mysql("update servers set P_ID=?,POLE_NAME=?,USER_NAME=?,USER_TEL=? where S_ID=?;",SqlParams);
 
   if (status) {
     res.json({"errcode": 0, "errmsg": "修改成功"});
   } else {
     res.json({"errcode": 40009, "errmsg": "处理失败"});
   }
 };
 
 /**
  * 更新一条图书记录的部分信息
  * @param req
  * @param res
  */
  customerController.patch = function (req, res) {
 
 };
 
 /**
  * 批量删除
  * @param req
  * @param res
  */
  customerController.deleteBatch = function (req, res) {
   let ids = req.params.ids;
   ids = ids.split(',');
   for(var i=0; i<ids.length;i++){
     console.log(ids[i])
     let MysqlParam = [ids[i]]
     var status = ordersModel.mysql("delete from servers where S_ID=?",MysqlParam)
     console.log(status)
     if (!status) {
       res.json({"errcode": 40009, "errmsg": "处理失败"});
   }
  
   }
   res.json({"errcode": 0, "errmsg": "修改成功"});
 };
 
 /**
  * 单条删除
  * @param req
  * @param res
  */
  customerController.delete = function (req, res) {
   let id = _.trim(req.params.id || '');
   if (!id) {
     return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
   }
   let MysqlParam = [id]
   var status = ordersModel.mysql("delete from servers where S_ID=?",MysqlParam)
   
   if (status) {
     res.json({"errcode": 0, "errmsg": "修改成功"});
   } else {
     res.json({"errcode": 40009, "errmsg": "处理失败"});
   }
 };
 
 module.exports = customerController;
 