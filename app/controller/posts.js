'use strict';

const Controller = require('egg').Controller;

function toInt(str, d = 0) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || d;
}

class PostsController extends Controller {
  async index() {
    const ctx = this.ctx;
    const query = {
      attributes: [ 'id', 'title', 'content' ], // 获取需要的属性
      include: { model: this.ctx.model.User, as: 'author', attributes: [ 'id', 'name', 'age' ] }, // 关联另一个model
      where: { flag: 1 },
      order: [
        [ 'id', 'DESC' ],
      ], // order by
      limit: toInt(ctx.query.limit, 4),
      offset: toInt(ctx.query.offset),
    };
    ctx.body = await ctx.model.Posts.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    const post = await ctx.model.Posts.findByPk(toInt(ctx.params.id));
    const user = await post.getUser();
    post.setDataValue('author', user);
    ctx.body = post;
  }

  async create() {
    const ctx = this.ctx;
    const post = await ctx.model.Posts.create(ctx.request.body);
    ctx.status = 201;
    ctx.body = post;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const post = await ctx.model.Posts.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }

    await post.update(ctx.request.body);
    ctx.body = post;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const post = await ctx.model.Posts.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }

    await post.destroy();
    ctx.status = 200;
  }
}

module.exports = PostsController;
