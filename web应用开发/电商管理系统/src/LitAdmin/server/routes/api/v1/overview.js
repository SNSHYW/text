/***
 * books相关路由
 * 采用 restful api 风格
 */
 var express = require('express');
 var router = express.Router();
 var indexRouter = {};
 var userController = require('../../../controllers/user');
 var overviewController = require('../../../controllers/overview');
 
 //先检查登录
 router.use(userController.checkLogin);
 
 //返回book的集合
 router.get('/', overviewController.find);
 
 indexRouter.router = router;
 
 module.exports = indexRouter;
 