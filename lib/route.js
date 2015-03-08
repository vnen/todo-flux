var React = require('react'),
    _ = require('underscore'),
    AppComponent = require('../assets/components/app.jsx');

module.exports = Route;

function Route(component, collections) {
  this.component = component;
  this.collections = collections;
}

Route.prototype.render= function (callback) {
  var appComponent,
      collections = {};

  _.each(this.collections, function (collection, key) {
    collections[key] = new collection();
  });

  appComponent = React.createElement(AppComponent, {
    component: this.component,
    collections: collections
  });

  /*istanbul ignore else*/
  if (typeof window === 'undefined') {
    if (!callback) {
      return React.renderToString(appComponent);
    }

    if (_.size(collections) === 0) {
      return callback(null, React.renderToString(appComponent));
    }

    var after = _.after(_.size(collections), function () {
      process.nextTick(function () {
        callback(null, React.renderToString(appComponent));
      });
    });
    _.each(collections, function (collection) {
      collection.fetch({ success: after });
    });
    return;
  }
  /*istanbul ignore next*/
  return React.render(appComponent, document.querySelector('body'));
};
