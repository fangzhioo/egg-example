'use strict';

const Controller = require('../core/base_controller');

function toInt(str, d = 0) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || d;
}

/**
* @controller posts
*/
class PostsController extends Controller {

  /**
  * @summary posts list
  * @description posts lists
  * @router get /posts
  * @request query integer limit 页尺寸
  * @request query integer offset 页数（0开始）
  * @response 200 postsListResponse desc
  */
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

    const result = await ctx.model.Posts.findAll(query);
    this.success(result);
  }

  /**
  * @summary 获取posts详情
  * @description 根据id获取posts详情
  * @router get /posts/{id}
  * @request path integer id id
  * @response 200 postsDetailResponse desc
  */
  async show() {
    const ctx = this.ctx;
    const post = await ctx.model.Posts.findByPk(toInt(ctx.params.id));
    const user = await post.getAuthor();
    post.setDataValue('author', user);
    this.success(post);
  }

  /**
  * @summary 创建posts
  * @description 创建
  * @router post /posts
  * @request body createPostsBody posts 文章
  * @response 200 postsDetailResponse desc
  */
  async create() {
    const ctx = this.ctx;
    const post = await ctx.model.Posts.create(ctx.request.body);
    ctx.status = 201;
    this.success(post);
  }

  /**
  * @summary 更新
  * @description 更新
  * @router put /posts/{id}
  * @request body updatePostsBody posts 文章
  * @request path integer *id 文章id
  * @response 200 postsDetailResponse desc
  */
  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const post = await ctx.model.Posts.findByPk(id);
    if (!post) {
      ctx.status = 404;
      return;
    }

    await post.update(ctx.request.body);
    this.success(post);

  }

  /**
  * @summary 删除
  * @description 删除posts
  * @router delete /posts/{id}
  * @request path integer id id
  * @response 200 baseBoolResponse desc
  */
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
    this.success(true);
  }
}

module.exports = PostsController;
