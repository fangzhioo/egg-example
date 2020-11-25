'use strict';

const Controller = require('../core/base_controller');

class CookiesController extends Controller {
  async add() {
    const ctx = this.ctx;
    let count = ctx.cookies.get('count');
    count = count ? Number(count) : 0;
    ctx.cookies.set('count', ++count);
    this.success(count);
  }

  async remove() {
    const ctx = this.ctx;
    const count = ctx.cookies.set('count', null);
    ctx.status = 204;
    this.success(count);
  }
}

module.exports = CookiesController;
