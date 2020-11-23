'use strict';

// app/service/news.js
const Service = require('egg').Service;

/**
 * 框架提供了一个 Service 基类，并推荐所有的 Service 都继承于该基类实现。这个 Service 基类有下列属性：
  Service 基类的属性和 Controller 基类属性一致

  ctx - 当前请求的 Context 实例。
  app - 应用的 Application 实例。
  config - 应用的配置。
  service - 应用所有的 service。
  logger - 为当前 service 封装的 logger 对象。

 */
class NewsService extends Service {
  async list(page = 1) {
    // read config
    const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    const res = await this.ctx.curl(`${serverUrl}/article/listArticleByQuery`, {
      data: {
        current: `"${pageSize * (page - 1)}"`,
        pageSize: `"${pageSize * page - 1}"`,
      },
      dataType: 'json',
    });
    // console.log('请求结果 ------>\n', JSON.stringify(res));
    return res.data.data;
  }
}

module.exports = NewsService;
