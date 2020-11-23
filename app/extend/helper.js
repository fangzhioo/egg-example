'use strict';
/**
 * Helper 用来提供一些实用的 utility 函数。
 * 它的作用在于我们可以将一些常用的动作抽离在 helper.js 里面成为一个独立的函数，
 * 这样可以用 JavaScript 来写复杂的逻辑，避免逻辑分散各处，同时可以更好的编写测试用例。
 * 可以在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例。
 * 除此之外，Helper 的实例还可以在模板中获取到 {{ helper.relativeTime(item.gmtCreate) }}
 */

const moment = require('moment');

const helper = {
  relativeTime: time => moment(new Date(time)).format('yyyy-MM-DD HH:mm:SS'),

};

module.exports = helper;
