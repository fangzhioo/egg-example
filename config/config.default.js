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

  // 国际化设置
  config.i18n = {
    defaultLocale: 'zh-CN',
  };

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

  // httpclient
  config.httpclient = {
    // 是否开启本地 DNS 缓存，默认关闭，开启后有两个特性
    // 1. 所有的 DNS 查询都会默认优先使用缓存的，即使 DNS 查询错误也不影响应用
    // 2. 对同一个域名，在 dnsCacheLookupInterval 的间隔内（默认 10s）只会查询一次
    enableDNSCache: false,
    // 对同一个域名进行 DNS 查询的最小间隔时间
    dnsCacheLookupInterval: 10000,
    // DNS 同时缓存的最大域名数量，默认 1000
    dnsCacheMaxLength: 1000,

    request: {
      // 默认 request 超时时间
      timeout: 3000,
    },

    httpAgent: {
      // 默认开启 http KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256,
    },

    httpsAgent: {
      // 默认开启 https KeepAlive 功能
      keepAlive: true,
      // 空闲的 KeepAlive socket 最长可以存活 4 秒
      freeSocketTimeout: 4000,
      // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
      timeout: 30000,
      // 允许创建的最大 socket 数
      maxSockets: Number.MAX_SAFE_INTEGER,
      // 最大空闲 socket 数
      maxFreeSockets: 256,
    },
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
