'use strict';

module.exports = app => {
  const { router, controller } = app;
  // https://eggjs.org/zh-cn/basics/router.html#router-%E8%AF%A6%E7%BB%86%E5%AE%9A%E4%B9%89%E8%AF%B4%E6%98%8E
  router.get('/user/:id', controller.user.info);
  router.post('/user', controller.user.create);
};
