'use strict';

// config/config.unittest.js
// only read at development mode, will override default 单元测试配置文件

module.exports = {
  myAppName: 'egg-unittest',
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
