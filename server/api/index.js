var api = require('koa')(),
    router = require('koa-router')(),
    delay = require('koa-delay'),
    todos = require('./todos'),
    auth = require('../auth/verify');

router.get('/todos', todos.getAll);
router.get('/todos/:id', todos.getOne);
router.delete('/todos/:id', todos.delete);

api.use(auth);

api.use(delay(1000, 1000));

api.use(router.routes());
api.use(router.allowedMethods());

api.use(function *notFound(){
  this.status = 404;
  this.body = {
    error: 'Page not found'
  };
});

module.exports = {
  base: '/api',
  app: api
};
