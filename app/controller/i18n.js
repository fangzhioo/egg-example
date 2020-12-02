'use strict';

const Controller = require('egg').Controller;

/**
 * 切换语言
 * 我们可以通过下面几种方式修改应用的当前语言（修改后会记录到 locale 这个 Cookie），下次请求直接用设定好的语言。
    优先级从高到低：
    1、query: /?locale=en-US
    2、cookie: locale=zh-TW
    3、header: Accept-Language: zh-CN,zh;q=0.5

    配置 config/config.default.js
    exports.i18n = {
      queryField: 'locale',
      cookieField: 'locale',
      // Cookie 默认一年后过期， 如果设置为 Number，则单位为 ms
      cookieMaxAge: '1y',
    };
 */
class I18nController extends Controller {
  async hello() {
    // 我们可以使用 __ (Alias: gettext) 函数获取 locale 文件夹下面的多语言文本。 注意: __ 是两个下划线
    const email = this.ctx.__('Email');
    // 支持模版 如果文本中含有 %s，%j 等 format 函数，可以按照 util.format() 类似的方式调用
    const welcome = this.ctx.gettext('Welcome back, %s!', 'Kirito');
    // 同时支持数组下标占位符方式，例如：
    const hello = this.ctx.__('Hello {0}! My name is {1}.', [ 'fangzhi', 'kirito' ]);
    this.ctx.response.body = {
      email,
      welcome,
      hello,
    };
  }
}

module.exports = I18nController;
