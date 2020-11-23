'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    // 如上面例子中的 ctx.request.query.id 和 ctx.query.id 是等价的，ctx.response.body= 和 ctx.body= 是等价的。
    // 需要注意的是，获取 POST 的 body 应该使用 ctx.request.body，而不是 ctx.body。
    ctx.response.body = 'hi, egg';
  }
}

module.exports = HomeController;
