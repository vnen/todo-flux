var api = require('koa')(),
    router = require('koa-router')(),
    todos = require('./todos'),
    auth = require('../auth/verify');

router.get('/todos', todos.getAll);
router.get('/todos/:id', todos.getOne);

api.use(auth);

api.use(router.routes());
api.use(router.allowedMethods());

module.exports = {
  base: '/api',
  app: api
};
