'use strict';

// app/core/base_controller.js
const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.user || { author: 'fangzhi' };
  }

  success(data = null, msg = '操作成功') {
    this.ctx.response.body = {
      success: true,
      data,
      msg,
    };
  }

  fail(msg = '操作失败') {
    this.ctx.response.body = {
      success: false,
      data: false,
      msg,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, msg);
  }
}
module.exports = BaseController;
