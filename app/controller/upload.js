'use strict';

const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

class UploadController extends Controller {
  async uploadFile() {
    const { ctx } = this;
    console.log(ctx.request.body);
    console.log('got %d files', ctx.request.files.length);
    for (const file of ctx.request.files) {
      console.log('field: ' + file.fieldname);
      console.log('filename: ' + file.filename);
      console.log('encoding: ' + file.encoding);
      console.log('mime: ' + file.mime);
      console.log('tmp filepath: ' + file.filepath);
      let result;
      try {
        // 处理文件，比如上传到云端
        // result = await ctx.oss.put('egg-multipart-test/' + file.filename, file.filepath);
      } finally {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
      console.log(result);
    }
  }

  /**
   * 如果你对于 Node 中的 Stream 模式非常熟悉，那么你可以选择此模式。
   * 在 Controller 中，我们可以通过 ctx.getFileStream() 接口能获取到上传的文件流。
   * 要通过 ctx.getFileStream 便捷的获取到用户上传的文件，需要满足两个条件：
     - 只支持上传一个文件。
     - 上传文件必须在所有其他的 fields 后面，否则在拿到文件流时可能还获取不到 fields。
   */
  async uploadStream() {
    const ctx = this.ctx;
    const stream = await ctx.getFileStream();
    const name = 'egg-multipart-test/' + path.basename(stream.filename);
    // let result;
    try {
      // 文件处理，上传到云存储等等
      // result = await ctx.oss.put(name, stream);
    } catch (err) {
      // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
      await sendToWormhole(stream);
      throw err;
    }

    ctx.body = {
      url: name,
      // url: result.url,
      // 所有表单字段都能通过 `stream.fields` 获取到
      title: stream.title,
    };
  }
}

module.exports = UploadController;
