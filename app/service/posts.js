'use strict';

const { Service } = require('egg');

class PostsService extends Service {
  constructor(props) {
    super(props);
    this.mysqlClient = this.app.mysql.get('local');
  }

  async list(payload) {
    const { size, page } = payload;
    const limit = size ? Number(size) : 4;
    const offset = page ? Number(page) : 0;
    const results = await this.mysqlClient.select('posts', {
      orders: [[ 'createdTime', 'desc' ], [ 'id', 'desc' ]],
      limit,
      offset,
    });
    return results;
  }

  async create(row) {
    // insert
    const result = await this.mysqlClient.insert('posts', row);
    const insertSuccess = result.affectedRows === 1;
    return insertSuccess;
  }

  async updateSelected(row) {
    // update selected
    const { id, title, content, author } = row;
    const sql = `
      UPDATE 
      posts 
      SET 
      ${title ? `title='${title}',` : ''}
      ${content ? `content='${content}',` : ''}
      ${author ? `author='${author}'` : ''}
      WHERE 
      id=${id};
    `;

    const result = await this.mysqlClient.query(sql, {});
    return result;
  }
}

module.exports = PostsService;
