'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/extend/application.test.js', () => {
  it('application test fangzhiFun', () => {
    // 创建上下文
    const info = app.fangzhiFun();
    console.log(info);
    assert(info);
  });

  it('application test fangzhiKey', () => {
    // 创建上下文
    const info = app.fangzhiKey;
    console.log(info);
    assert(info);
  });

  it('application-unittest test mockxx', () => {
    // 创建上下文
    const info = app.mockXX();
    console.log(info);
    assert(info);
  });
});
