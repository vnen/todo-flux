var mounted = require('koa')(),
    mount = require('koa-mount'),
    routes = [
      require('./api'),
      require('./auth')
    ];

routes.forEach(function (route) {
  mounted.use(mount(route.base, route.app));
});

module.exports = mounted;
