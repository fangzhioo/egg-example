'use strict';

const { app, assert,
  // mock,
} = require('egg-mock/bootstrap');

describe('test/app/schedule/update_cache.test.js', () => {
  it('should schedule work fine', async () => {
    await app.runSchedule('update_cache');
    assert(app.cache);
  });
});

