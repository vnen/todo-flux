var Backbone = require('backbone'),
    Route = require('../../lib/route'),
    HomeComponent = require('../components/home.jsx'),
    TodosListComponent = require('../components/todos/list.jsx'),
    ErrorComponents = require('../components/errors');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.makeRoute('*notfound', 'notFound');
    this.makeRoute('', 'home');
    this.makeRoute('/', 'home');
    this.makeRoute('list', 'list');
  },
  makeRoute: function (path, name) {
    var handler = this[name]();
    if (typeof window === 'undefined') {
      return this.route(path, name, function dummy() {} );
    }
    this.route(path, name, handler.render.bind(handler));
  },
  home: function () {
    return new Route(HomeComponent);
  },
  list: function () {
    return new Route(TodosListComponent, {}, ['todos']);
  },
  notFound: function () {
    var route = new Route(ErrorComponents.Error404Component);
    route.status = 404;
    return route;
  }
});
