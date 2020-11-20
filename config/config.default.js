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
        /Baiduspider/i,
      ],
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
