'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
// const FormStream = require('formstream');

class HttpclientController extends Controller {
  async index() {
    const ctx = this.ctx;

    // 示例：请求一个 npm 模块信息
    const result = await ctx.curl('https://registry.npm.taobao.org/egg/latest', {
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000,
    });

    ctx.body = {
      status: result.status,
      headers: result.headers,
      package: result.data,
    };
  }

  /**
   * 通过 ctx 使用 HttpClient
   * GET 请求可以不用设置 options.method 参数，HttpClient 的默认 method 会设置为 GET。
    返回值 result 会包含 3 个属性：status, headers 和 data
    - status: 响应状态码，如 200, 302, 404, 500 等等
    - headers: 响应头，类似 { 'content-type': 'text/html', ... }
    - data: 响应 body，默认 HttpClient 不会做任何处理，会直接返回 Buffer 类型数据。 一旦设置了 options.dataType，HttpClient 将会根据此参数对 data 进行相应的处理。
   */
  async get() {
    const { ctx } = this;
    const result = await ctx.curl('https://httpbin.org/get?foo=bar');
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
  }

  /**
   * 创建数据的场景一般来说都会使用 POST 请求，它相对于 GET 来说多了请求 body 这个参数。
    以发送 JSON body 的场景举例：
   */
  async post() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method
      method: 'POST',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      data: {
        hello: 'world',
        now: Date.now(),
      },
      // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
      dataType: 'json',
    });
    ctx.body = result.data;
  }

  /**
   * PUT 与 POST 类似，它更加适合更新数据和替换数据的语义。 除了 method 参数需要设置为 PUT，其他参数几乎跟 POST 一模一样。
   */
  async put() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/put', {
      // 必须指定 method
      method: 'PUT',
      // 通过 contentType 告诉 HttpClient 以 JSON 格式发送
      contentType: 'json',
      data: {
        update: 'foo bar',
      },
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data;
  }

  /**
   * 删除数据会选择 DELETE 请求，它通常可以不需要加请求 body，但是 HttpClient 不会限制。
   */
  async del() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/delete', {
      // 必须指定 method
      method: 'DELETE',
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data;
  }

  // 【 高级 HTTP 请求 】

  /**
   * 【 Form 表单提交 】
   * 面向浏览器设计的 Form 表单（不包含文件）提交接口，通常都要求以 content-type: application/x-www-form-urlencoded 的格式提交请求数据。
   */
  async submit() {
    const ctx = this.ctx;
    const result = await ctx.curl('https://httpbin.org/post', {
      // 必须指定 method，支持 POST，PUT 和 DELETE
      method: 'POST',
      // 不需要设置 contentType，HttpClient 会默认以 application/x-www-form-urlencoded 格式发送请求
      data: {
        now: Date.now(),
        foo: 'bar',
      },
      // 明确告诉 HttpClient 以 JSON 格式处理响应 body
      dataType: 'json',
    });
    ctx.body = result.data.form;
    // 响应最终会是类似以下的结果：
    // {
    //   "foo": "bar",
    //   "now": "1483864184348"
    // }
  }

  /**
   * 【以 Multipart 方式上传文件】
   * 当一个 Form 表单提交包含文件的时候，请求数据格式就必须以 multipart/form-data 进行提交了。
   * urllib 内置了 formstream 模块来帮助我们生成可以被消费的 form 对象。
   */
  async upload() {
    const { ctx } = this;

    const result = await ctx.curl('https://httpbin.org/post', {
      method: 'POST',
      dataType: 'json',
      data: {
        foo: 'bar',
      },

      // 单文件上传
      files: __filename,

      // 多文件上传
      // files: {
      //   file1: __filename,
      //   file2: fs.createReadStream(__filename),
      //   file3: Buffer.from('mock file content'),
      // },
    });

    ctx.body = result.data.files;
    // 响应最终会是类似以下的结果：
    // {
    //   "file": "'use strict';\n\nconst For...."
    // }
  }

  /**
   * 【以 Stream 方式上传文件】
   * 在 Node.js 的世界里面，Stream 才是主流。 如果服务端支持流式上传，最友好的方式还是直接发送 Stream。
   * Stream 实际会以 Transfer-Encoding: chunked 传输编码格式发送，这个转换是 HTTP 模块自动实现的。
   */
  async uploadByStream() {
    const ctx = this.ctx;
    // 上传当前文件本身用于测试
    const fileStream = fs.createReadStream(__filename);
    // httpbin.org 不支持 stream 模式，使用本地 stream 接口代替
    const url = `${ctx.protocol}://${ctx.host}/upload_stream`;
    const result = await ctx.curl(url, {
      // 必须指定 method，支持 POST，PUT
      method: 'POST',
      // 以 stream 模式提交
      stream: fileStream,
    });
    ctx.status = result.status;
    ctx.set(result.headers);
    ctx.body = result.data;
    // 响应最终会是类似以下的结果：
    // {"streamSize":574}
  }
}

module.exports = HttpclientController;
