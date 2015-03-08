var React = require('react'),
    _ = require('underscore'),
    AppComponent = require('../assets/components/app.jsx');

module.exports = Route;

function Route(component, collections) {
  this.component = component;
  this.collections = collections || null;
  _.each(collections, function (collection, key) {
    this.collections[key] = new collection();
  }, this);
}

Route.prototype.render= function () {
  var appComponent;

  appComponent = React.createElement(AppComponent, {
    component: this.component,
    collections: this.collections
  });

  /*istanbul ignore else*/
  if (typeof window === 'undefined') {
    return React.renderToString(appComponent);
  }
  /*istanbul ignore next*/
  return React.render(appComponent, document.querySelector('body'));
};
