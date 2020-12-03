'use strict';

const { app,
  // mock, assert
} = require('egg-mock/bootstrap');

describe('test/app/service/mysql.test.js', () => {
  it('mysql CRUD test query sql', async () => {
    const ctx = app.mockContext({});
    const result = await ctx.service.mysql.query();
    console.log(result);
    return result;
  });

  // it('mysql CRUD insert', async () => {
  //   const ctx = app.mockContext({});
  //   const success = await ctx.service.mysql.create();
  //   // console.log(list);
  //   return success;
  // });

  // it('mysql CRUD readById', async () => {
  //   const ctx = app.mockContext({});
  //   const result = await ctx.service.mysql.readById(1);
  //   console.log(result);
  //   return result;
  // });

  // it('mysql CRUD read', async () => {
  //   const ctx = app.mockContext({});
  //   const result = await ctx.service.mysql.read();
  //   console.log(result);
  //   return result;
  // });

  it('mysql CRUD update', async () => {
    const ctx = app.mockContext({});
    const result = await ctx.service.mysql.update();
    return result;
  });

  // it('mysql CRUD deleteById', async () => {
  //   const ctx = app.mockContext({});
  //   const result = await ctx.service.mysql.deleteById(1);
  //   return result;
  // });

  // it('mysql test Transaction with Developer', async () => {
  //   const ctx = app.mockContext({});
  //   const result = await ctx.service.mysql.tran();
  //   console.log(result);
  //   return result;
  // });

  // it('mysql test Transaction with Scope', async () => {
  //   const ctx = app.mockContext({});
  //   const result = await ctx.service.mysql.tranWithScope();
  //   console.log(result);
  //   return result;
  // });

});
