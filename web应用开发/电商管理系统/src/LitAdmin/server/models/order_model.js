const mysql = require('mysql')

// 创建 mysql 连接池资源
var pool = mysql.createPool({
  host   : 'localhost',
  user   : 'root',
  password : '001107',
  database : 'ds',
  port:3306,
  acquireTimeout: 15000, // 连接超时时间
  connectionLimit: 10, // 最大连接数
  waitForConnections: true, // 超过最大连接时排队
  queueLimit: 0, // 排队最大数量(0 代表不做限制)
});         
/**
  * 查询数据库！
  */
 exports.mysql =(sql,SqlParams)=>{
   var promise = new Promise(function(resolve,reject){
    pool.getConnection(function(err,connection){
      if(err) reject(err)
      connection.query(sql,SqlParams,function(err,results,fields){
        if(err) reject(err)//错误处理
        resolve(results);//数据处理完成
      })
      connection.release();
    })
   })
   return promise;
 }
 