'use strict';

module.exports = {
  baseBoolResponse: {
    success: { type: 'boolean', required: true, example: true },
    msg: { type: 'string', required: true, example: 'success' },
    data: { type: 'boolean', required: true, example: true },
  },
  postsListResponse: {
    success: { type: 'boolean', required: true, example: true },
    msg: { type: 'string', required: true, example: 'success' },
    data: { type: 'array', required: true, itemType: 'PostVO' },
  },
  postsDetailResponse: {
    success: { type: 'boolean', required: true, example: true },
    msg: { type: 'string', required: true, example: 'success' },
    data: { type: 'PostVO', required: false, desciption: '文章详情' },
  },
  createPostsBody: {
    title: { type: 'string', required: true, example: 'title', description: '标题' },
    content: { type: 'string', required: true, example: 'content', description: '内容' },
  },
  updatePostsBody: {
    id: { type: 'integer', required: true, example: 0 },
    title: { type: 'string', required: true, example: 'title', description: '标题' },
    content: { type: 'string', required: true, example: 'content', description: '内容' },
  },
};
