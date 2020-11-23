'use strict';

const { app,
  // mock, assert
} = require('egg-mock/bootstrap');

describe('test/app/service/some.test.js', () => {
  it('should get list', async () => {
    const ctx = app.mockContext({});
    const list = await ctx.service.some.list();
    // console.log(list);
    return list && list.length;
  });
});
