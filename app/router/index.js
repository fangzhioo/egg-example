'use strict';

/**
 * @param {Egg.Application} app - egg application

  router.verb('path-match', app.controller.action);
  router.verb('router-name', 'path-match', app.controller.action);
  router.verb('path-match', middleware1, ..., middlewareN, app.controller.action);
  router.verb('router-name', 'path-match', middleware1, ..., middlewareN, app.controller.action);

  路由完整定义主要包括5个主要部分:

  verb - 用户触发动作，支持 get，post 等所有 HTTP 方法，后面会通过示例详细说明。
      router.head - HEAD
      router.options - OPTIONS
      router.get - GET
      router.put - PUT
      router.post - POST
      router.patch - PATCH
      router.delete - DELETE
      router.del - 由于 delete 是一个保留字，所以提供了一个 delete 方法的别名。
      router.redirect - 可以对 URL 进行重定向处理，比如我们最经常使用的可以把用户访问的根目录路由到某个主页。
  router-name 给路由设定一个别名，可以通过 Helper 提供的辅助函数 pathFor 和 urlFor 来生成 URL。(可选)
  path-match - 路由 URL 路径。
  middleware1 - 在 Router 里面可以配置多个 Middleware。(可选)
  controller - 指定路由映射到的具体的 controller 上，controller 可以有两种写法：
      app.controller.user.fetch - 直接指定一个具体的 controller
      'user.fetch' - 可以简写为字符串形式
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/home', controller.home.index);
  router.get('/file', controller.home.file);
  router.get('/header', controller.home.header);

  router.get('/news', controller.news.list);

  // i18n
  router.get('/i18n/hello', controller.i18n.hello);

  // cookies
  router.get('/cookies/set', controller.cookies.add);
  router.get('/cookies/remove', controller.cookies.remove);

  // 内部重定向
  router.redirect('/', '/home', 302);

  require('./upload')(app);
  require('./users')(app);
};
