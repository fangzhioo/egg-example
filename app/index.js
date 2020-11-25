
'use strict';
/**
 * 程序入口，可以用来配置一些自定义方法
 * @param {*} app 主程序
 */

module.exports = app => {
  // 自定义规则
  app.validator.addRule('json', (rule, value) => {
    try {
      JSON.parse(value);
    } catch (err) {
      return '这不是个JSON';
    }
  });
};
