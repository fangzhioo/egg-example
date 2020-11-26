'use strict';

/**
 * Response
 * ctx 上的很多属性和方法都被代理到 response 对象上，对于这些属性和方法使用 ctx 和使用 response 去访问它们是等价的，
 * 例如 ctx.status = 404 和 ctx.response.status = 404 是等价的。
 */
// app/extend/response.js
module.exports = {
  get isSuccess() {
    return this.status === 200;
  },
};
