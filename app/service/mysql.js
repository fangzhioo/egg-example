'use strict';

const { Service } = require('egg');

class MysqlService extends Service {
  constructor(props) {
    super(props);
    this.mysqlClient = this.app.mysql.get('local');
  }

  /**
   * 插件本身也支持拼接与直接执行 sql 语句。使用 query 可以执行合法的 sql 语句。
     注意！！我们极其不建议开发者拼接 sql 语句，这样很容易引起 sql 注入！！
     如果必须要自己拼接 sql 语句，请使用 mysql.escape 方法。 https://stackoverflow.com/questions/15778572/preventing-sql-injection-in-node-js
   */
  async query() {
    // const sql = `
    //   SELECT
    //   id, title
    //   FROM
    //   posts
    //   WHERE
    //   status=1
    //   AND
    //   id>=3
    //   ORDER BY id DESC
    //   ;
    // `;
    // const res = this.mysqlClient.query(sql, {});
    // return res;
    const sql = 'update posts set hits = (hits + ?) where id = ?';
    const res = this.mysqlClient.query(sql, [ 1, 2 ]);
    // update posts set hits = (hits + 1) where id = 2;
    return res;
  }

  async create() {
    // insert
    const result = await this.mysqlClient.insert('posts', { title: 'Hello World' + Date.now() });
    // INSERT INTO `posts`(`title`) VALUES('Hello World');
    /**
     {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 1,
        serverStatus: 2,
        warningCount: 2,
        message: '',
        protocol41: true,
        changedRows: 0
      }
     */
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async read() {
    // query
    const results = await this.mysqlClient.select('posts', {
      where: { status: 1, author: [ 'fangzhi', 'kirito' ] },
      orders: [[ 'createdTime', 'desc' ], [ 'id', 'desc' ]],
      limit: 4,
      offset: 0,
    });
    // SELECT * FROM `posts` WHERE `status` = 1 AND `author` IN('fangzhi','kirito') ORDER BY `createdTime` DESC, `id` DESC LIMIT 0, 4;
    return results;
  }

  async readById(id) {
    // get
    const post = await this.mysqlClient.get('posts', { id });
    return post;
  }


  /**
   * 如果主键是自定义的 ID 名称，如 custom_id，则需要在 `where` 里面配置
   * const options = { where: { custom_id: 456 } };
   * const result = await this.app.mysql.update('posts', row, options); // 更新 posts 表中的记录
   *
   * sql ==> UPDATE `posts` SET `name` = 'fengmk2', `modifiedAt` = NOW() WHERE custom_id = 456 ;
   */
  async update() {
    // update by primary key ID, and refresh
    // 如果需要调用 MySQL 内置的函数（或表达式），可以使用 Literal。
    // 自定义表达式
    // const first = 'James',
    //   last = 'Bond';
    // const { Literal } = this.mysqlClient.literals;
    const row = {
      id: 2,
      title: 'update test1',
      // author: new Literal(`CONCAT("${first}", "${last}"`),
      status: 1,
      modifyTime: this.mysqlClient.literals.now, // `now()` on db server
    };
    const result = await this.mysqlClient.update('posts', row);
    // UPDATE `posts` SET `title` = 'update test', `author` = CONCAT("James", "Bond"), `status` = 1, `modifyTime` = NOW() WHERE id = 3;
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async deleteById(id) {
    const result = await this.mysqlClient.delete('posts', {
      id,
    });
    // DELETE FROM `posts` WHERE `id` = 1;
    return result;
  }

  /**
   * 使用事务
   * 对于一个事务来讲，一定伴随着 beginTransaction、commit 或 rollback，分别代表事务的开始，成功和失败回滚。
   * 这里模拟删除一个user，并一并删除文章
   */
  // 手动控制
  /**
   * beginTransaction、commit 或 rollback，
      优点：beginTransaction, commit 或 rollback 都由开发者来完全控制，可以做到非常细粒度的控制。
      缺点：手写代码比较多，不是每个人都能写好。忘记了捕获异常和 cleanup 都会导致严重 bug。
   */
  async tran() {
    const conn = await this.mysqlClient.beginTransaction(); // 初始化事务
    try {
      const username = 'kirito';
      await conn.update('user', { status: 0 }, { where: { username } }); // 第一步操作 逻辑删除用户
      // mock error 模拟过程中出现错误
      // eslint-disable-next-line no-constant-condition
      // if (true) {
      //   throw new Error('this is custom error!!!');
      // }
      await conn.update('posts', { status: 0 }, { where: { author: username } }); // 第二步操作
      await conn.commit(); // 提交事务
    } catch (error) {
      // error, rollback
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      throw error;
    }
  }

  // 自动控制
  /**
   * API：beginTransactionScope(scope, ctx)
          scope: 一个 generatorFunction，在这个函数里面执行这次事务的所有 sql 语句。
          ctx: 当前请求的上下文对象，传入 ctx 可以保证即便在出现事务嵌套的情况下，一次请求中同时只有一个激活状态的事务。
    优点：使用简单，不容易犯错，就感觉事务不存在的样子。
    缺点：整个事务要么成功，要么失败，无法做细粒度控制。
   */
  async tranWithScope() {
    const result = await this.mysqlClient.beginTransactionScope(async conn => {
      // don't commit or rollback by yourself
      const username = 'kirito';
      await conn.update('user', { status: 0 }, { where: { username } }); // 第一步操作 逻辑删除用户
      await conn.update('posts', { status: 0 }, { where: { author: username } }); // 第二步操作
      return { success: true };
    }, this.ctx); // ctx 是当前请求的上下文，如果是在 service 文件中，可以从 `this.ctx` 获取到
    // if error throw on scope, will auto rollback
    return result;
  }

}

module.exports = MysqlService;
