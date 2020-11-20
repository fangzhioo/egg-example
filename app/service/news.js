'use strict';

// app/service/news.js
const Service = require('egg').Service;

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
