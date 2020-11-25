'use strict';

module.exports = app => {
  const { router, controller } = app;
  // File模式
  router.post('/upload_file', controller.upload.uploadFile);
  // Stream模式
  router.post('/upload_stream', controller.upload.uploadStream);
};
