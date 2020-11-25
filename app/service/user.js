'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  constructor(ctx) {
    super(ctx);
    this.mysqlClient = this.app.mysql.get('local');
  }

  async find(id) {
    const user = await this.mysqlClient.query('select * from user where id = ?', id);
    return user;
  }


}

module.exports = UserService;
