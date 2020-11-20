'use strict';

const moment = require('moment');
exports.relativeTime = time => moment(new Date(time)).format('yyyy-MM-DD HH:mm:SS');
