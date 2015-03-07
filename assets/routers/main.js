var Backbone = require('backbone'),
    Route = require('../../lib/route'),
    HomeComponent = require('../components/home.jsx'),
    ListComponent = require('../components/todos/list.jsx'),
    ErrorComponents = require('../components/errors'),
    TodosCollection = require('../collections/todos');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.makeRoute('*notfound', 'notFound');
    this.makeRoute('', 'home');
    this.makeRoute('/', 'home');
    this.makeRoute('list', 'list');
  },
  makeRoute: function (path, name) {
    if (typeof window === 'undefined') {
      this.route(path, name, function dummy() {} );
    }
    var handler = this[name]();
    this.route(path, name, handler.render.bind(handler));
  },
  home: function () {
    return new Route(HomeComponent);
  },
  list: function () {
    return new Route(ListComponent, {
      todos: TodosCollection
    });
  },
  notFound: function () {
    return new Route(ErrorComponents.Error404Component);
  }
});
