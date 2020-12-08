'use strict';

module.exports = {
  PostVO: {
    id: { type: 'integer', required: true, example: 1 },
    title: { type: 'string', required: false, example: 'title', description: '标题' },
    content: { type: 'string', required: false, example: 'content', description: '内容' },
    author: { type: 'UserVO', required: false, description: '作者' },
  },
  UserVO: {
    id: { type: 'integer', required: true, example: 0 },
    name: { type: 'string', required: true, example: 'kirito', description: '用户名字' },
    age: { type: 'integer', required: true, example: 0, description: '用户年龄' },
  },
};
