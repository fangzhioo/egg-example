'use strict';
const IS_CHROME = Symbol('Request#isChrome');

/**
 * Request https://eggjs.org/zh-cn/basics/extend.html#request
 * ctx 上的很多属性和方法都被代理到 request 对象上，
 * 对于这些属性和方法使用 ctx 和使用 request 去访问它们是等价的，例如 ctx.url === ctx.request.url。
 *
 * 框架会把 app/extend/request.js 中定义的对象与内置 request 的 prototype 对象进行合并，在处理请求时会基于扩展后的 prototype 生成 request 对象。
 */

// app/extend/request.js
module.exports = {
  get isChrome() {
    if (!this[IS_CHROME]) {
      const ua = this.get('User-Agent').toLowerCase();
      this[IS_CHROME] = ua.includes('chrome/');
    }
    return this[IS_CHROME];
  },
};
