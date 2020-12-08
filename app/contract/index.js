'use strict';

module.exports = {
  BaseResponse: {
    success: { type: 'boolean', required: true, example: true },
    msg: { type: 'string', required: true, example: 'success' },
    data: { type: 'string', required: true, example: 'data' },
  },
};
