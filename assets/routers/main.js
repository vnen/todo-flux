var Backbone = require('backbone'),
    Route = require('../../lib/route'),
    HomeComponent = require('../components/home.jsx'),
    ErrorComponents = require('../components/errors');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.route('*notfound', 'notFound');
    this.route('', 'home');
    this.route('/', 'home');
  },
  home: function () {
    return new Route(HomeComponent);
  },
  notFound: function () {
    return new Route(ErrorComponents.Error404Component);
  }
});
