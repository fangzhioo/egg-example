'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/context.test.js', () => {
  it('context test fangzhiFun', () => {
    // 创建上下文
    const context = app.mockContext({});
    const info = context.fangzhiFun();
    console.log(info);
    assert(info);
  });

  it('context test fangzhiKey', () => {
    // 创建上下文
    const context = app.mockContext({});
    const info = context.fangzhiKey;
    console.log(info);
    assert(info);
  });
});
