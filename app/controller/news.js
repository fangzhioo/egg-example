'use strict';

// app/controller/news.js
const Controller = require('egg').Controller;

/**
 * 框架提供了一个 Controller 基类，并推荐所有的 Controller 都继承于该基类实现。这个 Controller 基类有下列属性：

  ctx - 当前请求的 Context 实例。
  app - 应用的 Application 实例。
  config - 应用的配置。
  service - 应用所有的 service。
  logger - 为当前 controller 封装的 logger 对象。

 */
class NewsController extends Controller {
  async list() {
    const page = this.ctx.request.query.page || 1;
    const newsList = await this.service.news.list(page);
    await this.ctx.render('news/list.tpl', { list: newsList });
  }
}

module.exports = NewsController;
