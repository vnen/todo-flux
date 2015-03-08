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
          var rendered = this.render(template, mainRouter[route]().render());
          callback(null, rendered);
        }.bind(this));
      }.bind(this));
      Backbone.history.loadUrl(context.req.url);
    }.bind(this);
  },

  render: function (template, markup, data) {
    var rendered = template.replace('---Markup---', markup);
    return rendered.replace('---BOOTSTRAP---', data || 'null');
  }
};
