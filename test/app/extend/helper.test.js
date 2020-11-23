'use strict';

const { app,
  // mock, assert
} = require('egg-mock/bootstrap');

describe('test/app/extend/helper.test.js', () => {
  it('relativeTime', () => {
    // 创建上下文
    const context = app.mockContext({});
    const dateStr = context.helper.relativeTime(Date.now());
    console.log(dateStr);
    return dateStr;
  });
});
