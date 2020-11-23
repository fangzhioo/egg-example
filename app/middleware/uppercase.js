'use strict';

// 如果我们想把用户某一类请求的参数都大写，可以通过中间件来实现。
module.exports = () => {
  return async function uppercase(ctx, next) {
    // 参数中的 q，转换为大写
    ctx.query.q = ctx.query.q && ctx.query.q.toUpperCase();
    await next();
  };
};
