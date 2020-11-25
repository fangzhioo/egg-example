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
    // 框架通过 security 插件覆盖了 koa 原生的 ctx.redirect 实现，以提供更加安全的重定向。

    // ctx.redirect(url) 如果不在配置的白名单域名内，则禁止跳转。
    // ctx.unsafeRedirect(url) 不判断域名，直接跳转，一般不建议使用，明确了解可能带来的风险后使用。
    // 用户如果使用ctx.redirect方法，需要在应用的配置文件中做如下配置
    // exports.security = {
    //   domainWhiteList:['.domain.com'],  // 安全白名单，以 . 开头
    // };
    // 若用户没有配置 domainWhiteList 或者 domainWhiteList数组内为空，则默认会对所有跳转请求放行，即等同于ctx.unsafeRedirect(url)
    if (type === 'bing') {
      ctx.redirect(`http://cn.bing.com/search?q=${q}`);
    } else {
      ctx.redirect(`https://www.google.co.kr/search?q=${q}`);
    }
  }
}

module.exports = UserController;
