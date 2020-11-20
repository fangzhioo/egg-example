'use strict';
// 假设有个需求：我们的新闻站点，禁止百度爬虫访问。
// app/middleware/robot.js
// options === app.config.robot
// eslint-disable-next-line no-unused-vars
module.exports = (options, app) => {
  return async function robotMiddleware(ctx, next) {
    const source = ctx.get('user-agent') || '';
    const match = options.ua.some(ua => ua.test(source));
    if (match) {
      ctx.status = 403;
      ctx.message = 'Go away, robot.';
    } else {
      await next();
    }
  };
};
