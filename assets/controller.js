var Backbone = require('backbone'),
    MainRouter = require('./routers/main');

module.exports = {
  init: function (context) {
    return function (callback) {
      var mainRouter = new MainRouter();
      mainRouter.on('route', function (route) {
        callback(null, mainRouter[route]());
      });
      Backbone.history.loadUrl(context.req.url);
    };
  }
};