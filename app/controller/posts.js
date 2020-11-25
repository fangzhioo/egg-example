'use strict';
const Controller = require('../core/base_controller');
/**
 *  RESTful 风格的 URL 定义:
 *    方法      路径           路由名称      路由Action
      GET	    /posts	        posts	      app.controllers.posts.index
      GET	    /posts/new	    new_post	  app.controllers.posts.new
      GET	    /posts/:id	    post	      app.controllers.posts.show
      GET	    /posts/:id/edit	edit_post	  app.controllers.posts.edit
      POST	  /posts	        posts	      app.controllers.posts.create
      PUT	    /posts/:id	    post	      app.controllers.posts.update
      DELETE	/posts/:id	    post	      app.controllers.posts.destroy

    如果我们不需要其中的某几个方法，可以不用在 posts.js 里面实现，这样对应 URL 路径也不会注册到 Router。
 */

// app/controller/posts.js
class PostsController extends Controller {

  async index() {
    const { ctx } = this;
    const { page, size } = ctx.request.query;
    const result = await ctx.service.posts.list({ size, page });
    this.success(result);
  }

  async new() {
    const { ctx } = this;
    ctx.body = 'app.controllers.posts.new';
  }

  async show() {
    const { ctx } = this;
    // query参数 （queries、query、querystring）和 path参数（params）
    const { queries, query, querystring } = ctx;
    ctx.body = {
      title: `app.controllers.posts.show [${ctx.params.id}]`,
      queries,
      query,
      querystring,
    };
  }

  async edit() {
    this.success(`app.controllers.posts.edit [${this.ctx.params.id}]`);
  }

  async create() {
    const { ctx, service } = this;

    try {
      // 规则参考 https://github.com/node-modules/parameter#rule
      const createRule = {
        title: { type: 'string' },
        content: { type: 'json' }, // 字段必须是 json 字符串
      };
      // 校验参数 如果不传第二个参数会自动校验 `ctx.request.body`
      ctx.validate(createRule);
    } catch (error) {
      // 当校验异常时，会直接抛出一个异常，异常的状态码为 422，errors 字段包含了详细的验证不通过信息。
      // 如果想要自己处理检查的异常，可以通过 try catch 来自行捕获。
      ctx.logger.warn(error.errors);
      this.fail(error.errors || '参数校验失败');
      return;
    }

    // 组装参数
    const req = Object.assign(ctx.request.body, { ...this.user });
    // 调用 Service 进行业务处理
    const res = await service.posts.create(req);
    // 设置响应内容和响应状态码
    if (res) {
      this.success(res);
    } else {
      this.fail('新建失败！');
    }

    // 模拟发起 post 请求。
    // curl -X POST http://127.0.0.1:7001/api/posts --data '{"name":"controller"}' --header 'Content-Type:application/json'
    // ctx.body = `app.controllers.posts.create [${JSON.stringify(ctx.request.body)}]`;
  }

  async update() {
    const { ctx } = this;
    // 组装参数
    const req = Object.assign({ id: ctx.params.id }, ctx.request.body, { ...this.user });

    const result = await this.service.posts.updateSelected(req);

    this.success(result);
  }

  async destroy() {
    const { ctx } = this;
    ctx.body = `app.controllers.posts.destroy [${ctx.params.id}]`;
  }
}

module.exports = PostsController;
