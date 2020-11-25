'use strict';

const { Subscription } = require('egg');

/**
 *  定时任务 https://eggjs.org/zh-cn/basics/schedule.html
    - task 或 subscribe 同时支持 generator function 和 async function。
    - task 的入参为 ctx，匿名的 Context 实例，可以通过它调用 service 等。

    cron 方式
    *    *    *    *    *    *
    ┬    ┬    ┬    ┬    ┬    ┬
    │    │    │    │    │    |
    │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
    │    │    │    │    └───── month (1 - 12)
    │    │    │    └────────── day of month (1 - 31)
    │    │    └─────────────── hour (0 - 23)
    │    └──────────────────── minute (0 - 59)
    └───────────────────────── second (0 - 59, optional)
 */

class UpdateCache extends Subscription {
  // 通过 schedule 属性来设置定时任务的执行间隔等配置
  // 1 分钟间隔 定时任务可以指定 interval 或者 cron 两种不同的定时方式。
  static get schedule() {
    return {
      interval: '1m', // 1 分钟间隔
      // cron: '0 0 */3 * * *', // 每三小时准点执行一次
      type: 'all', // 指定所有的 worker 都需要执行
    };
  }

  // subscribe 是真正定时任务执行时被运行的函数
  async subscribe() {
    const res = await this.ctx.curl('https://mock.startdt.net/mock/356/myvue/api/currentUser', {
      dataType: 'json',
    });
    this.ctx.app.cache = res.data;
    console.log(res.data);
  }
}

module.exports = UpdateCache;
