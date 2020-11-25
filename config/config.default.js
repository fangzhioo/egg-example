/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605844228996_652';

  // 模板渲染配置
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    },
  };

  // 配置bodyParser的默认参数 变更解析时允许的最大长度
  config.bodyParser = {
    jsonLimit: '1mb',
    formLimit: '1mb',
  };

  // 配置获取上传文件
  config.multipart = {
    mode: 'stream', // 1.File模式 2.Stream 模式
    fileExtensions: [ '.apk' ], // 增加对 apk 扩展名的文件支持
    // whitelist: [ '.png' ], // 覆盖整个白名单，只允许上传 '.png' 格式 当重写了 whitelist 时，fileExtensions 不生效。
  };

  // cookies配置
  config.cookies = {
    // httpOnly: true | false,
    // sameSite: 'none|lax|strict',
  };

  // add your middleware config here
  config.middleware = [
    'robot', // add middleware robot
    'gzip', // add middleware
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    news: {
      pageSize: 5,
      serverUrl: 'https://mock.startdt.net/mock/356/myvue/api',
    },
    // 配置 防爬虫 配置
    robot: {
      ua: [
        /curl/i,
        /Baiduspider/i,
      ],
    },
    // 配置 gzip 中间件的配置 match 和 ignore
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
      match(ctx) {
        // 只有 ios 设备才开启
        const reg = /iphone|ipad|ipod/i;
        return reg.test(ctx.get('user-agent'));
      },
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
