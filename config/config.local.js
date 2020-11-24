'use strict';

// config/config.local.js
// only read at development mode, will override default

module.exports = {
  myAppName: 'egg-local',
  robot: {
    ua: [
      /Baiduspider/i,
    ],
  },
  security: {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
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
