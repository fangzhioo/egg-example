'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('posts', '/posts', controller.posts);
};
