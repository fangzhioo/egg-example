'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/request.test.js', () => {
  it('should isChrome true', () => {
    const ctx = app.mockContext({
      headers: {
        'User-Agent': 'Chrome/56.0.2924.51',
      },
    });
    assert(ctx.request.isChrome === true);
  });

  it('should isChrome false', () => {
    const ctx = app.mockContext({
      headers: {
        'User-Agent': 'FireFox/1',
      },
    });
    assert(ctx.request.isChrome === false);
  });
});
