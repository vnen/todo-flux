var Backbone = require('backbone'),
    MainRouter = require('./routers/main'),
    fs = require('fs'),
    path = require('path');

module.exports = {
  init: function (context) {
    return function (callback) {
      var mainRouter = new MainRouter();
      mainRouter.on('route', function (route) {
        fs.readFile(path.join(process.cwd(), 'assets/index.html'), 'utf8', function (err, content) {
          if (err) { return callback(err); }
          var rendered = content.replace('---Markup---', mainRouter[route]());
          callback(null, rendered);
        });
      });
      Backbone.history.loadUrl(context.req.url);
    };
  }
};
