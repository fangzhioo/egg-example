'use strict';
const BAR = Symbol('Application#bar');

/**
 * [方法拓展]
 * 框架会把 app/extend/application.js 中定义的对象与 Koa Application 的 prototype 对象进行合并，
 * 在应用启动时会基于扩展后的 prototype 生成 app 对象。
 *
 * [属性拓展]
 * 一般来说属性的计算只需要进行一次，那么一定要实现缓存，否则在多次访问属性时会计算多次，这样会降低应用性能。
 * 推荐的方式是使用 Symbol + Getter 的模式。
 */
// app/extend/application.js
module.exports = {
  // 方法拓展
  fangzhiFun() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    return 'this is fangzhi‘s function！！';
  },

  // 属性拓展
  get fangzhiKey() {
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[BAR]) {
      // 实际情况肯定更复杂
      this[BAR] = `${this.config.keys} - ${Date.now()}`;
    }
    return this[BAR];
  },
};
