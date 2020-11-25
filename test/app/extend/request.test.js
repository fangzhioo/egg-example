'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/request.test.js', () => {
  it('request test foo', () => {
    // 创建上下文
    const context = app.mockContext({});
    const info = context.request.foo;
    console.log(info); // 127.0.0.1
    assert(info);
  });
});
