'use strict';
const { Controller } = require('egg');

// app/controller/user.js
class UserController extends Controller {
  async info() {
    const { ctx } = this;
    ctx.body = {
      name: `hello ${ctx.params.id}`,
    };
  }

  // 表单校验
  async create() {
    const { ctx } = this;
    const createRule = {
      username: {
        type: 'email',
      },
      password: {
        type: 'password',
        compare: 'rePassword',
      },
    };
    // 如果校验报错，会抛出异常
    ctx.validate(createRule);
    ctx.body = ctx.request.body;
  }

  // 外部重定向
  async search() {
    const { ctx } = this;
    const type = ctx.query.type;
    const q = ctx.query.q || 'nodejs';

    if (type === 'bing') {
      ctx.redirect(`http://cn.bing.com/search?q=${q}`);
    } else {
      ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
    }
  }
}

module.exports = UserController;
