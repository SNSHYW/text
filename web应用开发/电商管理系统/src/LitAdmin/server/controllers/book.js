/**
 * books 控制器
 * Created by hyw 
 */
const { compose } = require('async');
const { isTypedArray, toInteger } = require('lodash');
const Mock = require('mockjs');
ordersModel = require('../models/order_model')
let bookController = {};


/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
bookController.find = async function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let name = req.query.name || ''; //图书名称
  let total1 = 0;
  let rltBooks = [];
  
  if (name.length > 0) {
    let SqlParams = [name,(page-1)*limit,limit];
    //获取数据
    rltBooks =await ordersModel.mysql("select * from service1 where Name=? limit ?,?;",SqlParams)
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
bookController.findById = function (req, res) {
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
bookController.create = function (req, res) {
  let C_id = req.body.C_id;
  let Name = req.body.Name;
  let Phone = req.body.Phone;
  let Style = req.body.Style;
  let P_id = req.body.P_id;
  let level = req.body.level;
  let C_id =req.body.C_id
  let NAME = req.body.NAME;
  let NUM = req.body.NUM;
  let PRICE = req.body.PRICE;
  let S_ID = req.body.S_ID;
  let SqlParams=[C_id,Name,,PRICE,S_ID]
  let status = ordersModel.mysql("insert into orders(O_ID,NAME,NUM,PRICE,S_ID) values(?,?,?,?,?);",SqlParams)
  if(!status)  return res.json({"errcode": 40002, "errmsg": "增添失败"});
  res.json({"errcode": 0, "errmsg": "新增成功"})
};

/***
 * 更新一条订单记录
 * @param req
 * @param res
 */
bookController.update = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let NAME = req.body.NAME;
  let NUM = req.body.NUM;
  let PRICE = req.body.PRICE;
  let S_ID = req.body.S_ID;
  SqlParams=[NAME,NUM,PRICE,S_ID,id]
  var status = ordersModel.mysql("update orders set NAME=?,NUM=?,PRICE=?,S_ID=? where O_ID=?;",SqlParams);

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
bookController.patch = function (req, res) {

};

/**
 * 批量删除
 * @param req
 * @param res
 */
bookController.deleteBatch = function (req, res) {
  let ids = req.params.ids;
  ids = ids.split(',');
  for(var i=0; i<ids.length;i++){
    console.log(ids[i])
    let MysqlParam = [ids[i]]
    var status = ordersModel.mysql("delete from orders where O_ID=?",MysqlParam)
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
bookController.delete = function (req, res) {
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  let MysqlParam = [id]
  var status = ordersModel.mysql("delete from orders where O_ID=?",MysqlParam)
  if (status) {
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

module.exports = bookController;
