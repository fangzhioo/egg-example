'use strict';
const BAR = Symbol('Context#bar');

/**
 * [Context] https://eggjs.org/zh-cn/basics/extend.html
  - middleware 中 this 就是 ctx，例如 this.cookies.get('foo')。
  - controller 有两种写法，类的写法通过 this.ctx，方法的写法直接通过 ctx 入参。
  - helper，service 中的 this 指向 helper，service 对象本身，使用 this.ctx 访问 context 对象，例如 this.ctx.cookies.get('foo')。

 */

// app/extend/context.js
module.exports = {
  // 方法拓展
  fangzhiFun() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    return 'this is Context function';
  },

  // 属性拓展
  get fangzhiKey() {
    // this 就是 ctx 对象，在其中可以调用 ctx 上的其他方法，或访问属性
    if (!this[BAR]) {
      // 例如，从 header 中获取，实际情况肯定更复杂
      this[BAR] = this.headers;
    }
    return this[BAR];
  },
};
