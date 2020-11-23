'use strict';

/**
 * 一般来说中间件也会有自己的配置。在框架中，一个完整的中间件是包含了配置处理的。
 * 我们约定一个中间件是一个放置在 app/middleware 目录下的单独文件，它需要 exports 一个普通的 function，接受两个参数：

  options: 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来。
  app: 当前应用 Application 的实例。

  https://eggjs.org/zh-cn/basics/middleware.html#%E9%85%8D%E7%BD%AE
 */

// app/middleware/gzip.js
const isJSON = require('koa-is-json');
const zlib = require('zlib');

module.exports = options => {
  return async function gzip(ctx, next) {
    await next();

    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) return;

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) return;

    if (isJSON(body)) body = JSON.stringify(body);

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};
