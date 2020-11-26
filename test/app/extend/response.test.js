'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/response.test.js', () => {
  it('should isSuccess true', () => {
    const ctx = app.mockContext();
    ctx.status = 200;
    assert(ctx.response.isSuccess === true);
  });

  it('should isSuccess false', () => {
    const ctx = app.mockContext();
    ctx.status = 404;
    assert(ctx.response.isSuccess === false);
  });
});
