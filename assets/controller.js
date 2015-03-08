var Backbone = require('backbone'),
    MainRouter = require('./routers/main'),
    fs = require('fs'),
    path = require('path'),
    najax = require('../lib/najax');

Backbone.ajax = function (options) {
  najax(options);
};

module.exports = {
  init: function (context) {
    return function (callback) {
      var mainRouter = new MainRouter();
      mainRouter.on('route', function (route) {
        fs.readFile(path.join(process.cwd(), 'assets/index.html'), 'utf8', function (err, template) {
          if (err) { return callback(err); }
          var rendered = template.replace('---Markup---', mainRouter[route]().render());
          callback(null, rendered);
        });
      });
      Backbone.history.loadUrl(context.req.url);
    };
  }
};
