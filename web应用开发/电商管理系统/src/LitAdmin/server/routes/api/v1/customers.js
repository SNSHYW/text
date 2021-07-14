/***
 * books相关路由
 * 采用 restful api 风格
 */
 var express = require('express');
 var router = express.Router();
 var indexRouter = {};
 var userController = require('../../../controllers/user');
 var customerController = require('../../../controllers/customer');
 
 //先检查登录
 router.use(userController.checkLogin);
 
 //返回book的集合
 router.get('/', customerController.find);
 
 //返回指定的book
 router.get('/:id', customerController.findById);
 
 //创建book
 router.post('/', customerController.create);
 
 //更新book全部信息
 router.put('/:id', customerController.update);
 
 //更新book部分信息
 router.patch('/:id', customerController.patch);
 
 //批量删除
 router.delete('/batch/:ids', customerController.deleteBatch);
 
 //删除指定的book
 router.delete('/:id', customerController.delete);
 

 indexRouter.router = router;
 
 module.exports = indexRouter;
 