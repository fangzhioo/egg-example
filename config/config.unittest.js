'use strict';

// config/config.unittest.js
// only read at development mode, will override default 单元测试配置文件

module.exports = {
  myAppName: 'egg-unittest',
  // ORM框架
  sequelize: {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-sequelize-unittest',
    username: 'root',
    password: 'kirito',
  },
};
