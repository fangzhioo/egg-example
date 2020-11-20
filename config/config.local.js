'use strict';

// config/config.local.js
// only read at development mode, will override default

module.exports = {
  robot: {
    ua: [
      /Baiduspider/i,
    ],
  },
};
