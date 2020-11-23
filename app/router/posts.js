'use strict';

module.exports = app => {
  const { router, controller } = app;
  // RESTful风格
  router.resources('posts', '/api/posts', controller.posts);
};
