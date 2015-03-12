var auth = require('koa')(),
    router = require('koa-router')(),
    login = require('./login');

router.post('/token', login.create);

auth.use(router.routes());
auth.use(router.allowedMethods());

module.exports = {
  base: '/auth',
  app: auth
};
