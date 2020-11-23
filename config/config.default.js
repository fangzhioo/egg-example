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

  // add your middleware config here
  config.middleware = [
    'robot', // add middleware robot
  ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    news: {
      pageSize: 5,
      serverUrl: 'https://mock.startdt.net/mock/356/myvue/api',
    },
    robot: {
      ua: [
        /curl/i,
        /Baiduspider/i,
      ],
    },
    mysql: {
      clients: {
        local: {
          // host
          host: '127.0.0.1',
          // port
          port: '3306',
          // username
          user: 'root',
          // password
          password: 'kirito777',
          // database
          database: 'test',
        },
      },
      // default configuration for all databases
      default: {},
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
