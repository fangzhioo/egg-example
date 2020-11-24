'use strict';

module.exports = app => {
  const { router, controller } = app;
  // RESTful风格
  router.resources('posts', '/posts', controller.posts);
};
