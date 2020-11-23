'use strict';

const { Service } = require('egg');

class MysqlService extends Service {
  constructor(props) {
    super(props);
    this.mysqlClient = this.app.mysql.get('local');
  }

  async query() {
    const sql = `
      SELECT
      id, title
      FROM 
      posts
      WHERE 
      status=1 
      AND 
      id>=3
      ORDER BY id DESC
      ;
    `;
    const res = this.mysqlClient.query(sql, {});
    return res;
  }

  async create() {
    // insert
    const result = await this.mysqlClient.insert('posts', { title: 'Hello World' + Date.now() });
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async read() {
    // query
    const results = await this.mysqlClient.select('posts', {
      where: { status: 1 },
      orders: [[ 'createdTime', 'desc' ], [ 'id', 'desc' ]],
      limit: 4,
      offset: 0,
    });
    return results;
  }

  async readById(id) {
    // get
    const post = await this.mysqlClient.get('posts', { id });
    return post;
  }

  async update() {
    // update by primary key ID, and refresh
    const row = {
      id: 3,
      title: 'update test' + Date.now(),
      status: 1,
      modifyTime: this.mysqlClient.literals.now, // `now()` on db server
    };
    const result = await this.mysqlClient.update('posts', row);
    const updateSuccess = result.affectedRows === 1;
    return updateSuccess;
  }

  async deleteById(id) {
    const result = await this.mysqlClient.delete('posts', {
      id,
    });
    return result;
  }
}

module.exports = MysqlService;
