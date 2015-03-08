var React = require('react'),
    _ = require('underscore'),
    AppComponent = require('../assets/components/app.jsx');

module.exports = Route;

function Route(component, collections) {
  this.component = component;
  this.collections = collections;
}

Route.prototype.render= function () {
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
    return React.renderToString(appComponent);
  }
  /*istanbul ignore next*/
  return React.render(appComponent, document.querySelector('body'));
};
