var Backbone = require('backbone'),
    _ = require('underscore'),
    MainRouter = require('./routers/main'),
    fs = require('fs'),
    path = require('path'),
    najax = require('../lib/najax'),
    bootstrap = require('./bootstrap');

Backbone.ajax = function (options) {
  najax(options);
};

module.exports = {
  init: function (context) {
    return function (callback) {
      var mainRouter = new MainRouter();
      mainRouter.on('route', function (routeName) {
        fs.readFile(path.join(process.cwd(), 'assets/index.html'), 'utf8', function (err, template) {
          if (err) { return callback(err); }
          var route = mainRouter[routeName]();
          this.bootstrap(route, function (err) {
            if (err) { return callback(err); }
            var rendered = this.render(template, route.render());
            callback(null, rendered);
          }.bind(this));
        }.bind(this));
      }.bind(this));
      Backbone.history.loadUrl(context.req.url);
    }.bind(this);
  },

  bootstrap: function (route, callback) {
    if (!route.collections || _.size(route.collections === 0)) {
      callback(null);
    }
    var err = null, after = _.after(_.size(route.collections), function () {
      callback(err, bootstrap);
    });
    _.each(route.collections, function (collection, name) {
      collection.fetch({
        success: function () {
          bootstrap[name] = collection.toJSON();
          after();
        },
        error: function (xhr, error, e) {
          err = e;
          after();
        }
      });
    });
  },

  render: function (template, markup) {
    var rendered = template.replace('---Markup---', markup);
    return rendered.replace('---BOOTSTRAP---', JSON.stringify(bootstrap));
  }
};
