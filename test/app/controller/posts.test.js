'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/posts.test.js', () => {
  it('should posts create', () => {
    app.mockSession({
      user: {
        author: 'kirito',
      },
    });
    app.httpRequest()
      .post('/posts')
      .send({
        title: '我是标题',
        content: '{"json": 1}',
      })
      .expect(200);
  });

});
