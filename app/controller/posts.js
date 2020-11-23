'use strict';
const { Controller } = require('egg');

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
    ctx.body = `app.controllers.posts.index [${ctx.request.query.page}] [${ctx.request.query.size}]`;
  }

  async new() {
    const { ctx } = this;
    ctx.body = 'app.controllers.posts.new';
  }

  async show() {
    const { ctx } = this;
    ctx.body = `app.controllers.posts.show [${ctx.params.id}]`;
  }

  async edit() {
    const { ctx } = this;
    ctx.body = `app.controllers.posts.edit [${ctx.params.id}]`;
  }

  async create() {
    const { ctx } = this;
    // 模拟发起 post 请求。
    // curl -X POST http://127.0.0.1:7001/api/posts --data '{"name":"controller"}' --header 'Content-Type:application/json'
    ctx.body = `app.controllers.posts.create [${JSON.stringify(ctx.request.body)}]`;
  }

  async update() {
    const { ctx } = this;
    ctx.body = `app.controllers.posts.update [${ctx.params.id}]`;
  }

  async destroy() {
    const { ctx } = this;
    ctx.body = `app.controllers.posts.destroy [${ctx.params.id}]`;
  }
}

module.exports = PostsController;
