'use strict';

const { app,
  // assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/response.test.js', () => {
  it('response test foo', () => {
    // 创建上下文
    const context = app.mockContext({});
    context.response.foo = 'this is a token';
    context.get('x-response-foo');
  });
});
