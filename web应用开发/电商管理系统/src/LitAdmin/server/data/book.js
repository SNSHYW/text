/**
 * 初始化图书(book)模拟数据
 *
 * Created by hyw 
 */
const Mock = require('mockjs');

const Books = [];
for (let i = 0; i < 8; i++) {
  Books.push(Mock.mock({
    O_ID: Mock.Random.increment(1)-1,
    NAME: Mock.Random.ctitle(2, 3),
    NUM: Mock.Random.integer(1,1000),
    PRICE:Mock.Random.float(20,50),
    S_ID:Mock.Random.integer(1000,1006)
    //description: Mock.Random.csentence(180, 500),
    //publishAt: Mock.Random.date()
  }))
}

module.exports = Books;
